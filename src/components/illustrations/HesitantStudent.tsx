import React from 'react';

export const HesitantStudent: React.FC<{ className?: string }> = ({ className = 'w-48 h-64' }) => {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Hesitant sweat drop */}
      <path
        d="M152 70 C 150 63, 145 61, 145 55 C 145 51, 155 51, 155 55 C 155 61, 154 63, 152 70 Z"
        fill="#38bdf8"
      />

      {/* Hand scratching back of head (behind head) */}
      <circle cx="148" cy="62" r="9" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
      <path
        d="M148 64 C 158 74, 164 96, 146 118"
        stroke="#ffffff"
        strokeWidth="16"
        strokeLinecap="round"
      />
      {/* Sleeve stripe cuff */}
      <path
        d="M148 68 C 150 71, 152 74, 153 78"
        stroke="#15803d"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Head & Neck */}
      <rect x="94" y="98" width="16" height="18" fill="#fed7aa" rx="4" />
      <circle cx="102" cy="74" r="30" fill="#fed7aa" />

      {/* Hair (messy student cut) */}
      <path
        d="M72 72 C 72 46, 90 40, 106 40 C 122 40, 136 48, 136 70 C 136 74, 134 82, 134 86 C 130 75, 126 65, 116 62 C 104 60, 96 66, 88 64 C 80 62, 74 68, 72 72 Z"
        fill="#1e293b"
      />
      <path
        d="M72 74 C 70 82, 69 92, 71 96 C 74 94, 76 86, 76 80 Z"
        fill="#1e293b"
      />

      {/* Ears */}
      <circle cx="73" cy="76" r="6" fill="#fed7aa" />
      <circle cx="131" cy="76" r="6" fill="#fed7aa" />

      {/* Eyebrows (awkward/hesitant slant) */}
      <path d="M84 66 C 88 64, 94 67, 96 69" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M110 69 C 112 67, 118 64, 122 66" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />

      {/* Eyes (looking slightly upward-right/shy) */}
      <ellipse cx="91" cy="76" rx="4" ry="4.5" fill="#0f172a" />
      <circle cx="92.5" cy="74.5" r="1.5" fill="#ffffff" />
      <ellipse cx="115" cy="76" rx="4" ry="4.5" fill="#0f172a" />
      <circle cx="116.5" cy="74.5" r="1.5" fill="#ffffff" />

      {/* Shy blush */}
      <ellipse cx="85" cy="84" rx="6" ry="3.5" fill="#f87171" opacity="0.45" />
      <ellipse cx="121" cy="84" rx="6" ry="3.5" fill="#f87171" opacity="0.45" />

      {/* Nose */}
      <path d="M102 78 L 100 83 L 104 83" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Embarrassed / awkward shy wavy smile */}
      <path
        d="M96 90 Q 102 93 105 89 Q 108 92 112 89"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Body / Varsity Jacket (과잠) */}
      {/* Left arm (hanging casually) */}
      <path
        d="M62 120 C 52 145, 52 170, 56 195"
        stroke="#ffffff"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <circle cx="56" cy="198" r="7" fill="#fed7aa" />

      {/* Main Jacket Torso - Dark Forest Green (#14532d / #166534) */}
      <path
        d="M68 120 L 78 110 L 126 110 L 136 120 L 138 200 L 66 200 Z"
        fill="#14532d"
        stroke="#052e16"
        strokeWidth="2"
      />

      {/* White & Green Striped Ribbed Collar */}
      <path
        d="M84 108 Q 102 122 120 108"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M86 109 Q 102 122 118 109"
        stroke="#15803d"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Inner T-shirt */}
      <path d="M94 116 Q 102 124 110 116" fill="#f8fafc" />

      {/* Front Jacket Snap Buttons */}
      <circle cx="102" cy="135" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <circle cx="102" cy="155" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <circle cx="102" cy="175" r="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
      <line x1="102" y1="122" x2="102" y2="198" stroke="#052e16" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* SKKU Varsity 'S' Emblem on left chest */}
      <rect x="114" y="130" width="16" height="18" rx="2" fill="#ffffff" opacity="0.9" />
      <text
        x="122"
        y="144"
        fill="#14532d"
        fontSize="13"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        S
      </text>

      {/* Jacket waistband (striped rib) */}
      <rect x="66" y="196" width="72" height="10" fill="#ffffff" stroke="#052e16" strokeWidth="1.5" rx="2" />
      <line x1="66" y1="201" x2="138" y2="201" stroke="#15803d" strokeWidth="2" />

      {/* Pants */}
      <rect x="76" y="206" width="24" height="28" fill="#1e293b" />
      <rect x="104" y="206" width="24" height="28" fill="#1e293b" />
    </svg>
  );
};
