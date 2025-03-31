
import React, { useState, useEffect } from 'react';
import { StoryNode } from '../utils/gameData';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { FastForward, ExternalLink } from 'lucide-react';

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
  const [isLastChapter, setIsLastChapter] = useState(false);
  
  const currentNode = storyNodes[currentNodeId];
  
  useEffect(() => {
    if (!currentNode || !open) return;
    
    const text = currentNode.text;
    setDisplayedText('');
    setIsTyping(true);
    
    // Check if this is the last chapter
    setIsLastChapter(currentNode.isEnding && !currentNode.choices);
    
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
    
    // Move to next node
    setCurrentNodeId(choice.nextNode);
  };
  
  const handleEndStory = () => {
    onClose();
    if (isLastChapter) {
      // If it's the last chapter, show a toast with a link to a psychologist consultation
      toast.info(
        <div className="flex flex-col gap-2">
          <span>Fim da jornada. Busque ajuda profissional:</span>
          <a 
            href="https://psicologia-online.com.br/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-hero-primary hover:underline"
          >
            Consulte um psicólogo online <ExternalLink className="h-4 w-4" />
          </a>
        </div>,
        {
          duration: 10000,
          description: "Continue sua jornada na vida real."
        }
      );
    } else {
      toast.info("Fim deste capítulo da história", {
        description: "Continue completando missões para desbloquear mais."
      });
    }
  };

  const speedUpText = () => {
    setTypingSpeed(5); // Speed up the text animation
    
    // If we're currently typing, instantly display all text
    if (isTyping && currentNode) {
      setDisplayedText(currentNode.text);
      setIsTyping(false);
    }
  };
  
  if (!currentNode) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-card border-hero-secondary/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Sua Jornada</DialogTitle>
          <DialogDescription>
            Capítulo {currentNodeId}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 mb-6 relative">
          <p className="text-lg leading-relaxed min-h-[100px]">{displayedText}</p>
          
          {isTyping && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="absolute top-0 right-0 text-hero-primary"
              onClick={speedUpText}
            >
              <FastForward className="h-4 w-4 mr-1" />
              Acelerar
            </Button>
          )}
        </div>
        
        {!isTyping && (
          <div className="space-y-3">
            {currentNode.choices && currentNode.choices.map((choice) => (
              <Button
                key={choice.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 border-hero-secondary/20 hover:bg-hero-primary/10 hover:border-hero-primary transition-all"
                onClick={() => handleChoice(choice)}
              >
                <div className="flex flex-col w-full">
                  <span>{choice.text}</span>
                  {choice.effect && (
                    <div className="flex gap-2 mt-1 text-sm text-hero-primary/80">
                      {choice.effect.points && (
                        <span>+{choice.effect.points} pontos</span>
                      )}
                      {choice.effect.missionUnlock && (
                        <span>Desbloqueia missão</span>
                      )}
                    </div>
                  )}
                </div>
              </Button>
            ))}
            
            {currentNode.isEnding && (
              <Button
                className="hero-button w-full mt-4"
                onClick={handleEndStory}
              >
                {isLastChapter ? "Finalizar jornada e buscar ajuda" : "Continuar minha jornada"}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoryDialog;
