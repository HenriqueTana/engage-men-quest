import React, { useState } from 'react';
import type { Mission as MissionType } from '../utils/gameData';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, BarChart, Lightbulb, Award, Brain, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface MissionProps {
  mission: MissionType;
  onComplete: (missionId: number, points: number) => void;
  completed: boolean;
  onEmotionalHealthAssessment?: () => void;
}

const Mission: React.FC<MissionProps> = ({ mission, onComplete, completed, onEmotionalHealthAssessment }) => {
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
    toast.success("Missão completada!", {
      description: mission.completionMessage,
      icon: <Award className="h-5 w-5" />
    });
    
    if (mission.id === 6 || mission.id === 9) {
      toast.info("Sugestão: Faça uma avaliação de saúde emocional", {
        description: "Conhecer-se melhor pode ser o próximo passo da sua jornada.",
        icon: <Brain className="h-5 w-5" />,
        action: {
          label: "Fazer avaliação",
          onClick: () => {
            if (onEmotionalHealthAssessment) {
              onEmotionalHealthAssessment();
            } else {
              document.dispatchEvent(new CustomEvent('navigateToEmotionalHealth'));
            }
          },
        },
        duration: 8000,
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
      case 'emotional':
        return <Heart className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-400" />;
    }
  };

  const isEmotionalHealthMission = mission.tags && mission.tags.includes('emotional-health');

  return (
    <Card className={`border-hero-secondary/30 bg-card shadow-lg transition-all duration-300 overflow-hidden ${
      completed ? 'border-hero-accent/50 bg-hero-accent/5' : ''
    } ${isExpanded ? 'scale-105 z-10' : ''} ${
      isEmotionalHealthMission ? 'border-l-4 border-l-red-400' : ''
    }`}>
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
                className={`${isEmotionalHealthMission ? 'bg-red-500 hover:bg-red-600' : 'hero-button'}`}
                onClick={handleComplete}
              >
                {isEmotionalHealthMission && <Brain className="h-4 w-4 mr-2" />}
                Completar Missão
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
