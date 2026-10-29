import React, { useState, useEffect, useRef } from 'react';
import { SituationData, TurnResult, MicState } from '../types';
import { speechService } from '../services/speechService';
import { getFeedback } from '../services/feedbackService';

interface PracticeScreenProps {
  situation: SituationData;
  onFinish: (results: TurnResult[]) => void;
  onExit: () => void;
}

export const PracticeScreen: React.FC<PracticeScreenProps> = ({
  situation,
  onFinish,
  onExit,
}) => {
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [micState, setMicState] = useState<MicState>('ready');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [studentSaid, setStudentSaid] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [results, setResults] = useState<TurnResult[]>([]);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualText, setManualText] = useState('');
  const [micNotice, setMicNotice] = useState<string | null>(null);

  const currentTurn = situation.turns[currentTurnIndex];
  const recognitionSessionRef = useRef<any>(null);

  // Play partner question once when turn loads
  useEffect(() => {
    setStudentSaid('');
    setFeedbackText('');
    setIsSuccess(null);
    setAttemptCount(0);
    setMicState('ready');
    setManualText('');
    setMicNotice(null);

    const timer = setTimeout(() => {
      setIsPlayingAudio(true);
      speechService.speak(
        currentTurn.partner,
        0.9,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }, 450);

    return () => {
      clearTimeout(timer);
      speechService.stopSpeaking();
      if (recognitionSessionRef.current) {
        recognitionSessionRef.current.stop();
      }
    };
  }, [currentTurnIndex, currentTurn]);

  // Handle partner question replay
  const handlePlayPartnerQuestion = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    speechService.speak(
      currentTurn.partner,
      0.9,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Play target sentence: normal rate 0.9
  const handlePlayTargetNormal = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    speechService.speak(
      currentTurn.student,
      0.9,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Play target sentence: slow rate 0.7
  const handlePlayTargetSlow = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    speechService.speak(
      currentTurn.student,
      0.7,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Evaluate student's utterance
  const evaluateSpeech = async (spokenText: string) => {
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);
    setIsLoadingFeedback(true);

    const res = await getFeedback({
      partnerName: situation.partner.name,
      partnerQuestion: currentTurn.partner,
      targetSentence: currentTurn.student,
      koreanMeaning: currentTurn.korean,
      studentSaid: spokenText,
      attemptCount: newAttempt,
      keyWords: currentTurn.keyWords,
    });

    setIsLoadingFeedback(false);
    setFeedbackText(res.feedback);
    setIsSuccess(res.isSuccess);
  };

  // Start speech recognition
  const handleMicClick = () => {
    if (isPlayingAudio) return;

    if (micState === 'listening') {
      if (recognitionSessionRef.current) {
        recognitionSessionRef.current.stop();
      }
      setMicState('done');
      return;
    }

    if (!speechService.isSpeechRecognitionSupported()) {
      setMicNotice('Speech recognition is not supported in this browser. Please open in Chrome or use text mode below.');
      setShowManualInput(true);
      return;
    }

    setMicNotice(null);
    setMicState('listening');

    const session = speechService.createRecognitionSession({
      onInterim: (text) => {
        setStudentSaid(text);
      },
      onFinal: (finalText) => {
        setMicState('done');
        setStudentSaid(finalText);
        evaluateSpeech(finalText);
      },
      onError: (err) => {
        setMicState('ready');
        if (err.error === 'not-allowed') {
          setMicNotice('Microphone permission was denied. Please allow mic access or use text input.');
          setShowManualInput(true);
        } else if (err.error === 'no-speech') {
          evaluateSpeech('');
        }
      },
      onSilenceTimeout: () => {
        setMicState('done');
      },
    });

    if (session) {
      recognitionSessionRef.current = session;
      session.start();
    } else {
      setMicState('ready');
      setShowManualInput(true);
    }
  };

  // Handle manual text submission fallback
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualText.trim()) return;
    setStudentSaid(manualText.trim());
    setMicState('done');
    evaluateSpeech(manualText.trim());
  };

  // Handle Try Again
  const handleTryAgain = () => {
    setMicState('ready');
    setStudentSaid('');
    setFeedbackText('');
    setIsSuccess(null);
    setManualText('');
  };

  // Handle Next
  const handleNext = () => {
    const currentResult: TurnResult = {
      turnId: currentTurn.id,
      targetSentence: currentTurn.student,
      studentSaid: studentSaid || '(Completed)',
      isSuccess: isSuccess !== null ? isSuccess : true,
      skipped: false,
      feedbackText: feedbackText || 'Completed',
    };

    const nextResults = [...results, currentResult];
    setResults(nextResults);

    if (currentTurnIndex < situation.turns.length - 1) {
      setCurrentTurnIndex(currentTurnIndex + 1);
    } else {
      onFinish(nextResults);
    }
  };

  // Handle Skip
  const handleSkip = () => {
    const currentResult: TurnResult = {
      turnId: currentTurn.id,
      targetSentence: currentTurn.student,
      studentSaid: studentSaid || '(Skipped)',
      isSuccess: false,
      skipped: true,
      feedbackText: 'Skipped',
    };

    const nextResults = [...results, currentResult];
    setResults(nextResults);

    if (currentTurnIndex < situation.turns.length - 1) {
      setCurrentTurnIndex(currentTurnIndex + 1);
    } else {
      onFinish(nextResults);
    }
  };

  // Render target sentence with keywords underlined
  const renderTargetSentenceWithKeyWords = (text: string, keyWords: string[]) => {
    const regex = new RegExp(`(${keyWords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isKeyword = keyWords.some((kw) => kw.toLowerCase() === part.toLowerCase());
      if (isKeyword) {
        return (
          <span
            key={i}
            className="text-[#1b4332] font-semibold underline decoration-[#85530b] decoration-2 underline-offset-4"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const progressPercent = Math.round(((currentTurnIndex + 1) / situation.turns.length) * 100);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fff8f6] text-[#1f1b1a] selection:bg-[#b1f0ce] selection:text-[#002114]">
      {/* Fixed Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Go back"
              type="button"
              onClick={onExit}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#414844] hover:text-[#1f1b1a] hover:bg-[#f6ecea] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#85530b] uppercase tracking-wider font-sans">
                SKKU, Let&apos;s Talk!
              </span>
              <h1 className="text-[17px] font-bold text-[#012d1d] font-sans -mt-0.5">
                Dialogue Practice
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-[#012d1d] flex items-center justify-center text-white"
              title="Student"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full px-4 pt-3 pb-8">
        {/* Top Session Context & Subtle Progress */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#85530b] text-[18px]">school</span>
            <span className="text-[14px] font-semibold text-[#012d1d] font-sans">
              {situation.title} ({situation.placeKo})
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#f6ecea] px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[#85530b] text-[14px]">checklist</span>
            <span className="text-[12px] font-medium text-[#414844] font-sans">
              {currentTurnIndex + 1} / {situation.turns.length}
            </span>
          </div>
        </div>

        {/* Progress Bar (Gentle Warm Line) */}
        <div className="w-full bg-[#f0e6e4] h-1.5 rounded-full overflow-hidden mb-3">
          <div
            className="bg-[#1b4332] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 1. Visual Unit & Conversational Context */}
        <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm overflow-hidden mb-3 border border-gray-100">
          {/* Illustration Scene */}
          <div className="relative w-full h-44 overflow-hidden bg-[#f6ecea]">
            <img
              src={situation.imageUrl}
              alt={situation.locationName}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Partner's Dialogue Bubble */}
          <div
            onClick={handlePlayPartnerQuestion}
            className="p-3.5 flex items-start gap-3 bg-[#fcf1ef] cursor-pointer hover:bg-[#f6ecea]/70 transition-colors"
            title="Tap to listen to partner again"
          >
            <div className="w-8 h-8 rounded-full bg-[#b1f0ce] flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-[#002114] font-bold text-[13px] font-sans">
              {situation.partner.letter}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-[#012d1d] font-sans">
                    {situation.partner.name}
                  </span>
                  <span className="text-[11px] text-[#414844] font-sans">
                    {situation.partner.role}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#1b4332] text-[18px]">
                  volume_up
                </span>
              </div>

              <p className="font-serif text-[20px] text-[#1f1b1a] mt-1 leading-snug">
                “{currentTurn.partner}”
              </p>
              <p className="text-[12px] text-[#414844] mt-0.5 font-sans">
                ({currentTurn.partnerKorean || currentTurn.korean})
              </p>
            </div>
          </div>
        </div>

        {/* 2. Target Sentence & Focus Area */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm mb-3 border border-gray-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-[#85530b] uppercase tracking-wider font-sans">
              Your Reply
            </span>
            <span className="text-[11px] text-[#414844] flex items-center gap-1 font-sans">
              <span className="material-symbols-outlined text-[13px] text-[#012d1d]">verified</span>{' '}
              Focus on keywords
            </span>
          </div>

          {/* Target English Sentence with Serif Newsreader styling */}
          <p className="font-serif text-[21px] sm:text-[23px] text-[#1f1b1a] leading-relaxed py-1">
            {renderTargetSentenceWithKeyWords(currentTurn.student, currentTurn.keyWords)}
          </p>

          {/* Subtitle Korean Meaning */}
          <p className="text-[14px] text-[#414844] mt-1 font-sans">
            {currentTurn.korean}
          </p>

          {/* Pronunciation Audio Controls */}
          <div className="flex items-center gap-2.5 mt-3 pt-1">
            <button
              type="button"
              onClick={handlePlayTargetNormal}
              disabled={isPlayingAudio}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#b1f0ce] hover:bg-[#95d4b3] text-[#002114] rounded-xl active:scale-95 transition-all shadow-sm font-semibold text-[13px] font-sans cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">volume_up</span>
              <span>Listen (보통 속도)</span>
            </button>

            <button
              type="button"
              onClick={handlePlayTargetSlow}
              disabled={isPlayingAudio}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#f6ecea] hover:bg-[#eae0de] text-[#012d1d] rounded-xl active:scale-95 transition-all font-semibold text-[13px] font-sans cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">speed</span>
              <span>Slow (느리게)</span>
            </button>
          </div>
        </div>

        {/* 3. Bottom Interactive Practice Area (~40%) */}
        <div className="flex flex-col bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          {micNotice && (
            <div className="mb-2 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2 text-xs text-center">
              {micNotice}
            </div>
          )}

          {/* Mic Action Hub */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative flex items-center justify-center">
              {/* Gentle ripple ring on active state */}
              <div
                className={`absolute w-20 h-20 rounded-full bg-[#95d4b3]/40 transition-transform duration-700 pointer-events-none ${
                  micState === 'listening' ? 'scale-125 opacity-90 animate-ping' : 'scale-100 opacity-0'
                }`}
              />

              <button
                aria-label="Tap to speak your response"
                type="button"
                onClick={handleMicClick}
                disabled={isPlayingAudio}
                className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer z-10 ${
                  isPlayingAudio
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : micState === 'listening'
                    ? 'bg-[#85530b] text-white ring-4 ring-[#ffddba]'
                    : 'bg-[#1b4332] text-white hover:bg-[#012d1d]'
                }`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {micState === 'listening' ? 'graphic_eq' : 'mic'}
                </span>
              </button>
            </div>

            <span className="text-[13px] text-[#012d1d] font-bold mt-2 font-sans">
              {isPlayingAudio
                ? 'Playing audio...'
                : micState === 'listening'
                ? 'Listening... (듣고 있어요)'
                : micState === 'done'
                ? 'Done (완료)'
                : 'Tap to speak (말하기 시작)'}
            </span>
            <span className="text-[11px] text-[#414844] font-sans">
              Speak clearly in English
            </span>
          </div>

          {/* Speech Recognition Feedback */}
          <div className="flex flex-col bg-[#fcf1ef] rounded-xl p-3 mt-2 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[#414844] mb-0.5">
              <span className="material-symbols-outlined text-[14px]">record_voice_over</span>
              <span className="text-[11px] font-bold font-sans">What you said</span>
            </div>
            <p className="text-[14px] text-[#012d1d] font-medium font-sans">
              {studentSaid ? (
                `"${studentSaid}"`
              ) : (
                <span className="text-[#717973] italic">Tap the mic and speak the reply...</span>
              )}
            </p>
          </div>

          {/* Partner Response Feedback Box */}
          <div className="flex items-start gap-2.5 bg-[#b1f0ce]/25 border border-[#a5d0b9]/40 rounded-xl p-3 mt-2">
            <div className="w-6 h-6 rounded-full bg-[#1b4332] text-white flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">
                {isLoadingFeedback ? 'sync' : 'check'}
              </span>
            </div>
            <div className="flex flex-col flex-1">
              <span className="text-[12px] text-[#012d1d] font-bold font-sans">
                {situation.partner.name}&apos;s Reaction
              </span>
              <p className="text-[13px] text-[#1f1b1a] leading-snug mt-0.5 font-sans">
                {isLoadingFeedback ? (
                  <span className="text-gray-500 italic">Thinking...</span>
                ) : feedbackText ? (
                  feedbackText
                ) : (
                  <span className="text-[#414844]">
                    Speak when you&apos;re ready, and {situation.partner.name} will listen!
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Manual text input fallback option */}
          {showManualInput && (
            <form onSubmit={handleManualSubmit} className="flex gap-2 mt-2">
              <input
                type="text"
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Type your sentence here..."
                className="flex-1 text-xs border border-gray-300 rounded-xl px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-[#1b4332]"
              />
              <button
                type="submit"
                className="bg-[#b1f0ce] text-[#002114] text-xs font-bold px-3 py-2 rounded-xl"
              >
                Test
              </button>
            </form>
          )}

          {/* Navigation & Bottom Actions */}
          <div className="grid grid-cols-12 gap-2 mt-3.5 pt-1">
            {/* Try Again */}
            <button
              type="button"
              onClick={handleTryAgain}
              className="col-span-4 py-3 bg-[#f6ecea] hover:bg-[#eae0de] text-[#1f1b1a] rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-all text-[13px] font-semibold font-sans cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              <span>Try Again</span>
            </button>

            {/* Next Step (Primary Action) */}
            <button
              type="button"
              onClick={handleNext}
              className="col-span-5 py-3 bg-[#1b4332] hover:bg-[#012d1d] text-white rounded-xl flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-[13px] font-semibold font-sans cursor-pointer"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>

            {/* Skip */}
            <button
              type="button"
              onClick={handleSkip}
              className="col-span-3 py-3 bg-transparent text-[#414844] hover:bg-[#f6ecea] rounded-xl flex items-center justify-center active:scale-95 transition-all text-[13px] font-medium font-sans cursor-pointer"
            >
              <span>Skip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
