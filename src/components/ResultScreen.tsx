import React from 'react';
import { SituationData, TurnResult, SituationId } from '../types';
import { SITUATIONS } from '../data/situations';

interface ResultScreenProps {
  situation: SituationData;
  results: TurnResult[];
  onRetry: () => void;
  onNextSituation: (nextId: SituationId) => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  situation,
  results,
  onRetry,
  onNextSituation,
  onHome,
}) => {
  // Star rules (reward completion):
  // ⭐⭐⭐ Finished all 5 sentences without using [Skip]
  // ⭐⭐ Finished all 5 sentences and used [Skip] once or twice
  // ⭐ Finished the whole dialogue
  const skipCount = results.filter((r) => r.skipped).length;
  const starCount = skipCount === 0 ? 3 : skipCount <= 2 ? 2 : 1;

  const nextSituationId: SituationId =
    situation.id === 'situation-a'
      ? 'situation-b'
      : situation.id === 'situation-b'
      ? 'situation-c'
      : 'situation-a';

  const nextSituation = SITUATIONS[nextSituationId];

  // Helper to render target sentence with highlighted key words
  const renderSentenceWithKeywords = (text: string, turnIndex: number) => {
    const turnData = situation.turns[turnIndex];
    if (!turnData) return text;
    const keyWords = turnData.keyWords;
    const regex = new RegExp(`(${keyWords.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isKeyword = keyWords.some((kw) => kw.toLowerCase() === part.toLowerCase());
      if (isKeyword) {
        return (
          <span
            key={i}
            className="font-bold text-[#012d1d] underline underline-offset-4 decoration-2 decoration-[#012d1d]"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fff8f6] text-[#1f1b1a] selection:bg-[#b1f0ce] selection:text-[#002114]">
      {/* Fixed Header */}
      <header className="sticky top-0 inset-x-0 z-40 bg-[#fff8f6]/90 backdrop-blur-xl border-b border-gray-200/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Go back"
              type="button"
              onClick={onHome}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#414844] hover:text-[#1f1b1a] hover:bg-[#f6ecea] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#85530b] uppercase tracking-wider font-sans">
                SKKU, Let&apos;s Talk!
              </span>
              <h1 className="text-[17px] font-bold text-[#012d1d] font-sans -mt-0.5">
                Session Completion
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

      {/* Main Container */}
      <div className="flex-1 flex flex-col w-full px-4 pt-3 pb-8">
        {/* Top Section: Celebration & Affirmation (~25%) */}
        <section className="flex flex-col w-full bg-white rounded-2xl overflow-hidden shadow-sm mb-4 border border-gray-100">
          {/* Campus Watercolor Illustration as Clear Visual Unit Header */}
          <div className="w-full h-44 sm:h-52 relative overflow-hidden bg-[#f6ecea]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQJ6kN49E8PgzSbKHysXK980WZzYCs8IovZHOXuDAeiOSKh__Tykny8UrYHjD5IYn4qQErZE7sSoG_3guz9YnqTk-2jXiof_4PIt1aR-pky-J5x83t8sg5nHCgzlYk38cr5TgtxIP_gQjc63HqLpnO4cmxuwHAUdCcEoBd_QjdYgL6cNHYL2UhsHHKSCTTkRtgwOtbR_CeAIix0c1GKEyxpwF96X0LFVo6QgSZW48dpmX-1Fa0X0ZyNw"
              alt="Sungkyunkwan University campus in gentle morning sunlight"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Combined Celebration & Title Module */}
          <div className="flex flex-col items-center text-center p-4 gap-1">
            {/* 3 Warm Encouragement Stars */}
            <div className="flex items-center justify-center gap-1 text-[#85530b]">
              <span
                className={`material-symbols-outlined text-[28px] transition-transform ${
                  starCount >= 1 ? 'text-[#85530b] scale-100' : 'text-gray-300'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className={`material-symbols-outlined text-[34px] transition-transform ${
                  starCount >= 2 ? 'text-[#85530b] scale-110' : 'text-gray-300'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                className={`material-symbols-outlined text-[28px] transition-transform ${
                  starCount >= 3 ? 'text-[#85530b] scale-100' : 'text-gray-300'
                }`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#b1f0ce] text-[#002114] mt-1 font-sans">
              <span className="material-symbols-outlined text-[14px]">celebration</span>
              <span className="text-[12px] font-bold">학습 완료</span>
            </div>

            <h2 className="font-serif text-[24px] sm:text-[26px] text-[#012d1d] font-medium tracking-tight mt-1">
              Well done!{' '}
              <span className="font-sans text-[15px] font-normal text-[#414844]">
                (참 잘했어요!)
              </span>
            </h2>

            <p className="text-[14px] text-[#012d1d]/85 font-semibold font-sans">
              {situation.title}: Small Talk Completed!
            </p>
          </div>
        </section>

        {/* Middle Section: Stress-Free Sentence Review (~35%) */}
        <section className="flex flex-col gap-2 mb-4">
          <div className="flex items-center justify-between px-1 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#012d1d] text-[20px]">auto_stories</span>
              <h3 className="text-[17px] font-bold text-[#012d1d] font-sans">
                Practice Review
              </h3>
            </div>
            <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f0e6e4] text-[#414844] font-sans">
              5/5 Completed
            </span>
          </div>

          {/* Review Card Container */}
          <div className="bg-[#fcf1ef] rounded-2xl p-3 shadow-sm flex flex-col gap-2.5 border border-gray-100">
            {results.map((res, index) => {
              const isCompleted = !res.skipped;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-3 flex flex-col gap-1 shadow-sm border border-gray-100/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#85530b] font-bold tracking-wider font-sans">
                      TURN 0{index + 1}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-[#b1f0ce] text-[#002114] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </div>
                  </div>

                  <p className="font-serif text-[18px] sm:text-[20px] text-[#1f1b1a] leading-relaxed">
                    {renderSentenceWithKeywords(res.targetSentence, index)}
                  </p>

                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="material-symbols-outlined text-[#717973] text-[15px]">
                      record_voice_over
                    </span>
                    <p className="text-[13px] text-[#414844] italic font-sans truncate">
                      You: “{res.studentSaid}”
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Section: Partner's Warm Note & Guided Actions (~40%) */}
        <section className="flex flex-col gap-3">
          {/* Partner's Personal Supportive Note */}
          <div className="bg-white rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm border border-gray-100">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#012d1d] shadow-sm">
                <img
                  src={
                    situation.partner.avatarUrl ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZmRMKJUd15SihFjJtuIK3Zp-dC_HiP2byIWNdAWFl5aWTEHarK9QUjvY4-kYVME4W05_L53qNg8oMf6FbHn_GM1y84B-amxwNGHUPGY7KMFDKjLlGOl7q7mDgyPMCL8xBFsrCllnwoOQjHJjkDKl_curvEtpnHi_GJgAD39isEB7jnhZOm1n9iccA4EJnRryEUuxtyHaXALytn23iFq3zF3cRKppzE4Ybw8IHTbpn9WsslnFHXTIHA'
                  }
                  alt={situation.partner.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#fdb96b] text-[#774800] flex items-center justify-center shadow-xs">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] text-[#012d1d] font-bold font-sans">
                  {situation.partner.name}
                </span>
                <span className="text-[11px] text-[#85530b] font-sans font-medium">Classmate</span>
              </div>
              <p className="font-serif text-[16px] text-[#1f1b1a] mt-0.5 leading-snug">
                “You did great today! See you in class! (오늘 정말 잘했어요!)”
              </p>
            </div>
          </div>

          {/* Action Buttons Stack (Calm, Warm Light-Green Palette) */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* 1. Next Situation Button (High Primary Visual Anchor) */}
            <button
              type="button"
              onClick={() => onNextSituation(nextSituationId)}
              className="w-full h-[52px] rounded-2xl bg-[#012d1d] hover:bg-[#1b4332] text-white font-semibold text-[14px] font-sans flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>다음 대화 상황으로 ({nextSituation?.title || 'Next'})</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            {/* 2. Try Again Button (Comfortable Tonal Secondary) */}
            <button
              type="button"
              onClick={onRetry}
              className="w-full h-[52px] rounded-2xl bg-[#b1f0ce] hover:bg-[#95d4b3] text-[#002114] font-semibold text-[14px] font-sans flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">replay</span>
              <span>다시 연습하기 (Try Again)</span>
            </button>

            {/* 3. Home Button (Minimalist Tonal Surface) */}
            <button
              type="button"
              onClick={onHome}
              className="w-full h-[52px] rounded-2xl bg-[#f6ecea] hover:bg-[#eae0de] text-[#1f1b1a] font-semibold text-[14px] font-sans flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">roofing</span>
              <span>처음으로 (Home)</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
