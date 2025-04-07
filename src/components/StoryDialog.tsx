
import React, { useState, useEffect } from 'react';
import { StoryNode } from '../utils/gameData';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';

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
  const [typingSpeed] = useState(30); // ms per character
  
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
  }, [currentNodeId, open, currentNode]);
  
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
    toast.info("Fim deste capítulo da história", {
      description: "Continue completando missões para desbloquear mais."
    });
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
        
        <div className="mt-4 mb-6">
          <p className="text-lg leading-relaxed min-h-[100px]">{displayedText}</p>
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
                {choice.text}
              </Button>
            ))}
            
            {currentNode.isEnding && (
              <Button
                className="hero-button w-full mt-4"
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
