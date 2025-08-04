import React from 'react';

interface LearnWithSaraiLogoProps {
  className?: string;
  size?: number;
}

const LearnWithSaraiLogo: React.FC<LearnWithSaraiLogoProps> = ({ 
  className = "h-8 w-8", 
  size = 32 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Colombian Flag Background (left half) */}
      <rect x="0" y="0" width="16" height="32" fill="#FFCD00" />
      <rect x="0" y="10.67" width="16" height="10.67" fill="#003893" />
      <rect x="0" y="21.33" width="16" height="10.67" fill="#CE1126" />
      
      {/* US Flag Background (right half) */}
      <rect x="16" y="0" width="16" height="32" fill="#B22234" />
      <rect x="16" y="2.46" width="16" height="2.46" fill="#FFFFFF" />
      <rect x="16" y="7.38" width="16" height="2.46" fill="#FFFFFF" />
      <rect x="16" y="12.31" width="16" height="2.46" fill="#FFFFFF" />
      <rect x="16" y="17.23" width="16" height="2.46" fill="#FFFFFF" />
      <rect x="16" y="22.15" width="16" height="2.46" fill="#FFFFFF" />
      <rect x="16" y="27.08" width="16" height="2.46" fill="#FFFFFF" />
      
      {/* Blue canton for US flag */}
      <rect x="16" y="0" width="8" height="12.31" fill="#3C3B6E" />
      
      {/* Stars (simplified - just a few representative ones) */}
      <circle cx="18" cy="2" r="0.5" fill="#FFFFFF" />
      <circle cx="22" cy="2" r="0.5" fill="#FFFFFF" />
      <circle cx="26" cy="2" r="0.5" fill="#FFFFFF" />
      <circle cx="20" cy="4" r="0.5" fill="#FFFFFF" />
      <circle cx="24" cy="4" r="0.5" fill="#FFFFFF" />
      <circle cx="18" cy="6" r="0.5" fill="#FFFFFF" />
      <circle cx="22" cy="6" r="0.5" fill="#FFFFFF" />
      <circle cx="26" cy="6" r="0.5" fill="#FFFFFF" />
      <circle cx="20" cy="8" r="0.5" fill="#FFFFFF" />
      <circle cx="24" cy="8" r="0.5" fill="#FFFFFF" />
      <circle cx="18" cy="10" r="0.5" fill="#FFFFFF" />
      <circle cx="22" cy="10" r="0.5" fill="#FFFFFF" />
      
      {/* Glasses Frame */}
      <g stroke="#2D2D2D" strokeWidth="1.5" fill="none">
        {/* Left lens */}
        <circle cx="12" cy="16" r="5" fill="rgba(255,255,255,0.2)" />
        {/* Right lens */}
        <circle cx="20" cy="16" r="5" fill="rgba(255,255,255,0.2)" />
        {/* Bridge */}
        <line x1="17" y1="16" x2="15" y2="16" />
        {/* Left temple */}
        <line x1="7" y1="16" x2="4" y2="14" />
        {/* Right temple */}
        <line x1="25" y1="16" x2="28" y2="14" />
      </g>
      
      {/* Glasses reflection */}
      <g fill="#FFFFFF" opacity="0.3">
        <ellipse cx="10" cy="14" rx="1.5" ry="2" />
        <ellipse cx="22" cy="14" rx="1.5" ry="2" />
      </g>
    </svg>
  );
};

export default LearnWithSaraiLogo;