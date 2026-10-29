import React from 'react';

interface PartnerAvatarProps {
  type: 'emma' | 'leo' | 'sofia';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PartnerAvatar: React.FC<PartnerAvatarProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  const sizeClass =
    size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-14 h-14' : 'w-20 h-20';

  if (type === 'emma') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-400 overflow-hidden shrink-0 ${sizeClass} ${className}`}
        title="Emma (Canada, Exchange Student)"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Hair back */}
          <path d="M22 45 C 20 20, 80 20, 78 45 C 78 65, 82 85, 82 85 L 18 85 Z" fill="#d97706" />
          {/* Face */}
          <ellipse cx="50" cy="52" rx="22" ry="24" fill="#fed7aa" />
          {/* Front Hair / bangs */}
          <path d="M25 45 C 32 30, 68 28, 75 42 C 70 38, 55 38, 48 42 C 40 45, 30 45, 25 45 Z" fill="#f59e0b" />
          {/* Eyes */}
          <circle cx="41" cy="51" r="3" fill="#0f172a" />
          <circle cx="59" cy="51" r="3" fill="#0f172a" />
          <circle cx="42" cy="50" r="1" fill="#ffffff" />
          <circle cx="60" cy="50" r="1" fill="#ffffff" />
          {/* Cheerful smile */}
          <path d="M44 62 Q 50 67 56 62" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          {/* Blush */}
          <ellipse cx="36" cy="57" rx="3.5" ry="2" fill="#f87171" opacity="0.4" />
          <ellipse cx="64" cy="57" rx="3.5" ry="2" fill="#f87171" opacity="0.4" />
          {/* SKKU Varsity Jacket Collar & Body */}
          <path d="M22 86 C 22 75, 40 73, 50 78 C 60 73, 78 75, 78 86 L 78 100 L 22 100 Z" fill="#14532d" />
          <path d="M38 78 Q 50 86 62 78" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 79 Q 50 86 60 79" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
          {/* Small S on jacket */}
          <text x="64" y="93" fill="#ffffff" fontSize="7" fontWeight="bold">S</text>
        </svg>
      </div>
    );
  }

  if (type === 'leo') {
    return (
      <div
        className={`relative inline-flex items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-400 overflow-hidden shrink-0 ${sizeClass} ${className}`}
        title="Leo (Australia, Exchange Student)"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Wavy brown hair */}
          <path d="M26 44 C 24 22, 76 22, 74 44 C 74 50, 78 40, 74 32 C 60 18, 40 18, 26 32 Z" fill="#78350f" />
          {/* Face */}
          <ellipse cx="50" cy="53" rx="22" ry="24" fill="#fde68a" />
          {/* Hair bangs */}
          <path d="M26 38 C 34 30, 48 30, 56 36 C 64 34, 70 38, 74 44 C 70 40, 60 38, 52 42 C 42 42, 34 38, 26 38 Z" fill="#92400e" />
          {/* Eyebrows */}
          <path d="M36 45 Q 42 43 47 46" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M53 46 Q 58 43 64 45" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="41" cy="51" r="3" fill="#0f172a" />
          <circle cx="59" cy="51" r="3" fill="#0f172a" />
          {/* Relaxed Aussie smirk */}
          <path d="M43 62 Q 52 66 58 61" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
          {/* SKKU Varsity Jacket */}
          <path d="M22 86 C 22 75, 40 73, 50 78 C 60 73, 78 75, 78 86 L 78 100 L 22 100 Z" fill="#14532d" />
          <path d="M38 78 Q 50 86 62 78" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 79 Q 50 86 60 79" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
          <text x="64" y="93" fill="#ffffff" fontSize="7" fontWeight="bold">S</text>
        </svg>
      </div>
    );
  }

  // Sofia
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-400 overflow-hidden shrink-0 ${sizeClass} ${className}`}
      title="Sofia (Classmate, Group Partner)"
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Dark bun */}
        <circle cx="50" cy="22" r="13" fill="#1e1b4b" />
        <ellipse cx="50" cy="53" rx="21" ry="23" fill="#fbcfe8" />
        {/* Hair frame */}
        <path d="M26 44 C 28 26, 72 26, 74 44 C 74 60, 72 65, 74 70 C 68 62, 68 45, 50 45 C 32 45, 32 62, 26 70 Z" fill="#312e81" />
        {/* Cute smart glasses */}
        <rect x="34" y="47" width="13" height="9" rx="3" stroke="#475569" strokeWidth="1.5" fill="none" />
        <rect x="53" y="47" width="13" height="9" rx="3" stroke="#475569" strokeWidth="1.5" fill="none" />
        <line x1="47" y1="51" x2="53" y2="51" stroke="#475569" strokeWidth="1.5" />
        {/* Eyes behind glasses */}
        <circle cx="40.5" cy="51.5" r="2" fill="#0f172a" />
        <circle cx="59.5" cy="51.5" r="2" fill="#0f172a" />
        {/* Gentle encouraging smile */}
        <path d="M44 63 Q 50 67 56 63" stroke="#be185d" strokeWidth="1.8" strokeLinecap="round" />
        {/* SKKU Varsity Jacket */}
        <path d="M22 86 C 22 75, 40 73, 50 78 C 60 73, 78 75, 78 86 L 78 100 L 22 100 Z" fill="#14532d" />
        <path d="M38 78 Q 50 86 62 78" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 79 Q 50 86 60 79" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
        <text x="64" y="93" fill="#ffffff" fontSize="7" fontWeight="bold">S</text>
      </svg>
    </div>
  );
};
