
import React, { useState, useEffect } from 'react';
import { StoryNode } from '../utils/gameData';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { FastForward, Brain } from 'lucide-react';

interface StoryDialogProps {
  storyNodes: { [key: number]: StoryNode };
  initialNode: number;
  onClose: () => void;
  onProgress: (points?: number, missionId?: number) => void;
  open: boolean;
}

const StoryDialog: React.FC<StoryDialogProps> = ({ 
  storyNodes, 
  initialNode, 
  onClose, 
  onProgress,
  open 
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<number>(initialNode);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(30); // ms per character
  
  const currentNode = storyNodes[currentNodeId];
  
  useEffect(() => {
    if (!currentNode || !open) return;
    
    const text = currentNode.text;
    setDisplayedText('');
    setIsTyping(true);
    
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, typingSpeed);
    
    return () => clearInterval(typeInterval);
  }, [currentNodeId, open, currentNode, typingSpeed]);
  
  const handleChoice = (choice: StoryNode['choices'][0]) => {
    // Process effects
    if (choice.effect) {
      if (choice.effect.points) {
        onProgress(choice.effect.points);
        toast.success(`+${choice.effect.points} pontos`, {
          description: "Sua decisão te trouxe experiência!"
        });
      }
      
      if (choice.effect.missionUnlock) {
        onProgress(undefined, choice.effect.missionUnlock);
        toast.success("Nova missão desbloqueada!", {
          description: "Confira sua lista de missões."
        });
      }
    }
    
    // Move to next node sequentially instead of jumping to arbitrary nodes
    // This ensures chapters progress from 1 to 10 in order
    const nextNodeId = currentNodeId + 1;
    if (storyNodes[nextNodeId]) {
      setCurrentNodeId(nextNodeId);
    } else {
      // If no next node, this is the end of the story
      handleEndStory();
    }
  };
  
  const handleEndStory = () => {
    onClose();
    toast.info("Fim deste capítulo da história", {
      description: "Continue completando missões para desbloquear mais."
    });
    
    // Recommend emotional health assessment after story completion
    toast.success("Que tal fazer uma avaliação emocional?", {
      description: "Descubra mais sobre sua saúde mental agora.",
      icon: <Brain className="h-5 w-5" />,
      action: {
        label: "Fazer avaliação",
        onClick: () => {
          // This action will be handled in Index.tsx when the toast is clicked
          document.dispatchEvent(new CustomEvent('navigateToEmotionalHealth'));
        },
      },
      duration: 8000, // Give the user more time to see this suggestion
    });
  };

  const handleSpeedUp = () => {
    setTypingSpeed(5); // Speed up the typing
    if (isTyping) {
      // If currently typing, show the full text immediately
      setDisplayedText(currentNode.text);
      setIsTyping(false);
    }
  };
  
  if (!currentNode) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[700px] bg-card border-hero-secondary/30"> {/* Increased width from 500px to 700px */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Sua Jornada</DialogTitle> {/* Increased from text-xl to text-2xl */}
          <DialogDescription>
            <div className="flex justify-between items-center">
              <span className="text-lg">Capítulo {currentNodeId}</span> {/* Added text-lg class */}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSpeedUp} 
                className="h-8 w-8"
              >
                <FastForward className="h-4 w-4" />
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 mb-8"> {/* Increased margins from mt-4 mb-6 to mt-6 mb-8 */}
          <p className="text-xl leading-relaxed min-h-[150px]">{displayedText}</p> {/* Increased from text-lg to text-xl and min-height from 100px to 150px */}
        </div>
        
        {!isTyping && (
          <div className="space-y-4"> {/* Increased from y-3 to y-4 */}
            {currentNode.choices && currentNode.choices.map((choice) => (
              <Button
                key={choice.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 text-lg border-hero-secondary/20 hover:bg-hero-primary/10 hover:border-hero-primary transition-all"
                onClick={() => handleChoice(choice)}
              >
                <div>
                  <div className="font-medium">{choice.text}</div>
                  {choice.effect && choice.effect.points && (
                    <div className="text-sm text-hero-primary mt-1">+{choice.effect.points} pontos</div> /* Increased from text-xs to text-sm */
                  )}
                </div>
              </Button>
            ))}
            
            {currentNode.isEnding && (
              <Button
                className="hero-button w-full mt-4 text-lg py-3" /* Added text-lg and py-3 */
                onClick={handleEndStory}
              >
                Continuar minha jornada
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
