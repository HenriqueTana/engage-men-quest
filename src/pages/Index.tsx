
import React, { useState, useEffect } from 'react';
import Quiz from '@/components/Quiz';
import Mission from '@/components/Mission';
import ProgressBar from '@/components/ProgressBar';
import Badges from '@/components/Badges';
import HeroProfile from '@/components/HeroProfile';
import StoryDialog from '@/components/StoryDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { missions, heroTypes, badges, storyNodes } from '@/utils/gameData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, BookOpen, Award, Target, Menu } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

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
  
  // Check for saved game state
  useEffect(() => {
    const savedHeroType = localStorage.getItem(STORAGE_KEY_HERO_TYPE);
    const savedPoints = localStorage.getItem(STORAGE_KEY_POINTS);
    const savedCompletedMissions = localStorage.getItem(STORAGE_KEY_COMPLETED_MISSIONS);
    const savedStoryNode = localStorage.getItem(STORAGE_KEY_STORY_NODE);
    
    if (savedHeroType) setHeroTypeId(savedHeroType);
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
    
    toast.info("Progresso resetado", {
      description: "Você pode começar sua jornada novamente."
    });
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
                  <Button 
                    variant="outline" 
                    className="w-full mb-2 justify-start"
                    onClick={() => setShowStory(true)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Continuar História
                  </Button>
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
          
          <div className="hidden md:flex items-center gap-3">
            {heroTypeId && (
              <Button 
                variant="outline" 
                className="hero-outline-button"
                onClick={() => setShowStory(true)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Continuar História
              </Button>
            )}
            <Button 
              variant="outline" 
              className="text-destructive border-destructive/20 hover:bg-destructive/10"
              onClick={handleResetProgress}
            >
              <Target className="h-4 w-4 mr-2" />
              Reiniciar Jornada
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-8">
        {!heroTypeId ? (
          // Quiz screen
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Descubra Seu Arquétipo Heroico</h2>
              <p className="text-lg text-muted-foreground">
                Responda às perguntas para descobrir que tipo de herói você é e iniciar sua jornada.
              </p>
            </div>
            <Quiz onComplete={handleQuizComplete} />
          </div>
        ) : (
          // Main game screen
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <HeroProfile 
                heroType={heroTypes[heroTypeId]}
                points={points}
                completedMissions={completedMissions}
                totalMissions={missions.length}
              />
              
              <Card className="quest-card animate-slide-up">
                <CardContent className="p-6">
                  <Badges 
                    badges={badges}
                    completedMissions={completedMissions}
                    points={points}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Tabs defaultValue="missions" className="w-full animate-slide-right">
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
        )}
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
