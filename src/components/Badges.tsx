
import React from 'react';
import { Badge, checkBadgeUnlocked } from '../utils/gameData';
import { 
  Award, 
  BookOpen, 
  Heart, 
  Zap,
  Lock
} from 'lucide-react';

interface BadgesProps {
  badges: Badge[];
  completedMissions: number[];
  points: number;
}

const BadgeIcon: React.FC<{badge: Badge, unlocked: boolean}> = ({ badge, unlocked }) => {
  const getIcon = () => {
    switch(badge.id) {
      case 'first-step':
        return <Zap className="w-8 h-8 text-yellow-300" />;
      case 'knowledge-seeker':
        return <BookOpen className="w-8 h-8 text-blue-300" />;
      case 'brave-heart':
        return <Heart className="w-8 h-8 text-red-300" />;
      case 'centurion':
        return <Award className="w-8 h-8 text-purple-300" />;
      default:
        return <Award className="w-8 h-8 text-gray-300" />;
    }
  };

  return (
    <div className={`badge-icon ${badge.imageClass} ${unlocked ? 'badge-unlocked' : 'badge-locked'}`}>
      {unlocked ? getIcon() : <Lock className="w-6 h-6 text-gray-400" />}
    </div>
  );
};

const Badges: React.FC<BadgesProps> = ({ badges, completedMissions, points }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-4">Suas Conquistas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const unlocked = checkBadgeUnlocked(badge, completedMissions, points);
          return (
            <div 
              key={badge.id} 
              className={`flex flex-col items-center p-4 rounded-lg ${unlocked ? 'bg-muted' : 'bg-card/50 opacity-80'} transition-all duration-300`}
            >
              <BadgeIcon badge={badge} unlocked={unlocked} />
              <h4 className="text-sm font-bold mt-2">{badge.name}</h4>
              <p className="text-xs text-muted-foreground text-center mt-1">
                {unlocked ? badge.description : 'Conquista bloqueada'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;
