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
        viewBox="0 0 36 32" 
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flag Staff */}
        <g>
          <rect x="0" y="0" width="1.5" height="32" fill="#8B4513" />
          <rect x="1.5" y="0" width="0.5" height="32" fill="#654321" />
        </g>
        
        {/* Colombian Flag Background (left half) - Enhanced wavy shape */}
        <g>
          {/* Yellow stripe - more pronounced wave */}
          <path d="M2,1 Q6,3.5 10,1 Q14,4 18,1 Q22,3.5 26,1 Q30,4 34,1 L34,11.67 Q30,14.67 26,11.67 Q22,8.67 18,11.67 Q14,14.67 10,11.67 Q6,8.67 2,11.67 Z" fill="#FFCD00" />
          
          {/* Blue stripe - opposite wave pattern */}
          <path d="M2,11.67 Q6,8.67 10,11.67 Q14,14.67 18,11.67 Q22,8.67 26,11.67 Q30,14.67 34,11.67 L34,22.33 Q30,19.33 26,22.33 Q22,25.33 18,22.33 Q14,19.33 10,22.33 Q6,25.33 2,22.33 Z" fill="#003893" />
          
          {/* Red stripe - wave continues pattern */}
          <path d="M2,22.33 Q6,25.33 10,22.33 Q14,19.33 18,22.33 Q22,25.33 26,22.33 Q30,19.33 34,22.33 L34,31 Q30,28 26,31 Q22,34 18,31 Q14,28 10,31 Q6,34 2,31 Z" fill="#CE1126" />
        </g>
        
        {/* US Flag Background (right half) - Enhanced wavy shape */}
        <g>
          {/* Red and white stripes with enhanced wavy edges */}
          <path d="M18,1 Q22,3.5 26,1 Q30,4 34,1 L34,3.46 Q30,6.46 26,3.46 Q22,0.46 18,3.46 Z" fill="#B22234" />
          <path d="M18,3.46 Q22,0.46 26,3.46 Q30,6.46 34,3.46 L34,5.92 Q30,2.92 26,5.92 Q22,8.92 18,5.92 Z" fill="#FFFFFF" />
          <path d="M18,5.92 Q22,8.92 26,5.92 Q30,2.92 34,5.92 L34,8.38 Q30,11.38 26,8.38 Q22,5.38 18,8.38 Z" fill="#B22234" />
          <path d="M18,8.38 Q22,5.38 26,8.38 Q30,11.38 34,8.38 L34,10.84 Q30,7.84 26,10.84 Q22,13.84 18,10.84 Z" fill="#FFFFFF" />
          <path d="M18,10.84 Q22,13.84 26,10.84 Q30,7.84 34,10.84 L34,13.31 Q30,16.31 26,13.31 Q22,10.31 18,13.31 Z" fill="#B22234" />
          <path d="M18,13.31 Q22,10.31 26,13.31 Q30,16.31 34,13.31 L34,15.77 Q30,12.77 26,15.77 Q22,18.77 18,15.77 Z" fill="#FFFFFF" />
          <path d="M18,15.77 Q22,18.77 26,15.77 Q30,12.77 34,15.77 L34,18.23 Q30,21.23 26,18.23 Q22,15.23 18,18.23 Z" fill="#B22234" />
          <path d="M18,18.23 Q22,15.23 26,18.23 Q30,21.23 34,18.23 L34,20.69 Q30,17.69 26,20.69 Q22,23.69 18,20.69 Z" fill="#FFFFFF" />
          <path d="M18,20.69 Q22,23.69 26,20.69 Q30,17.69 34,20.69 L34,23.15 Q30,26.15 26,23.15 Q22,20.15 18,23.15 Z" fill="#B22234" />
          <path d="M18,23.15 Q22,20.15 26,23.15 Q30,26.15 34,23.15 L34,25.61 Q30,22.61 26,25.61 Q22,28.61 18,25.61 Z" fill="#FFFFFF" />
          <path d="M18,25.61 Q22,28.61 26,25.61 Q30,22.61 34,25.61 L34,28.08 Q30,31.08 26,28.08 Q22,25.08 18,28.08 Z" fill="#B22234" />
          <path d="M18,28.08 Q22,25.08 26,28.08 Q30,31.08 34,28.08 L34,31 Q30,28 26,31 Q22,34 18,31 Z" fill="#FFFFFF" />
        </g>
        
        {/* Blue canton for US flag - enhanced wavy shape */}
        <g>
          <path d="M18,1 Q22,2.5 26,1 L26,13.31 Q22,11.31 18,13.31 Z" fill="#3C3B6E" />
        </g>
        
        {/* Stars */}
        <g>
          <circle cx="20" cy="3" r="0.4" fill="#FFFFFF" />
          <circle cx="24" cy="3" r="0.4" fill="#FFFFFF" />
          <circle cx="22" cy="5" r="0.4" fill="#FFFFFF" />
          <circle cx="20" cy="7" r="0.4" fill="#FFFFFF" />
          <circle cx="24" cy="7" r="0.4" fill="#FFFFFF" />
          <circle cx="22" cy="9" r="0.4" fill="#FFFFFF" />
          <circle cx="20" cy="11" r="0.4" fill="#FFFFFF" />
          <circle cx="24" cy="11" r="0.4" fill="#FFFFFF" />
        </g>
        
        {/* Glasses Frame - No blue background */}
        <g stroke="#2D2D2D" strokeWidth="1.5" fill="none">
          {/* Left lens */}
          <circle cx="14" cy="18" r="5" fill="rgba(255,255,255,0.1)" />
          {/* Right lens */}
          <circle cx="22" cy="18" r="5" fill="rgba(255,255,255,0.1)" />
          {/* Bridge */}
          <line x1="19" y1="18" x2="17" y2="18" />
          {/* Left temple */}
          <line x1="9" y1="18" x2="6" y2="16" />
          {/* Right temple */}
          <line x1="27" y1="18" x2="30" y2="16" />
        </g>
        
        {/* Glasses reflection */}
        <g fill="#FFFFFF" opacity="0.3">
          <ellipse cx="12" cy="16" rx="1.5" ry="2" />
          <ellipse cx="24" cy="16" rx="1.5" ry="2" />
        </g>
      </svg>
    </div>
  );
};

export default LearnWithSaraiLogo;