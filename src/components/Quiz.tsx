
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Question, quizQuestions, calculateHeroType, heroTypes } from '../utils/gameData';
import { toast } from 'sonner';
import { CheckCircle, Lightbulb, Zap, Heart, Shield } from 'lucide-react';

interface QuizProps {
  onComplete: (heroTypeId: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [completed, setCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Animation icons for each option type
  const getOptionIcon = (optionId: string) => {
    // Each question has 4 options, we'll assign different icons based on the option ID
    switch(optionId.charAt(optionId.length - 1)) {
      case '1': return <Lightbulb className="h-6 w-6 animate-pulse text-yellow-400" />;
      case '2': return <Zap className="h-6 w-6 animate-bounce text-blue-400" />;
      case '3': return <Heart className="h-6 w-6 animate-pulse text-red-400" />;
      case '4': return <Shield className="h-6 w-6 animate-pulse text-green-400" />;
      default: return <Lightbulb className="h-6 w-6 animate-pulse text-yellow-400" />;
    }
  };

  const handleAnswer = (questionId: number, answerId: string) => {
    setSelectedOption(answerId);
    
    // Delay to show the animation of selection
    setTimeout(() => {
      const newAnswers = { ...answers, [questionId]: answerId };
      setAnswers(newAnswers);
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        calculateResult(newAnswers);
      }
    }, 800);
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
                    className={`w-full justify-start text-left h-auto py-4 border-hero-secondary/20 hover:bg-hero-primary/10 hover:border-hero-primary transition-all ${
                      selectedOption === option.id ? 'bg-hero-primary/20 border-hero-primary' : ''
                    }`}
                    onClick={() => handleAnswer(currentQuestion.id, option.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0 bg-hero-dark/30 p-2 rounded-full">
                        {getOptionIcon(option.id)}
                      </div>
                      <span>{option.text}</span>
                    </div>
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
        <div className="text-center p-10">
          <div className="mb-6 flex justify-center">
            <div className="animate-scale-in relative">
              <div className="w-24 h-24 rounded-full bg-hero-primary/20 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-hero-primary/40 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-hero-primary animate-pulse"></div>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full">
                <span className="absolute animate-spin-slow" style={{ 
                  top: "calc(50% - 40px)", 
                  left: "calc(50% - 2px)", 
                  width: "4px", 
                  height: "40px", 
                  backgroundColor: "#9b87f5", 
                  transformOrigin: "bottom center"
                }}></span>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Analisando suas respostas...</h3>
          <p className="text-muted-foreground">Descobrindo seu tipo de herói...</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
