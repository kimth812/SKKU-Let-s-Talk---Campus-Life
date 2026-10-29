import React from 'react';
import { SituationId } from '../types';

interface StartScreenProps {
  onSelectSituation: (id: SituationId) => void;
  browserNotice?: string | null;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onSelectSituation,
  browserNotice,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pt-3 pb-6 select-none bg-surface min-h-full">
      {/* Browser compatibility banner if any */}
      {browserNotice && (
        <div className="mb-3 bg-secondary-container/40 border border-secondary/30 rounded-xl p-2.5 text-xs text-on-secondary-container flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-secondary">info</span>
          <span className="font-medium">{browserNotice}</span>
        </div>
      )}

      {/* Top ~25%: Title & Guidance Banner */}
      <div className="w-full bg-[#c1ecd4] rounded-2xl p-4 shadow-sm mb-3.5 border border-[#a5d0b9]/40">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#012d1d] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              school
            </span>
            <span className="text-[12px] font-bold text-[#274e3d] tracking-wider uppercase font-sans">
              SKKU English Hub
            </span>
          </div>
          <span className="material-symbols-outlined text-[#012d1d] opacity-60 text-[20px]">
            forum
          </span>
        </div>

        <div className="mt-1">
          <h1 className="font-serif text-[30px] sm:text-[32px] text-[#012d1d] font-medium tracking-tight leading-tight">
            SKKU, Let&apos;s Talk!
          </h1>
          <p className="text-[16px] text-[#1b4332] font-bold -mt-0.5 font-sans">
            Campus Life
          </p>
        </div>

        <div className="mt-3 pt-1 flex items-center gap-1.5">
          <span
            className="material-symbols-outlined text-[#85530b] text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            touch_app
          </span>
          <p className="text-[14px] text-[#002114] font-semibold font-sans">
            Pick a situation.{' '}
            <span className="text-[13px] font-normal opacity-85 text-[#274e3d]">
              (상황을 선택해 보세요)
            </span>
          </p>
        </div>
      </div>

      {/* Middle ~35%: Visual Anchor Illustration */}
      <div className="w-full bg-white rounded-2xl p-3.5 shadow-sm mb-3.5 flex flex-col items-center border border-gray-100">
        <div className="w-full flex justify-end mb-2">
          <div className="bg-[#f0e6e4] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-[#c1c8c2]/30">
            <span className="font-serif text-[16px] text-[#85530b] font-bold leading-none">“</span>
            <span className="text-[12px] text-[#414844] font-medium font-sans">Umm... hi?</span>
            <span className="font-serif text-[16px] text-[#85530b] font-bold leading-none">”</span>
          </div>
        </div>

        <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-[#fcf1ef] relative shadow-inner">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRIZW3vP064Ua17KnLOKvOS9XJTa7tDdzZhhqh0ptScidV6usboo0-MafQQUp7MDpF1ulORUz9f3_DX3ZC9BLUmhB6GatbXUPgx16-odYstvuVHt-HiB_lF_siU7ssDK76u-eFO0FjxeivOCBrBVNfXhM_ZJqMuLr3QFdeg0GeQ_P1FRvWPqAA24PCbI_ISWCDEyg-ild3zSLJ3kWNZA1XgeDNO-hKl6FPgMKTdPPtTSKVgrWF-H0aVg"
            alt="Friendly Korean student in SKKU varsity jacket scratching head in front of Myeongnyundang"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Bottom ~40%: 3 Clean Scenario Action Cards + Voice Privacy Notice */}
      <div className="w-full flex flex-col gap-2.5">
        {/* Situation 1 */}
        <button
          type="button"
          onClick={() => onSelectSituation('situation-a')}
          className="w-full text-left bg-[#c1ecd4] hover:bg-[#a5d0b9] active:scale-[0.98] transition-all duration-200 rounded-2xl p-3.5 shadow-sm flex items-center justify-between group cursor-pointer border border-[#a5d0b9]/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#012d1d] group-hover:bg-[#012d1d] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[16px] text-[#002114] font-bold leading-tight font-sans">
                  Before Class
                </span>
                <span className="text-[12px] text-[#274e3d] opacity-80 font-sans">
                  (수업 전 스몰토크)
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-[#274e3d] text-[13px] font-sans">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_circle
                </span>
                <span className="font-medium truncate">Partner: Emma (Canada)</span>
                <span className="text-[#c1c8c2] text-[10px]">•</span>
                <span className="opacity-85 truncate">Classroom 302</span>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#012d1d] shrink-0 ml-1 shadow-sm group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </button>

        {/* Situation 2 */}
        <button
          type="button"
          onClick={() => onSelectSituation('situation-b')}
          className="w-full text-left bg-[#c1ecd4] hover:bg-[#a5d0b9] active:scale-[0.98] transition-all duration-200 rounded-2xl p-3.5 shadow-sm flex items-center justify-between group cursor-pointer border border-[#a5d0b9]/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#012d1d] group-hover:bg-[#012d1d] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">local_cafe</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[16px] text-[#002114] font-bold leading-tight font-sans">
                  Café Chat
                </span>
                <span className="text-[12px] text-[#274e3d] opacity-80 font-sans">
                  (카페에서 마주쳤을 때)
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-[#274e3d] text-[13px] font-sans">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_circle
                </span>
                <span className="font-medium truncate">Partner: Leo (Australia)</span>
                <span className="text-[#c1c8c2] text-[10px]">•</span>
                <span className="opacity-85 truncate">Campus Café</span>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#012d1d] shrink-0 ml-1 shadow-sm group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </button>

        {/* Situation 3 */}
        <button
          type="button"
          onClick={() => onSelectSituation('situation-c')}
          className="w-full text-left bg-[#c1ecd4] hover:bg-[#a5d0b9] active:scale-[0.98] transition-all duration-200 rounded-2xl p-3.5 shadow-sm flex items-center justify-between group cursor-pointer border border-[#a5d0b9]/50"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm text-[#012d1d] group-hover:bg-[#012d1d] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">co_present</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[16px] text-[#002114] font-bold leading-tight font-sans">
                  Assignment Talk
                </span>
                <span className="text-[12px] text-[#274e3d] opacity-80 font-sans">
                  (수업 과제 대화)
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-[#274e3d] text-[13px] font-sans">
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_circle
                </span>
                <span className="font-medium truncate">Partner: Sofia</span>
                <span className="text-[#c1c8c2] text-[10px]">•</span>
                <span className="opacity-85 truncate">Presentation Prep</span>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#012d1d] shrink-0 ml-1 shadow-sm group-hover:translate-x-0.5 transition-transform">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </button>

        {/* Underneath Privacy Notice */}
        <div className="mt-1 px-3 py-2 flex items-start gap-2 bg-[#fcf1ef] rounded-xl border border-gray-100">
          <span
            className="material-symbols-outlined text-[#717973] text-[16px] shrink-0 mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
          <p className="text-[11px] text-[#414844] leading-relaxed font-sans">
            <span className="font-bold text-[#012d1d]">Safe &amp; Private:</span> Your voice is
            processed to turn it into text and is not recorded or saved. (음성은 텍스트 변환에만
            사용되며 저장되거나 기록되지 않습니다).
          </p>
        </div>
      </div>
    </div>
  );
};
