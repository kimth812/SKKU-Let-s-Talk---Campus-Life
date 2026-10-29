import { useState, useEffect } from 'react';
import { SituationId, TurnResult } from './types';
import { SITUATIONS } from './data/situations';
import { StartScreen } from './components/StartScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { ResultScreen } from './components/ResultScreen';
import { speechService } from './services/speechService';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'practice' | 'result'>('start');
  const [selectedSituationId, setSelectedSituationId] = useState<SituationId>('situation-a');
  const [results, setResults] = useState<TurnResult[]>([]);
  const [browserNotice, setBrowserNotice] = useState<string | null>(null);

  // Check browser compatibility on load
  useEffect(() => {
    if (speechService.isInAppBrowser()) {
      setBrowserNotice(
        'For best microphone support, tap ⋮ and open in your default browser (Chrome / Safari).'
      );
    } else if (!speechService.isSpeechRecognitionSupported()) {
      setBrowserNotice('Please open it in Chrome for full voice recognition support.');
    }
  }, []);

  const handleSelectSituation = (id: SituationId) => {
    setSelectedSituationId(id);
    setResults([]);
    setCurrentScreen('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishPractice = (finalResults: TurnResult[]) => {
    setResults(finalResults);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setResults([]);
    setCurrentScreen('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextSituation = (nextId: SituationId) => {
    setSelectedSituationId(nextId);
    setResults([]);
    setCurrentScreen('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    setResults([]);
    setCurrentScreen('start');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSituation = SITUATIONS[selectedSituationId];

  return (
    <div className="min-h-screen bg-[#f6ecea] flex flex-col items-center justify-start p-0 sm:py-6 sm:px-4 font-sans text-[#1f1b1a]">
      {/* Mobile-stack device container matching reference UI */}
      <main className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-[#fff8f6] sm:rounded-3xl sm:border sm:border-gray-200 sm:shadow-md overflow-x-hidden flex flex-col relative">
        {currentScreen === 'start' && (
          <StartScreen
            onSelectSituation={handleSelectSituation}
            browserNotice={browserNotice}
          />
        )}

        {currentScreen === 'practice' && currentSituation && (
          <PracticeScreen
            situation={currentSituation}
            onFinish={handleFinishPractice}
            onExit={handleHome}
          />
        )}

        {currentScreen === 'result' && currentSituation && (
          <ResultScreen
            situation={currentSituation}
            results={results}
            onRetry={handleRetry}
            onNextSituation={handleNextSituation}
            onHome={handleHome}
          />
        )}
      </main>
    </div>
  );
}
