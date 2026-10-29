import React from 'react';

interface PlaceIconProps {
  type: 'classroom' | 'cafe' | 'assignment';
  className?: string;
  color?: string;
}

export const PlaceIcon: React.FC<PlaceIconProps> = ({
  type,
  className = 'w-16 h-16',
  color = '#86efac', // light green line icon
}) => {
  if (type === 'classroom') {
    // Lecture hall seats / desks line icon
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Row 1 - Back row seats */}
        <path d="M15 32 H 45" />
        <path d="M55 32 H 85" />
        <path d="M22 32 V 22 Q 22 18 26 18 H 34 Q 38 18 38 22 V 32" />
        <path d="M62 32 V 22 Q 62 18 66 18 H 74 Q 78 18 78 22 V 32" />

        {/* Row 2 - Middle row desk and seats */}
        <path d="M10 58 H 48" />
        <path d="M52 58 H 90" />
        <path d="M18 58 V 46 Q 18 42 23 42 H 35 Q 40 42 40 46 V 58" />
        <path d="M60 58 V 46 Q 60 42 65 42 H 77 Q 82 42 82 46 V 58" />

        {/* Front lecture desk & podium board */}
        <path d="M8 82 H 92" />
        <path d="M18 82 V 92" />
        <path d="M48 82 V 92" />
        <path d="M52 82 V 92" />
        <path d="M82 82 V 92" />

        {/* Professor chalkboard / screen outline at top */}
        <rect x="30" y="6" width="40" height="8" rx="1.5" />
      </svg>
    );
  }

  if (type === 'cafe') {
    // Coffee cup with steam line icon
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Coffee cup */}
        <path d="M22 42 H 72 V 64 C 72 74 63 82 51 82 H 43 C 31 82 22 74 22 64 Z" />
        {/* Handle */}
        <path d="M72 48 H 80 C 85 48 88 52 88 57 C 88 62 85 66 80 66 H 72" />
        {/* Saucer */}
        <path d="M14 86 H 86" />
        {/* Steam rising */}
        <path d="M35 34 C 32 26 38 20 35 12" />
        <path d="M47 34 C 44 24 50 18 47 10" />
        <path d="M59 34 C 56 26 62 20 59 12" />
      </svg>
    );
  }

  // assignment: book and laptop line icon
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Laptop screen */}
      <rect x="25" y="22" width="50" height="34" rx="3" />
      {/* Laptop base */}
      <path d="M15 62 H 85 L 80 68 H 20 Z" />
      {/* Trackpad notch */}
      <path d="M45 68 H 55" />

      {/* Open notebook / book in front */}
      <path d="M20 84 Q 50 78 50 92 Q 50 78 80 84" />
      <path d="M20 84 V 90 Q 50 84 50 94" />
      <path d="M80 84 V 90 Q 50 84 50 94" />
      <line x1="50" y1="78" x2="50" y2="94" />
    </svg>
  );
};
