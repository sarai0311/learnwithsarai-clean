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
        {/* Animation definitions */}
        <defs>
          <animateTransform
            id="wave"
            attributeName="transform"
            type="scale"
            values="1,1;1.02,0.98;1,1;0.98,1.02;1,1"
            dur="2s"
            repeatCount="indefinite"
          />
        </defs>
        
        {/* Colombian Flag Background (left half) - Waving */}
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,1;1.01,0.99;1,1;0.99,1.01;1,1"
            dur="2.2s"
            repeatCount="indefinite"
          />
          <path d="M0,0 Q4,1 8,0 Q12,1 16,0 L16,10.67 Q12,11.67 8,10.67 Q4,9.67 0,10.67 Z" fill="#FFCD00" />
          <path d="M0,10.67 Q4,11.67 8,10.67 Q12,9.67 16,10.67 L16,21.33 Q12,22.33 8,21.33 Q4,20.33 0,21.33 Z" fill="#003893" />
          <path d="M0,21.33 Q4,22.33 8,21.33 Q12,20.33 16,21.33 L16,32 Q12,31 8,32 Q4,33 0,32 Z" fill="#CE1126" />
        </g>
        
        {/* US Flag Background (right half) - Waving */}
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,1;0.99,1.01;1,1;1.01,0.99;1,1"
            dur="1.8s"
            repeatCount="indefinite"
          />
          {/* Red stripes with wave effect */}
          <path d="M16,0 Q20,1 24,0 Q28,1 32,0 L32,2.46 Q28,3.46 24,2.46 Q20,1.46 16,2.46 Z" fill="#B22234" />
          <path d="M16,2.46 Q20,3.46 24,2.46 Q28,1.46 32,2.46 L32,4.92 Q28,5.92 24,4.92 Q20,3.92 16,4.92 Z" fill="#FFFFFF" />
          <path d="M16,4.92 Q20,5.92 24,4.92 Q28,3.92 32,4.92 L32,7.38 Q28,8.38 24,7.38 Q20,6.38 16,7.38 Z" fill="#B22234" />
          <path d="M16,7.38 Q20,8.38 24,7.38 Q28,6.38 32,7.38 L32,9.84 Q28,10.84 24,9.84 Q20,8.84 16,9.84 Z" fill="#FFFFFF" />
          <path d="M16,9.84 Q20,10.84 24,9.84 Q28,8.84 32,9.84 L32,12.31 Q28,13.31 24,12.31 Q20,11.31 16,12.31 Z" fill="#B22234" />
          <path d="M16,12.31 Q20,13.31 24,12.31 Q28,11.31 32,12.31 L32,14.77 Q28,15.77 24,14.77 Q20,13.77 16,14.77 Z" fill="#FFFFFF" />
          <path d="M16,14.77 Q20,15.77 24,14.77 Q28,13.77 32,14.77 L32,17.23 Q28,18.23 24,17.23 Q20,16.23 16,17.23 Z" fill="#B22234" />
          <path d="M16,17.23 Q20,18.23 24,17.23 Q28,16.23 32,17.23 L32,19.69 Q28,20.69 24,19.69 Q20,18.69 16,19.69 Z" fill="#FFFFFF" />
          <path d="M16,19.69 Q20,20.69 24,19.69 Q28,18.69 32,19.69 L32,22.15 Q28,23.15 24,22.15 Q20,21.15 16,22.15 Z" fill="#B22234" />
          <path d="M16,22.15 Q20,23.15 24,22.15 Q28,21.15 32,22.15 L32,24.61 Q28,25.61 24,24.61 Q20,23.61 16,24.61 Z" fill="#FFFFFF" />
          <path d="M16,24.61 Q20,25.61 24,24.61 Q28,23.61 32,24.61 L32,27.08 Q28,28.08 24,27.08 Q20,26.08 16,27.08 Z" fill="#B22234" />
          <path d="M16,27.08 Q20,28.08 24,27.08 Q28,26.08 32,27.08 L32,32 Q28,31 24,32 Q20,33 16,32 Z" fill="#FFFFFF" />
        </g>
        
        {/* Blue canton for US flag - with subtle wave */}
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1,1;1.005,0.995;1,1;0.995,1.005;1,1"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <path d="M16,0 Q20,0.5 24,0 L24,12.31 Q20,11.81 16,12.31 Z" fill="#3C3B6E" />
        </g>
        
        {/* Animated Stars */}
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.1;1;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
          <circle cx="18" cy="2" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="1;0.7;1;0.8;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="2" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="0.8;1;0.7;1;0.8" dur="2.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="20" cy="4" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="0.7;0.9;1;0.8;0.7" dur="2.1s" repeatCount="indefinite" />
          </circle>
          <circle cx="18" cy="6" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="1;0.8;0.9;1;1" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="6" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="0.9;1;0.8;0.7;0.9" dur="1.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="20" cy="8" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="0.8;0.7;1;0.9;0.8" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="18" cy="10" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="1;0.9;0.8;1;1" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="22" cy="10" r="0.5" fill="#FFFFFF">
            <animate attributeName="opacity" values="0.7;1;0.9;0.8;0.7" dur="2.0s" repeatCount="indefinite" />
          </circle>
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
        
        {/* Animated Glasses reflection */}
        <g fill="#FFFFFF">
          <ellipse cx="10" cy="14" rx="1.5" ry="2">
            <animate attributeName="opacity" values="0.3;0.5;0.3;0.4;0.3" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="22" cy="14" rx="1.5" ry="2">
            <animate attributeName="opacity" values="0.4;0.3;0.5;0.3;0.4" dur="3.2s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
};

export default LearnWithSaraiLogo;