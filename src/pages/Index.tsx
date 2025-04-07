
import React, { useState, useEffect } from 'react';
import Quiz from '@/components/Quiz';
import Mission from '@/components/Mission';
import ProgressBar from '@/components/ProgressBar';
import Badges from '@/components/Badges';
import HeroProfile from '@/components/HeroProfile';
import StoryDialog from '@/components/StoryDialog';
import PsychQuiz from '@/components/PsychQuiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { missions, heroTypes, badges, storyNodes } from '@/utils/gameData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  Target, 
  Menu, 
  Brain, 
  Home, 
  User, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";

// LocalStorage keys
const STORAGE_KEY_HERO_TYPE = 'hero-quest-hero-type';
const STORAGE_KEY_POINTS = 'hero-quest-points';
const STORAGE_KEY_COMPLETED_MISSIONS = 'hero-quest-completed-missions';
const STORAGE_KEY_STORY_NODE = 'hero-quest-story-node';

const Index = () => {
  // Game state
  const [heroTypeId, setHeroTypeId] = useState<string | null>(null);
  const [points, setPoints] = useState(0);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [storyNodeId, setStoryNodeId] = useState(1);
  const [showStory, setShowStory] = useState(false);
  const [availableMissions, setAvailableMissions] = useState<number[]>([1]);
  const [currentView, setCurrentView] = useState<'quiz' | 'main' | 'psych'>('quiz');
  
  // Check for saved game state
  useEffect(() => {
    const savedHeroType = localStorage.getItem(STORAGE_KEY_HERO_TYPE);
    const savedPoints = localStorage.getItem(STORAGE_KEY_POINTS);
    const savedCompletedMissions = localStorage.getItem(STORAGE_KEY_COMPLETED_MISSIONS);
    const savedStoryNode = localStorage.getItem(STORAGE_KEY_STORY_NODE);
    
    if (savedHeroType) {
      setHeroTypeId(savedHeroType);
      setCurrentView('main');
    }
    if (savedPoints) setPoints(parseInt(savedPoints));
    if (savedCompletedMissions) setCompletedMissions(JSON.parse(savedCompletedMissions));
    if (savedStoryNode) setStoryNodeId(parseInt(savedStoryNode));
  }, []);
  
  // Save game state when it changes
  useEffect(() => {
    if (heroTypeId) localStorage.setItem(STORAGE_KEY_HERO_TYPE, heroTypeId);
    localStorage.setItem(STORAGE_KEY_POINTS, points.toString());
    localStorage.setItem(STORAGE_KEY_COMPLETED_MISSIONS, JSON.stringify(completedMissions));
    localStorage.setItem(STORAGE_KEY_STORY_NODE, storyNodeId.toString());
  }, [heroTypeId, points, completedMissions, storyNodeId]);
  
  // Handle quiz completion
  const handleQuizComplete = (heroType: string) => {
    setHeroTypeId(heroType);
    setCurrentView('main');
    
    // Start the story after quiz completion
    setTimeout(() => {
      setShowStory(true);
    }, 1000);
  };
  
  // Handle mission completion
  const handleMissionComplete = (missionId: number, missionPoints: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId]);
      setPoints(points + missionPoints);
    }
  };
  
  // Handle psychological quiz completion
  const handlePsychQuizComplete = (quizPoints: number) => {
    setPoints(points + quizPoints);
    toast.success(`+${quizPoints} pontos de autoconhecimento!`, {
      description: "Você ganhou pontos pelo seu autoconhecimento emocional."
    });
    
    // After a delay, return to main view
    setTimeout(() => {
      setCurrentView('main');
    }, 5000);
  };
  
  // Handle story progression
  const handleStoryProgress = (pointsGained?: number, missionUnlocked?: number) => {
    if (pointsGained) {
      setPoints(points + pointsGained);
    }
    
    if (missionUnlocked && !availableMissions.includes(missionUnlocked)) {
      setAvailableMissions([...availableMissions, missionUnlocked]);
    }
  };
  
  // Filter missions based on hero type and availability
  const getFilteredMissions = () => {
    return missions.filter(mission => {
      // Check if mission is available
      if (!availableMissions.includes(mission.id)) return false;
      
      // Check if mission requires specific hero type
      if (mission.requiredHeroTypes && heroTypeId) {
        return mission.requiredHeroTypes.includes(heroTypeId);
      }
      
      return true;
    });
  };
  
  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY_HERO_TYPE);
    localStorage.removeItem(STORAGE_KEY_POINTS);
    localStorage.removeItem(STORAGE_KEY_COMPLETED_MISSIONS);
    localStorage.removeItem(STORAGE_KEY_STORY_NODE);
    
    setHeroTypeId(null);
    setPoints(0);
    setCompletedMissions([]);
    setStoryNodeId(1);
    setAvailableMissions([1]);
    setCurrentView('quiz');
    
    toast.info("Progresso resetado", {
      description: "Você pode começar sua jornada novamente."
    });
  };

  const renderContent = () => {
    switch(currentView) {
      case 'quiz':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Descubra Seu Arquétipo Heroico</h2>
              <p className="text-lg text-muted-foreground">
                Responda às perguntas para descobrir que tipo de herói você é e iniciar sua jornada.
              </p>
            </div>
            <Quiz onComplete={handleQuizComplete} />
          </div>
        );
      
      case 'psych':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Avaliação de Saúde Emocional</h2>
              <p className="text-lg text-muted-foreground">
                Complete este questionário para ajudar a identificar aspectos da sua saúde emocional que podem necessitar de atenção.
              </p>
            </div>
            <PsychQuiz onComplete={handlePsychQuizComplete} />
          </div>
        );
      
      case 'main':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <HeroProfile 
                heroType={heroTypes[heroTypeId!]}
                points={points}
                completedMissions={completedMissions}
                totalMissions={missions.length}
              />
              
              <Card className="quest-card">
                <CardContent className="p-6">
                  <Badges 
                    badges={badges}
                    completedMissions={completedMissions}
                    points={points}
                  />
                </CardContent>
              </Card>

              <Card className="border-hero-secondary/20 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-hero-accent" />
                    Saúde Emocional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete o questionário de autoavaliação emocional para ganhar insights sobre sua saúde mental.
                  </p>
                  <Button 
                    className="w-full hero-button bg-hero-accent hover:bg-hero-accent/90" 
                    onClick={() => setCurrentView('psych')}
                  >
                    Iniciar Autoavaliação
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Tabs defaultValue="missions" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="missions" className="flex-1">
                    <Target className="h-4 w-4 mr-2" />
                    Missões
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex-1">
                    <Award className="h-4 w-4 mr-2" />
                    Conquistas
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="missions" className="mt-0">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-4">
                      {getFilteredMissions().map((mission) => (
                        <Mission 
                          key={mission.id}
                          mission={mission}
                          onComplete={handleMissionComplete}
                          completed={completedMissions.includes(mission.id)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="achievements" className="mt-0">
                  <Card className="quest-card">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">Sua Jornada</h3>
                      <p className="text-muted-foreground mb-6">
                        Acompanhe seu progresso e desbloqueie conquistas para se tornar o herói que está destinado a ser.
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-2">Conquistas Desbloqueadas</h4>
                          <ProgressBar 
                            current={badges.filter(badge => 
                              badge.requirement.type === "specific-mission" && 
                              completedMissions.includes(parseInt(badge.requirement.value as string))
                            ).length}
                            max={badges.filter(badge => badge.requirement.type === "specific-mission").length}
                            colorClass="bg-hero-accent"
                          />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium mb-2">Pontos Acumulados</h4>
                          <ProgressBar 
                            current={points}
                            max={200}
                            colorClass="bg-hero-primary"
                          />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium mb-2">Missões Completadas</h4>
                          <ProgressBar 
                            current={completedMissions.length}
                            max={missions.length}
                            colorClass="bg-green-600"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* App Header */}
      <header className="border-b border-hero-secondary/20 py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-hero-primary" />
            <h1 className="text-2xl font-bold">Jornada do Herói</h1>
          </div>
          
          {heroTypeId && (
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Menu Principal</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                        <Button 
                          variant="ghost" 
                          className="justify-start"
                          onClick={() => setCurrentView('main')}
                        >
                          <Home className="h-5 w-5 mr-2" />
                          <div className="text-left">
                            <div>Início</div>
                            <div className="text-xs text-muted-foreground">Voltar à tela principal</div>
                          </div>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="justify-start"
                          onClick={() => setShowStory(true)}
                        >
                          <BookOpen className="h-5 w-5 mr-2" />
                          <div className="text-left">
                            <div>História</div>
                            <div className="text-xs text-muted-foreground">Continuar sua jornada</div>
                          </div>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="justify-start"
                          onClick={() => setCurrentView('psych')}
                        >
                          <Brain className="h-5 w-5 mr-2" />
                          <div className="text-left">
                            <div>Saúde Emocional</div>
                            <div className="text-xs text-muted-foreground">Autoavaliação</div>
                          </div>
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="justify-start text-destructive hover:text-destructive"
                          onClick={handleResetProgress}
                        >
                          <Target className="h-5 w-5 mr-2" />
                          <div className="text-left">
                            <div>Reiniciar</div>
                            <div className="text-xs text-muted-foreground">Começar novamente</div>
                          </div>
                        </Button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <User className="h-5 w-5 mr-2" />
                      {heroTypeId && <span>{heroTypes[heroTypeId]?.name}</span>}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-4 w-[300px]">
                        <div className="mb-2 font-medium">Seu Perfil de Herói</div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {heroTypeId && heroTypes[heroTypeId]?.description}
                        </p>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <div className="text-sm">
                            <span className="font-medium">{points}</span> pontos
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{completedMissions.length}</span> missões completadas
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Button 
                      variant="outline"
                      className="hero-outline-button"
                      onClick={() => setCurrentView('psych')}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Saúde Emocional
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-card border-hero-secondary/20">
              <div className="py-4">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <Separator className="my-2" />
                
                {heroTypeId && (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full mb-2 justify-start"
                      onClick={() => {
                        setCurrentView('main');
                      }}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Página Inicial
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mb-2 justify-start"
                      onClick={() => setShowStory(true)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continuar História
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mb-2 justify-start"
                      onClick={() => setCurrentView('psych')}
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Saúde Emocional
                    </Button>
                    
                    <Separator className="my-2" />
                  </>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full mb-2 justify-start"
                  onClick={handleResetProgress}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Reiniciar Jornada
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <main className="container py-8">
        {renderContent()}
      </main>
      
      {/* Story Dialog */}
      <StoryDialog 
        storyNodes={storyNodes}
        initialNode={storyNodeId}
        onClose={() => setShowStory(false)}
        onProgress={handleStoryProgress}
        open={showStory}
      />
    </div>
  );
};

export default Index;
