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
    <div className="relative">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 32 32" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions */}
        <defs>
        </defs>
        
        {/* Colombian Flag Background (left half) - Wavy shape */}
        <g>
          <path d="M0,0 Q4,2 8,0 Q12,2 16,0 L16,10.67 Q12,12.67 8,10.67 Q4,8.67 0,10.67 Z" fill="#FFCD00" />
          <path d="M0,10.67 Q4,12.67 8,10.67 Q12,8.67 16,10.67 L16,21.33 Q12,23.33 8,21.33 Q4,19.33 0,21.33 Z" fill="#003893" />
          <path d="M0,21.33 Q4,23.33 8,21.33 Q12,19.33 16,21.33 L16,32 Q12,30 8,32 Q4,34 0,32 Z" fill="#CE1126" />
        </g>
        
        {/* US Flag Background (right half) - Wavy shape */}
        <g>
          {/* Red and white stripes with wavy edges */}
          <path d="M16,0 Q20,2 24,0 Q28,2 32,0 L32,2.46 Q28,4.46 24,2.46 Q20,0.46 16,2.46 Z" fill="#B22234" />
          <path d="M16,2.46 Q20,4.46 24,2.46 Q28,0.46 32,2.46 L32,4.92 Q28,6.92 24,4.92 Q20,2.92 16,4.92 Z" fill="#FFFFFF" />
          <path d="M16,4.92 Q20,6.92 24,4.92 Q28,2.92 32,4.92 L32,7.38 Q28,9.38 24,7.38 Q20,5.38 16,7.38 Z" fill="#B22234" />
          <path d="M16,7.38 Q20,9.38 24,7.38 Q28,5.38 32,7.38 L32,9.84 Q28,11.84 24,9.84 Q20,7.84 16,9.84 Z" fill="#FFFFFF" />
          <path d="M16,9.84 Q20,11.84 24,9.84 Q28,7.84 32,9.84 L32,12.31 Q28,14.31 24,12.31 Q20,10.31 16,12.31 Z" fill="#B22234" />
          <path d="M16,12.31 Q20,14.31 24,12.31 Q28,10.31 32,12.31 L32,14.77 Q28,16.77 24,14.77 Q20,12.77 16,14.77 Z" fill="#FFFFFF" />
          <path d="M16,14.77 Q20,16.77 24,14.77 Q28,12.77 32,14.77 L32,17.23 Q28,19.23 24,17.23 Q20,15.23 16,17.23 Z" fill="#B22234" />
          <path d="M16,17.23 Q20,19.23 24,17.23 Q28,15.23 32,17.23 L32,19.69 Q28,21.69 24,19.69 Q20,17.69 16,19.69 Z" fill="#FFFFFF" />
          <path d="M16,19.69 Q20,21.69 24,19.69 Q28,17.69 32,19.69 L32,22.15 Q28,24.15 24,22.15 Q20,20.15 16,22.15 Z" fill="#B22234" />
          <path d="M16,22.15 Q20,24.15 24,22.15 Q28,20.15 32,22.15 L32,24.61 Q28,26.61 24,24.61 Q20,22.61 16,24.61 Z" fill="#FFFFFF" />
          <path d="M16,24.61 Q20,26.61 24,24.61 Q28,22.61 32,24.61 L32,27.08 Q28,29.08 24,27.08 Q20,25.08 16,27.08 Z" fill="#B22234" />
          <path d="M16,27.08 Q20,29.08 24,27.08 Q28,25.08 32,27.08 L32,32 Q28,30 24,32 Q20,34 16,32 Z" fill="#FFFFFF" />
        </g>
        
        {/* Blue canton for US flag - wavy shape */}
        <g>
          <path d="M16,0 Q20,1 24,0 L24,12.31 Q20,11.31 16,12.31 Z" fill="#3C3B6E" />
        </g>
        
        {/* Stars */}
        <g>
          <circle cx="18" cy="2" r="0.5" fill="#FFFFFF" />
          <circle cx="22" cy="2" r="0.5" fill="#FFFFFF" />
          <circle cx="20" cy="4" r="0.5" fill="#FFFFFF" />
          <circle cx="18" cy="6" r="0.5" fill="#FFFFFF" />
          <circle cx="22" cy="6" r="0.5" fill="#FFFFFF" />
          <circle cx="20" cy="8" r="0.5" fill="#FFFFFF" />
          <circle cx="18" cy="10" r="0.5" fill="#FFFFFF" />
          <circle cx="22" cy="10" r="0.5" fill="#FFFFFF" />
        </g>
        
        {/* Glasses Frame - Static for stability */}
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
        <g fill="#FFFFFF" opacity="0.4">
          <ellipse cx="10" cy="14" rx="1.5" ry="2" />
          <ellipse cx="22" cy="14" rx="1.5" ry="2" />
        </g>
      </svg>
    </div>
  );
};

export default LearnWithSaraiLogo;