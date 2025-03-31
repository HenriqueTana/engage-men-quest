
import React from 'react';
import { Award, Lightbulb, Shield, Heart, Zap } from 'lucide-react';

interface HeroEmblemProps {
  heroTypeId: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  onSelect?: (heroTypeId: string) => void;
  selected?: boolean;
}

const HeroEmblem: React.FC<HeroEmblemProps> = ({ 
  heroTypeId, 
  size = 'md', 
  animate = true,
  onSelect,
  selected = false
}) => {
  const getEmblemDetails = () => {
    switch(heroTypeId) {
      case 'guardian':
        return {
          icon: <Shield className="text-blue-400" />,
          color: 'border-blue-400',
          bgColor: 'bg-blue-400/20',
          name: 'Guardião'
        };
      case 'explorer':
        return {
          icon: <Zap className="text-purple-400" />,
          color: 'border-purple-400',
          bgColor: 'bg-purple-400/20',
          name: 'Explorador'
        };
      case 'sage':
        return {
          icon: <Lightbulb className="text-yellow-400" />,
          color: 'border-yellow-400',
          bgColor: 'bg-yellow-400/20',
          name: 'Sábio'
        };
      case 'caregiver':
        return {
          icon: <Heart className="text-red-400" />,
          color: 'border-red-400',
          bgColor: 'bg-red-400/20',
          name: 'Cuidador'
        };
      default:
        return {
          icon: <Award className="text-hero-primary" />,
          color: 'border-hero-primary',
          bgColor: 'bg-hero-primary/20',
          name: 'Herói'
        };
    }
  };

  const getSizeClasses = () => {
    switch(size) {
      case 'sm': 
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6'
        };
      case 'lg': 
        return {
          container: 'w-24 h-24',
          icon: 'w-12 h-12'
        };
      default: 
        return {
          container: 'w-16 h-16',
          icon: 'w-8 h-8'
        };
    }
  };

  const emblemDetails = getEmblemDetails();
  const sizeClasses = getSizeClasses();
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(heroTypeId);
    }
  };

  return (
    <div className="flex flex-col items-center" onClick={handleClick}>
      <div 
        className={`
          ${sizeClasses.container}
          ${emblemDetails.color}
          ${emblemDetails.bgColor}
          ${onSelect ? 'cursor-pointer transform hover:scale-110 transition-all' : ''}
          ${selected ? 'ring-4 ring-offset-2 ring-offset-background ring-hero-primary' : ''}
          rounded-full flex items-center justify-center border-4
          ${animate ? 'animate-pulse-glow' : ''}
        `}
      >
        <div className={sizeClasses.icon}>
          {emblemDetails.icon}
        </div>
      </div>
      <span className="mt-2 text-center font-medium">
        {emblemDetails.name}
      </span>
    </div>
  );
};

export default HeroEmblem;
