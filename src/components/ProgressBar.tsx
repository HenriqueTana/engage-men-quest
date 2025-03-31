
import React from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  max, 
  label = "Progresso", 
  colorClass = "bg-hero-primary" 
}) => {
  const percentage = Math.min(Math.round((current / max) * 100), 100);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-foreground/80">{label}</span>
        <span className="text-sm font-medium text-foreground/80">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
