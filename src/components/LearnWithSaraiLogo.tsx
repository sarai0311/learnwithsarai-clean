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
      <img
        src="/sarai-logo.png"
        alt="Learn with Sarai Logo"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default LearnWithSaraiLogo;