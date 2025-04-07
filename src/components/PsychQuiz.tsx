
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { CheckIcon, ExternalLinkIcon, Home } from 'lucide-react';

// Psychological questions
const psychQuestions = [
  {
    id: 1,
    text: "Com que frequência você se sente excessivamente preocupado com situações do dia a dia?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 2,
    text: "Você tem dificuldade para relaxar ou \"desligar\" a mente?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 3,
    text: "Com que frequência você se sente com pouca energia ou facilmente cansado?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 4,
    text: "Você tem dificuldade para se concentrar em tarefas ou atividades?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 5,
    text: "Você já perdeu interesse em atividades que antes gostava de fazer?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 6,
    text: "Com que frequência você tem mudanças significativas no apetite ou sono?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 7,
    text: "Você se sente frequentemente irritado ou com alterações de humor?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 8,
    text: "Você tem pensamentos recorrentes que considera perturbadores ou indesejados?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 9,
    text: "Você evita situações sociais ou lugares por medo ou ansiedade?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  },
  {
    id: 10,
    text: "Você já considerou que poderia se beneficiar de ajuda profissional para lidar com suas emoções?",
    options: [
      { id: 'a', text: "Raramente" },
      { id: 'b', text: "Às vezes" },
      { id: 'c', text: "Frequentemente" },
      { id: 'd', text: "Quase sempre" }
    ]
  }
];

interface PsychQuizProps {
  onComplete: (points: number) => void;
  onReturnToMain: () => void;
}

const PsychQuiz: React.FC<PsychQuizProps> = ({ onComplete, onReturnToMain }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [completed, setCompleted] = useState(false);
  const [showConsultationDialog, setShowConsultationDialog] = useState(false);
  
  const currentQuestion = psychQuestions[currentQuestionIndex];
  
  const handleAnswer = (questionId: number, answerId: string) => {
    const newAnswers = { ...answers, [questionId]: answerId };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < psychQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      setCompleted(true);
      setTimeout(() => {
        setShowConsultationDialog(true);
        onComplete(50); // Award points for completing the psychological quiz
      }, 1000);
    }
  };

  const handleContactPsychologist = () => {
    // Open a new window to a psychology consultation site
    window.open("https://www.psicologia-online.com.br/", "_blank");
    toast.success("Parabéns por buscar ajuda profissional", {
      description: "Cuidar da saúde mental é um sinal de força, não de fraqueza."
    });
    setShowConsultationDialog(false);
  };

  return (
    <>
      <Card className="border-hero-secondary/30 bg-card shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Autoconhecimento Emocional</CardTitle>
          <CardDescription className="text-center">
            Questão {currentQuestionIndex + 1} de {psychQuestions.length}
          </CardDescription>
        </CardHeader>
        
        {!completed ? (
          <>
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
                {psychQuestions.map((_, index) => (
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
          </>
        ) : (
          <CardContent className="py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Avaliação Concluída</h3>
            <p className="text-muted-foreground mb-6">
              Obrigado por completar esta autoavaliação. Este é um passo importante para o autoconhecimento.
            </p>
            <Button 
              className="hero-button"
              onClick={onReturnToMain}
            >
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Menu Principal
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Consultation Dialog */}
      <Dialog open={showConsultationDialog} onOpenChange={setShowConsultationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Consulta com Profissional</DialogTitle>
            <DialogDescription>
              Com base nas suas respostas, uma conversa com um profissional de saúde mental poderia trazer benefícios para você.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="mb-4">
              Todos nós enfrentamos desafios emocionais em algum momento da vida. Falar com um psicólogo pode ajudar a:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Compreender melhor seus pensamentos e sentimentos</li>
              <li>Desenvolver estratégias para lidar com situações difíceis</li>
              <li>Melhorar sua qualidade de vida e bem-estar</li>
            </ul>
            <p>
              Gostaria de ser direcionado para um site onde pode marcar uma consulta com um psicólogo?
            </p>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => {
              setShowConsultationDialog(false);
              onReturnToMain();
            }} className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Menu
            </Button>
            <Button onClick={handleContactPsychologist} className="hero-button w-full sm:w-auto">
              Consultar profissional
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PsychQuiz;
