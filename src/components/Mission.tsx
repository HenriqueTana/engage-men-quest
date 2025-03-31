
import React, { useState } from 'react';
import { Mission } from '../utils/gameData';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, BarChart, Lightbulb, Award, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface MissionProps {
  mission: Mission & { completionMessage?: React.ReactNode };
  onComplete: (missionId: number, points: number) => void;
  completed: boolean;
}

const Mission: React.FC<MissionProps> = ({ mission, onComplete, completed }) => {
  const [reflection, setReflection] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleComplete = () => {
    if (mission.type === 'reflection' && reflection.trim().length < 10) {
      toast.error("Sua reflexão é muito curta", {
        description: "Por favor, dedique um pouco mais de tempo a esta reflexão."
      });
      return;
    }
    
    onComplete(mission.id, mission.points);
    
    if (typeof mission.completionMessage === 'string') {
      toast.success("Missão completada!", {
        description: mission.completionMessage,
        icon: <Award className="h-5 w-5" />
      });
    } else if (mission.completionMessage) {
      toast.success("Missão completada!", {
        description: mission.completionMessage,
        icon: <Award className="h-5 w-5" />
      });
    }
  };
  
  const getDifficultyBadge = () => {
    switch(mission.difficulty) {
      case 'easy':
        return <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">Fácil</span>;
      case 'medium':
        return <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">Médio</span>;
      case 'hard':
        return <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">Difícil</span>;
    }
  };
  
  const getTypeIcon = () => {
    switch(mission.type) {
      case 'action':
        return <Clock className="h-5 w-5 text-blue-400" />;
      case 'reflection':
        return <Lightbulb className="h-5 w-5 text-yellow-400" />;
      case 'challenge':
        return <BarChart className="h-5 w-5 text-purple-400" />;
    }
  };

  // Animated background based on mission type
  const getAnimatedBackground = () => {
    if (completed) return '';
    
    switch(mission.type) {
      case 'action':
        return 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400/0 before:via-blue-400/5 before:to-blue-400/0 before:animate-pulse-glow';
      case 'reflection':
        return 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-400/0 before:via-yellow-400/5 before:to-yellow-400/0 before:animate-pulse-glow';
      case 'challenge':
        return 'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400/0 before:via-purple-400/5 before:to-purple-400/0 before:animate-pulse-glow';
      default:
        return '';
    }
  };

  // Check if mission has external link
  const hasExternalLink = mission.id === 11 || (typeof mission.completionMessage !== 'string' && mission.completionMessage);

  return (
    <Card className={`relative border-hero-secondary/30 bg-card shadow-lg transition-all duration-300 overflow-hidden ${
      completed ? 'border-hero-accent/50 bg-hero-accent/5' : getAnimatedBackground()
    } ${isExpanded ? 'scale-105 z-10' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {getTypeIcon()}
              {mission.title}
              {completed && <CheckCircle className="h-5 w-5 text-green-500" />}
            </CardTitle>
            <CardDescription>{mission.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getDifficultyBadge()}
            <span className="bg-hero-primary/20 text-hero-primary text-xs px-2 py-1 rounded-full">
              +{mission.points} pts
            </span>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && mission.type === 'reflection' && !completed && (
        <CardContent>
          <Textarea
            placeholder="Escreva sua reflexão aqui..."
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="min-h-[100px] bg-muted/50"
          />
        </CardContent>
      )}
      
      <CardFooter className="flex justify-between">
        {!completed ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-hero-secondary/20"
            >
              {isExpanded ? "Minimizar" : "Expandir"}
            </Button>
            {isExpanded && (
              <Button 
                className="hero-button"
                onClick={handleComplete}
              >
                {hasExternalLink ? (
                  <span className="flex items-center gap-1">
                    Completar Missão <ExternalLink className="h-4 w-4 ml-1" />
                  </span>
                ) : (
                  "Completar Missão"
                )}
              </Button>
            )}
          </>
        ) : (
          <div className="w-full py-1 text-sm text-center text-green-500 font-medium">
            Missão Completada!
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Mission;
