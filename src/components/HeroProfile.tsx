
import React from 'react';
import { HeroType } from '../utils/gameData';
import { 
  Sword, 
  Compass, 
  BookOpen, 
  Flame 
} from 'lucide-react';
import ProgressBar from './ProgressBar';

interface HeroProfileProps {
  heroType: HeroType;
  points: number;
  completedMissions: number[];
  totalMissions: number;
}

const HeroProfile: React.FC<HeroProfileProps> = ({ 
  heroType, 
  points, 
  completedMissions, 
  totalMissions 
}) => {
  const getHeroIcon = () => {
    switch(heroType.id) {
      case 'warrior':
        return <Sword className="w-12 h-12 text-red-500" />;
      case 'explorer':
        return <Compass className="w-12 h-12 text-blue-500" />;
      case 'mentor':
        return <BookOpen className="w-12 h-12 text-green-500" />;
      case 'rebel':
        return <Flame className="w-12 h-12 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="quest-card animate-scale-in">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className={`${heroType.imageClass} w-20 h-20 rounded-full flex items-center justify-center`}>
          {getHeroIcon()}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{heroType.name}</h2>
          <p className="text-muted-foreground mb-2">{heroType.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {heroType.traits.map((trait, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-muted text-xs font-medium rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <ProgressBar 
          current={points} 
          max={100} 
          label="Pontos de Experiência" 
          colorClass="bg-hero-accent" 
        />
        <ProgressBar 
          current={completedMissions.length} 
          max={totalMissions} 
          label="Missões Completadas" 
        />
      </div>
    </div>
  );
};

export default HeroProfile;
