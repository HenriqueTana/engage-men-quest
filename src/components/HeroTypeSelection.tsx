
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HeroEmblem from './HeroEmblem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle } from 'lucide-react';

interface HeroTypeSelectionProps {
  onSelect: (heroTypeId: string) => void;
}

const HeroTypeSelection: React.FC<HeroTypeSelectionProps> = ({ onSelect }) => {
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  
  const heroTypes = ['guardian', 'explorer', 'sage', 'caregiver'];
  
  const handleSelect = (heroTypeId: string) => {
    setSelectedHero(heroTypeId);
  };
  
  const handleConfirm = () => {
    if (selectedHero) {
      toast.success("Emblema heroico escolhido!", {
        description: "Sua jornada começa agora.",
        icon: <CheckCircle className="h-5 w-5" />
      });
      onSelect(selectedHero);
    } else {
      toast.error("Selecione um emblema para continuar");
    }
  };
  
  return (
    <Card className="border-hero-secondary/30 bg-card shadow-lg animate-slide-up">
      <CardHeader>
        <CardTitle className="text-xl text-center">Escolha Seu Emblema Heroico</CardTitle>
        <CardDescription className="text-center">
          Selecione o emblema que melhor representa sua jornada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4">
          {heroTypes.map((heroType) => (
            <HeroEmblem 
              key={heroType}
              heroTypeId={heroType}
              onSelect={handleSelect}
              selected={selectedHero === heroType}
              size="lg"
            />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button 
            className="hero-button"
            disabled={!selectedHero}
            onClick={handleConfirm}
          >
            Confirmar Escolha
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroTypeSelection;
