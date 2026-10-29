import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helper to normalize strings for comparison
function cleanWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Section 7 deterministic fallback logic
function getFallbackFeedback({
  targetSentence,
  studentSaid,
  attemptCount,
  keyWords,
}: {
  targetSentence: string;
  studentSaid: string;
  attemptCount: number;
  keyWords: string[];
}) {
  const saidClean = cleanWords(studentSaid || '');
  const targetClean = cleanWords(targetSentence);

  if (!saidClean.length) {
    return {
      feedback: "I couldn't hear you. Let's try again! (잘 들리지 않았어요. 다시 해 봐요!)",
      isSuccess: false,
      attemptFeedbackType: 'no_speech',
    };
  }

  // Check key words
  const missingKeyWords = keyWords.filter(
    (kw) => !saidClean.some((sw) => sw.includes(kw.toLowerCase()) || kw.toLowerCase().includes(sw))
  );

  const hasAllKeyWords = missingKeyWords.length === 0;

  // Check common dropped small words in target: in, a, the, to, of, for, on, at
  const smallWords = ['in', 'a', 'the', 'to', 'of', 'for', 'on', 'at'];
  const targetSmallWords = targetClean.filter((w) => smallWords.includes(w));
  const missingSmallWords = targetSmallWords.filter((w) => !saidClean.includes(w));

  if (hasAllKeyWords) {
    if (missingSmallWords.length > 0) {
      const sw = missingSmallWords[0];
      return {
        feedback: `Great job! Try adding the small word "${sw}": "${targetSentence}" (작은 단어 "${sw}"을 넣어 보세요.)`,
        isSuccess: true,
        attemptFeedbackType: 'success_missing_small_word',
      };
    }
    return {
      feedback: 'Perfect! I understood you clearly. (정확하게 알아들었어요!)',
      isSuccess: true,
      attemptFeedbackType: 'success',
    };
  }

  // Attempt-based failure feedback
  if (attemptCount <= 1) {
    // 1st failure: recast
    return {
      feedback: `Nice try! You can say, "${targetSentence}" (이렇게 말해 볼까요?)`,
      isSuccess: false,
      attemptFeedbackType: 'recast',
    };
  } else if (attemptCount === 2) {
    // 2nd failure: elicitation (first letter hint of the last or missing key word)
    const hintWord = missingKeyWords[0] || targetClean[targetClean.length - 1];
    const firstLetter = hintWord ? hintWord[0] : 'a';
    const hintedTarget = targetSentence.replace(
      new RegExp(`\\b${hintWord}\\b`, 'i'),
      `${firstLetter}___`
    );
    return {
      feedback: `You're almost there! "${hintedTarget}" (마지막/중요 단어는 ${firstLetter}으로 시작해요.)`,
      isSuccess: false,
      attemptFeedbackType: 'elicitation',
    };
  } else {
    // 3rd failure or higher: chunking
    const words = targetSentence.split(' ');
    const half = Math.ceil(words.length / 2);
    const chunk1 = words.slice(0, half).join(' ');
    const chunk2 = words.slice(half).join(' ');
    return {
      feedback: `Let's say it in two parts: "${chunk1}" → "${chunk2}" (두 부분으로 나눠서 말해 봐요.)`,
      isSuccess: false,
      attemptFeedbackType: 'chunking',
    };
  }
}

// API endpoint for feedback
app.post('/api/feedback', async (req, res) => {
  const {
    partnerName = 'Emma',
    partnerQuestion = '',
    targetSentence = '',
    koreanMeaning = '',
    studentSaid = '',
    attemptCount = 1,
    keyWords = [],
  } = req.body;

  // If Gemini is available, attempt dynamic feedback guided strictly by Section 7
  if (ai) {
    try {
      const prompt = `You are ${partnerName}, a friendly, relaxed exchange student at Sungkyunkwan University (SKKU). You are practicing campus English with a Korean English-major sophomore student.
Context:
- Partner's Question: "${partnerQuestion}"
- Target Sentence: "${targetSentence}"
- Korean Meaning: "${koreanMeaning}"
- Key words required: ${JSON.stringify(keyWords)}
- Student Said: "${studentSaid}"
- Attempt number for this sentence: ${attemptCount}

Follow these STRICT rules from Section 7 of the PRD:
1. Praise first, then ONE thing to fix, in TWO sentences or fewer.
2. Simple English with Korean translation in parentheses.
3. NEVER say "wrong". Never show numbers or percentage scores. Never describe tongue, lip, or mouth positions.
4. Judge by "Did the partner understand?" - if student communicated key words intelligibly, treat as success!
5. Feedback progression:
   - If success: "Perfect! I understood you clearly. (정확하게 알아들었어요!)"
   - If success + small word missing (like 'in', 'a', 'the'): "Great job! Try adding the small word \"[word]\": \"${targetSentence}\" (작은 단어 \"[word]\"을 넣어 보세요.)"
   - 1st failure (attempt 1): Recast. "Nice try! You can say, \"${targetSentence}\" (이렇게 말해 볼까요?)"
   - 2nd failure (attempt 2): Elicitation (first-letter hint). "You're almost there! \"... [first_letter]___.\" (...단어는 [first_letter]으로 시작해요.)"
   - 3rd failure (attempt 3+): Chunking. "Let's say it in two parts: \"[part 1]\" → \"[part 2]\" (두 부분으로 나눠서 말해 봐요.)"
   - If student said nothing or silence: "I couldn't hear you. Let's try again! (잘 들리지 않았어요. 다시 해 봐요!)"

Return ONLY valid JSON in this exact structure:
{
  "feedback": "...",
  "isSuccess": true_or_false,
  "attemptFeedbackType": "success" | "success_missing_small_word" | "recast" | "elicitation" | "chunking" | "no_speech"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text?.trim() || '';
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (err) {
      console.warn('Gemini feedback generation fallback invoked:', err);
      // Fallback seamlessly to Section 7 table
      const fallback = getFallbackFeedback({
        targetSentence,
        studentSaid,
        attemptCount,
        keyWords,
      });
      return res.json(fallback);
    }
  }

  // Fallback when no Gemini API key configured
  const fallback = getFallbackFeedback({
    targetSentence,
    studentSaid,
    attemptCount,
    keyWords,
  });
  return res.json(fallback);
});

// Mount Vite or serve static assets
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: {
      middlewareMode: true,
      port: 3000,
      host: '0.0.0.0',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
