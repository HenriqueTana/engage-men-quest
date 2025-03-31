
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, quizQuestions, calculateHeroType, heroTypes } from '../utils/gameData';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

interface QuizProps {
  onComplete: (heroTypeId: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [completed, setCompleted] = useState(false);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleAnswer = (questionId: number, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newAnswers);
    }
  };
  
  const calculateResult = (finalAnswers: {[key: number]: string}) => {
    const heroTypeId = calculateHeroType(finalAnswers);
    setCompleted(true);
    
    setTimeout(() => {
      toast.success("Seu tipo de herói foi descoberto!", {
        description: `Você é um ${heroTypes[heroTypeId].name}!`,
        icon: <CheckCircle className="h-5 w-5" />
      });
      onComplete(heroTypeId);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!completed ? (
        <Card className="border-hero-secondary/30 bg-card shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Descubra Seu Tipo de Herói</CardTitle>
            <CardDescription className="text-center">
              Questão {currentQuestionIndex + 1} de {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-4">{currentQuestion.text}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 border-hero-secondary/20 hover:bg-hero-primary/10 hover:border-hero-primary transition-all"
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </Button>
            <div className="flex gap-1">
              {quizQuestions.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentQuestionIndex ? 'bg-hero-primary scale-125' : 
                    index < currentQuestionIndex ? 'bg-hero-primary/80' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center p-10 animate-pulse">
          <h3 className="text-2xl font-bold mb-2">Analisando suas respostas...</h3>
          <p className="text-muted-foreground">Descobrindo seu tipo de herói...</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
