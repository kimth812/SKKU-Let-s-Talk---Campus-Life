// Speech Synthesis & Recognition Services for "SKKU, Let's Talk!"

// Type definitions for Web Speech API
type SpeechRecognitionType = any;

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speechService = {
  // Check if browser supports Web Speech API recognition
  isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  },

  // Check if current browser is an in-app browser
  isInAppBrowser(): boolean {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || '';
    return /KAKAOTALK|Instagram|FB_IAB|FB4A|FBAN|Line|Whale/i.test(ua);
  },

  // Read aloud using browser built-in SpeechSynthesis
  speak(
    text: string,
    rate: number = 0.9,
    onStart?: () => void,
    onEnd?: () => void
  ): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        if (onStart) onStart();
        if (onEnd) onEnd();
        resolve();
        return;
      }

      // Stop previous utterance
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate; // 0.9 normal, 0.7 slow as required
      utterance.pitch = 1.0;

      // Select an English voice if available
      const voices = window.speechSynthesis.getVoices();
      const enVoice =
        voices.find((v) => v.lang.startsWith('en-US') && !v.name.includes('Google')) ||
        voices.find((v) => v.lang.startsWith('en')) ||
        null;
      if (enVoice) {
        utterance.voice = enVoice;
      }

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        currentUtterance = null;
        if (onEnd) onEnd();
        resolve();
      };

      utterance.onerror = () => {
        currentUtterance = null;
        if (onEnd) onEnd();
        resolve();
      };

      currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    });
  },

  // Stop currently playing speech
  stopSpeaking(): void {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      currentUtterance = null;
    }
  },

  // Create SpeechRecognition session
  createRecognitionSession({
    onInterim,
    onFinal,
    onError,
    onSilenceTimeout,
  }: {
    onInterim?: (text: string) => void;
    onFinal: (text: string) => void;
    onError?: (error: any) => void;
    onSilenceTimeout?: () => void;
  }) {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      return null;
    }

    const recognition: SpeechRecognitionType = new SpeechRecognitionClass();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let silenceTimer: any = null;
    let accumulatedText = '';
    let stoppedBySilence = false;

    const resetSilenceTimer = () => {
      if (silenceTimer) clearTimeout(silenceTimer);
      // Listening stops after about 1.5 seconds of silence as specified in Section 5.3
      silenceTimer = setTimeout(() => {
        stoppedBySilence = true;
        try {
          recognition.stop();
        } catch {
          // ignore
        }
        if (onSilenceTimeout) onSilenceTimeout();
      }, 1500);
    };

    recognition.onresult = (event: any) => {
      resetSilenceTimer();
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }

      if (final) {
        accumulatedText = (accumulatedText + ' ' + final).trim();
      }

      const currentDisplay = (accumulatedText + (interim ? ' ' + interim : '')).trim();
      if (onInterim && currentDisplay) {
        onInterim(currentDisplay);
      }
    };

    recognition.onerror = (event: any) => {
      if (silenceTimer) clearTimeout(silenceTimer);
      if (event.error === 'no-speech' && stoppedBySilence) {
        // Expected on silence cutoff
        onFinal(accumulatedText);
        return;
      }
      if (onError) onError(event);
    };

    recognition.onend = () => {
      if (silenceTimer) clearTimeout(silenceTimer);
      onFinal(accumulatedText);
    };

    return {
      start: () => {
        accumulatedText = '';
        stoppedBySilence = false;
        try {
          recognition.start();
          resetSilenceTimer();
        } catch (e) {
          if (onError) onError(e);
        }
      },
      stop: () => {
        if (silenceTimer) clearTimeout(silenceTimer);
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  },
};
