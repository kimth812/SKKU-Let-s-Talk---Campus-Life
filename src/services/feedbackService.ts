import { FeedbackResponse } from '../types';

// Helper to normalize strings for comparison
export function cleanWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

// Check whether key words are present in student transcript
export function checkSuccess(studentSaid: string, keyWords: string[]): boolean {
  const saidWords = cleanWords(studentSaid);
  if (!saidWords.length) return false;

  return keyWords.every((kw) => {
    const kwClean = kw.toLowerCase().trim();
    // Allow compound keywords like "next time"
    const subWords = kwClean.split(/\s+/);
    return subWords.every((sw) => saidWords.some((w) => w.includes(sw) || sw.includes(w)));
  });
}

// Section 7 Deterministic Local Fallback
export function getLocalFallbackFeedback({
  targetSentence,
  studentSaid,
  attemptCount,
  keyWords,
}: {
  targetSentence: string;
  studentSaid: string;
  attemptCount: number;
  keyWords: string[];
}): FeedbackResponse {
  const cleanSaid = cleanWords(studentSaid || '');
  const cleanTarget = cleanWords(targetSentence);

  if (cleanSaid.length === 0) {
    return {
      feedback: "I couldn't hear you. Let's try again! (잘 들리지 않았어요. 다시 해 봐요!)",
      isSuccess: false,
      attemptFeedbackType: 'no_speech',
    };
  }

  const isSuccess = checkSuccess(studentSaid, keyWords);

  // Check for dropped small prepositions/articles (in, a, the, to, of, for, on, at)
  const smallWords = ['in', 'a', 'the', 'to', 'of', 'for', 'on', 'at'];
  const targetSmallWords = cleanTarget.filter((w) => smallWords.includes(w));
  const missingSmallWords = targetSmallWords.filter((w) => !cleanSaid.includes(w));

  if (isSuccess) {
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

  // Attempt 1: Recast
  if (attemptCount <= 1) {
    return {
      feedback: `Nice try! You can say, "${targetSentence}" (이렇게 말해 볼까요?)`,
      isSuccess: false,
      attemptFeedbackType: 'recast',
    };
  }

  // Attempt 2: Elicitation (first-letter hint)
  if (attemptCount === 2) {
    // Pick the missing key word or the last word
    const missingKw = keyWords.find((kw) => !cleanSaid.some((sw) => sw.includes(kw.toLowerCase()))) || cleanTarget[cleanTarget.length - 1];
    const firstLetter = missingKw ? missingKw[0].toLowerCase() : 'a';
    const regex = new RegExp(`\\b${missingKw}\\b`, 'i');
    const hintSentence = targetSentence.replace(regex, `${firstLetter}___`);
    return {
      feedback: `You're almost there! "${hintSentence}" (마지막 단어는 ${firstLetter}으로 시작해요.)`,
      isSuccess: false,
      attemptFeedbackType: 'elicitation',
    };
  }

  // Attempt 3+: Chunking
  const words = targetSentence.split(' ');
  const half = Math.ceil(words.length / 2);
  const part1 = words.slice(0, half).join(' ');
  const part2 = words.slice(half).join(' ');
  return {
    feedback: `Let's say it in two parts: "${part1}" → "${part2}" (두 부분으로 나눠서 말해 봐요.)`,
    isSuccess: false,
    attemptFeedbackType: 'chunking',
  };
}

// Request feedback from API with fallback
export async function getFeedback({
  partnerName,
  partnerQuestion,
  targetSentence,
  koreanMeaning,
  studentSaid,
  attemptCount,
  keyWords,
}: {
  partnerName: string;
  partnerQuestion: string;
  targetSentence: string;
  koreanMeaning: string;
  studentSaid: string;
  attemptCount: number;
  keyWords: string[];
}): Promise<FeedbackResponse> {
  const localFallback = getLocalFallbackFeedback({
    targetSentence,
    studentSaid,
    attemptCount,
    keyWords,
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partnerName,
        partnerQuestion,
        targetSentence,
        koreanMeaning,
        studentSaid,
        attemptCount,
        keyWords,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return localFallback;
    }

    const data = await res.json();
    if (data && typeof data.feedback === 'string') {
      return {
        feedback: data.feedback,
        isSuccess: typeof data.isSuccess === 'boolean' ? data.isSuccess : localFallback.isSuccess,
        attemptFeedbackType: data.attemptFeedbackType || localFallback.attemptFeedbackType,
      };
    }
    return localFallback;
  } catch {
    return localFallback;
  }
}
