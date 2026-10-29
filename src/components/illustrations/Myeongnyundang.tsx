import React from 'react';

export const Myeongnyundang: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Soft sky and ancient SKKU Ginkgo Tree foliage in background */}
      <circle cx="90" cy="80" r="50" fill="#fef08a" opacity="0.4" />
      <circle cx="60" cy="110" r="45" fill="#fde047" opacity="0.35" />
      <circle cx="120" cy="100" r="40" fill="#fef9c3" opacity="0.5" />
      <path
        d="M75 140 C 70 170, 60 190, 50 210"
        stroke="#78350f"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M68 165 C 80 175, 95 180, 105 185"
        stroke="#78350f"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Ground terrace / stone foundation (Woldae) */}
      <rect x="110" y="195" width="260" height="15" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      <rect x="95" y="210" width="290" height="12" rx="3" fill="#94a3b8" />

      {/* Main Pillars (wood) */}
      <rect x="140" y="125" width="8" height="70" fill="#9a3412" rx="2" />
      <rect x="180" y="125" width="8" height="70" fill="#9a3412" rx="2" />
      <rect x="220" y="125" width="8" height="70" fill="#9a3412" rx="2" />
      <rect x="260" y="125" width="8" height="70" fill="#9a3412" rx="2" />
      <rect x="300" y="125" width="8" height="70" fill="#9a3412" rx="2" />
      <rect x="340" y="125" width="8" height="70" fill="#9a3412" rx="2" />

      {/* Traditional Korean Windows & Lattice doors (Changhoji) */}
      <rect x="150" y="138" width="28" height="52" fill="#f8fafc" stroke="#b45309" strokeWidth="1.5" />
      <line x1="164" y1="138" x2="164" y2="190" stroke="#b45309" strokeWidth="1" />
      <line x1="150" y1="155" x2="178" y2="155" stroke="#b45309" strokeWidth="1" />
      <line x1="150" y1="172" x2="178" y2="172" stroke="#b45309" strokeWidth="1" />

      <rect x="190" y="138" width="28" height="52" fill="#f8fafc" stroke="#b45309" strokeWidth="1.5" />
      <line x1="204" y1="138" x2="204" y2="190" stroke="#b45309" strokeWidth="1" />
      <line x1="190" y1="155" x2="218" y2="155" stroke="#b45309" strokeWidth="1" />
      <line x1="190" y1="172" x2="218" y2="172" stroke="#b45309" strokeWidth="1" />

      {/* Central Board plaque "明倫堂" (Myeongnyundang) */}
      <rect x="228" y="118" width="32" height="15" rx="1.5" fill="#1e293b" stroke="#ca8a04" strokeWidth="1" />
      <text x="244" y="129" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="serif">明倫堂</text>

      <rect x="230" y="138" width="28" height="52" fill="#f8fafc" stroke="#b45309" strokeWidth="1.5" />
      <line x1="244" y1="138" x2="244" y2="190" stroke="#b45309" strokeWidth="1" />
      <line x1="230" y1="155" x2="258" y2="155" stroke="#b45309" strokeWidth="1" />
      <line x1="230" y1="172" x2="258" y2="172" stroke="#b45309" strokeWidth="1" />

      <rect x="270" y="138" width="28" height="52" fill="#f8fafc" stroke="#b45309" strokeWidth="1.5" />
      <line x1="284" y1="138" x2="284" y2="190" stroke="#b45309" strokeWidth="1" />
      <line x1="270" y1="155" x2="298" y2="155" stroke="#b45309" strokeWidth="1" />
      <line x1="270" y1="172" x2="298" y2="172" stroke="#b45309" strokeWidth="1" />

      <rect x="310" y="138" width="28" height="52" fill="#f8fafc" stroke="#b45309" strokeWidth="1.5" />
      <line x1="324" y1="138" x2="324" y2="190" stroke="#b45309" strokeWidth="1" />
      <line x1="310" y1="155" x2="338" y2="155" stroke="#b45309" strokeWidth="1" />
      <line x1="310" y1="172" x2="338" y2="172" stroke="#b45309" strokeWidth="1" />

      {/* Beam & eaves bracket set (Gong-po) */}
      <rect x="125" y="112" width="238" height="12" fill="#15803d" stroke="#14532d" strokeWidth="1.5" rx="1" />
      {/* Dancheong patterns */}
      <circle cx="135" cy="118" r="3" fill="#dc2626" />
      <circle cx="160" cy="118" r="3" fill="#22c55e" />
      <circle cx="185" cy="118" r="3" fill="#dc2626" />
      <circle cx="210" cy="118" r="3" fill="#22c55e" />
      <circle cx="275" cy="118" r="3" fill="#dc2626" />
      <circle cx="300" cy="118" r="3" fill="#22c55e" />
      <circle cx="325" cy="118" r="3" fill="#dc2626" />
      <circle cx="350" cy="118" r="3" fill="#22c55e" />

      {/* Traditional curved Tiled Roof (Giwa) */}
      <path
        d="M95 115 C 150 95, 335 95, 395 115 C 375 80, 310 70, 245 70 C 180 70, 115 80, 95 115 Z"
        fill="#334155"
        stroke="#1e293b"
        strokeWidth="2.5"
      />
      {/* Roof Ridge (Yongmaru) */}
      <path
        d="M170 70 C 210 66, 280 66, 320 70"
        stroke="#475569"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="170" cy="70" r="4" fill="#64748b" />
      <circle cx="320" cy="70" r="4" fill="#64748b" />

      {/* Roof tiles lines */}
      <path d="M140 106 L 180 75" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
      <path d="M180 102 L 210 73" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
      <path d="M220 101 L 235 72" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
      <path d="M265 101 L 255 72" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
      <path d="M305 102 L 280 73" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />
      <path d="M345 106 L 310 75" stroke="#1e293b" strokeWidth="1.5" opacity="0.6" />

      {/* Falling ginkgo leaves floating gently */}
      <path d="M70 70 Q 75 60 82 66 Q 78 74 70 70 Z" fill="#eab308" />
      <path d="M110 50 Q 115 42 121 47 Q 118 55 110 50 Z" fill="#eab308" />
      <path d="M360 85 Q 365 77 372 82 Q 368 90 360 85 Z" fill="#eab308" />
      <path d="M330 55 Q 336 48 342 53 Q 338 61 330 55 Z" fill="#eab308" />
    </svg>
  );
};
