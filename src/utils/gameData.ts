
export interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    points: {
      [key: string]: number;
    };
  }[];
}

export interface HeroType {
  id: string;
  name: string;
  description: string;
  traits: string[];
  imageClass: string;
}

export interface Mission {
  id: number;
  title: string;
  description: string;
  type: "action" | "reflection" | "challenge";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  completionMessage: string;
  requiredHeroTypes?: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageClass: string;
  requirement: {
    type: "points" | "missions" | "specific-mission";
    value: number | string;
  };
}

export interface StoryNode {
  id: number;
  text: string;
  choices?: {
    id: number;
    text: string;
    nextNode: number;
    effect?: {
      points?: number;
      heroType?: string;
      missionUnlock?: number;
    };
  }[];
  isEnding?: boolean;
}

// Quiz questions to determine hero type
export const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Diante de um desafio difícil, você geralmente:",
    options: [
      { 
        id: "a", 
        text: "Enfrenta de cabeça, mesmo que seja arriscado", 
        points: { "warrior": 3, "explorer": 1, "mentor": 0, "rebel": 2 } 
      },
      { 
        id: "b", 
        text: "Planeja cuidadosamente antes de agir", 
        points: { "warrior": 1, "explorer": 0, "mentor": 3, "rebel": 0 } 
      },
      { 
        id: "c", 
        text: "Busca uma abordagem criativa e não convencional", 
        points: { "warrior": 0, "explorer": 2, "mentor": 1, "rebel": 3 } 
      },
      { 
        id: "d", 
        text: "Vê como uma oportunidade de aprender algo novo", 
        points: { "warrior": 0, "explorer": 3, "mentor": 2, "rebel": 0 } 
      }
    ]
  },
  {
    id: 2,
    text: "O que mais te motiva na vida?",
    options: [
      { 
        id: "a", 
        text: "Superar limites e provar seu valor", 
        points: { "warrior": 3, "explorer": 1, "mentor": 0, "rebel": 2 } 
      },
      { 
        id: "b", 
        text: "Descobrir coisas novas e explorar possibilidades", 
        points: { "warrior": 0, "explorer": 3, "mentor": 1, "rebel": 1 } 
      },
      { 
        id: "c", 
        text: "Compartilhar conhecimento e inspirar outros", 
        points: { "warrior": 0, "explorer": 1, "mentor": 3, "rebel": 0 } 
      },
      { 
        id: "d", 
        text: "Transformar e desafiar o status quo", 
        points: { "warrior": 1, "explorer": 1, "mentor": 0, "rebel": 3 } 
      }
    ]
  },
  {
    id: 3,
    text: "Em um grupo, você geralmente assume o papel de:",
    options: [
      { 
        id: "a", 
        text: "Líder que toma as decisões difíceis", 
        points: { "warrior": 3, "explorer": 0, "mentor": 2, "rebel": 1 } 
      },
      { 
        id: "b", 
        text: "Visionário que sugere novas ideias", 
        points: { "warrior": 0, "explorer": 3, "mentor": 1, "rebel": 2 } 
      },
      { 
        id: "c", 
        text: "Conselheiro que oferece sabedoria", 
        points: { "warrior": 0, "explorer": 0, "mentor": 3, "rebel": 0 } 
      },
      { 
        id: "d", 
        text: "Catalisador que questiona e desafia o grupo", 
        points: { "warrior": 1, "explorer": 1, "mentor": 0, "rebel": 3 } 
      }
    ]
  }
];

// Hero archetypes
export const heroTypes: { [key: string]: HeroType } = {
  warrior: {
    id: "warrior",
    name: "Guerreiro",
    description: "Você é determinado, corajoso e resiliente. Sua força está na capacidade de enfrentar desafios de frente e nunca desistir.",
    traits: ["Coragem", "Determinação", "Lealdade", "Força de vontade"],
    imageClass: "bg-red-700"
  },
  explorer: {
    id: "explorer",
    name: "Explorador",
    description: "Você é curioso, adaptável e adora descobrir coisas novas. Sua força está na capacidade de enxergar possibilidades onde outros veem obstáculos.",
    traits: ["Curiosidade", "Adaptabilidade", "Independência", "Criatividade"],
    imageClass: "bg-blue-700"
  },
  mentor: {
    id: "mentor",
    name: "Mentor",
    description: "Você é sábio, paciente e analítico. Sua força está na capacidade de encontrar soluções através da reflexão e do conhecimento.",
    traits: ["Sabedoria", "Paciência", "Empatia", "Generosidade"],
    imageClass: "bg-green-700"
  },
  rebel: {
    id: "rebel",
    name: "Rebelde",
    description: "Você é inovador, desafiador e autêntico. Sua força está na capacidade de questionar o status quo e criar transformações.",
    traits: ["Autenticidade", "Independência", "Ousadia", "Criatividade"],
    imageClass: "bg-purple-700"
  }
};

// Available missions
export const missions: Mission[] = [
  {
    id: 1,
    title: "Desafio da Reflexão",
    description: "Escreva sobre uma qualidade que você mais admira em si mesmo e por quê.",
    type: "reflection",
    difficulty: "easy",
    points: 10,
    completionMessage: "Você ganhou autoconhecimento! Reconhecer suas qualidades é o primeiro passo para fortalecer sua confiança."
  },
  {
    id: 2,
    title: "Missão da Coragem",
    description: "Faça algo hoje que normalmente você hesitaria em fazer por medo ou insegurança.",
    type: "action",
    difficulty: "medium",
    points: 20,
    completionMessage: "Incrível! Cada vez que enfrentamos nossos medos, nos tornamos mais fortes."
  },
  {
    id: 3,
    title: "Desafio da Gratidão",
    description: "Liste três coisas pelas quais você é grato hoje.",
    type: "reflection",
    difficulty: "easy",
    points: 15,
    completionMessage: "A gratidão transforma nossa perspectiva e fortalece nossa resiliência mental."
  },
  {
    id: 4,
    title: "Missão do Guerreiro",
    description: "Estabeleça uma meta clara para esta semana e defina passos concretos para alcançá-la.",
    type: "challenge",
    difficulty: "medium",
    points: 25,
    requiredHeroTypes: ["warrior"],
    completionMessage: "Excelente estratégia! Como um verdadeiro guerreiro, você sabe que a vitória vem do planejamento e da execução."
  },
  {
    id: 5,
    title: "Jornada do Explorador",
    description: "Experimente algo novo hoje - pode ser uma comida, um livro ou uma atividade que você nunca tentou antes.",
    type: "action",
    difficulty: "easy",
    points: 15,
    requiredHeroTypes: ["explorer"],
    completionMessage: "Você expandiu seus horizontes! Todo grande explorador sabe que o crescimento está nas novas experiências."
  }
];

// Achievements/badges
export const badges: Badge[] = [
  {
    id: "first-step",
    name: "Primeiro Passo",
    description: "Completou sua primeira missão na jornada",
    imageClass: "bg-yellow-500",
    requirement: {
      type: "missions",
      value: 1
    }
  },
  {
    id: "knowledge-seeker",
    name: "Buscador do Conhecimento",
    description: "Completou 3 missões do tipo reflexão",
    imageClass: "bg-blue-600",
    requirement: {
      type: "missions",
      value: 3
    }
  },
  {
    id: "brave-heart",
    name: "Coração Valente",
    description: "Completou a Missão da Coragem",
    imageClass: "bg-red-600",
    requirement: {
      type: "specific-mission",
      value: "2"
    }
  },
  {
    id: "centurion",
    name: "Centurião",
    description: "Acumulou 100 pontos de experiência",
    imageClass: "bg-purple-700",
    requirement: {
      type: "points",
      value: 100
    }
  }
];

// Interactive story nodes
export const storyNodes: { [key: number]: StoryNode } = {
  1: {
    id: 1,
    text: "Você acorda em um mundo onde as pessoas parecem ter perdido sua essência heroica. Uma voz misteriosa te chama: 'Você é capaz de redescobrir o herói dentro de si e inspirar outros a fazerem o mesmo?'",
    choices: [
      {
        id: 1,
        text: "Aceitar o chamado e embarcar nesta jornada",
        nextNode: 2,
        effect: {
          points: 10
        }
      },
      {
        id: 2,
        text: "Questionar a voz e pedir mais informações",
        nextNode: 3
      }
    ]
  },
  2: {
    id: 2,
    text: "Você aceita o desafio! A voz revela: 'Sua jornada começará com autoconhecimento. Apenas conhecendo a si mesmo você poderá despertar seu verdadeiro potencial.' Uma luz surge à sua frente, revelando um caminho.",
    choices: [
      {
        id: 1,
        text: "Seguir o caminho iluminado",
        nextNode: 4,
        effect: {
          missionUnlock: 1
        }
      }
    ]
  },
  3: {
    id: 3,
    text: "A voz responde: 'Questionar é sábio. Este mundo precisa daqueles que não seguem cegamente. Você está em uma realidade onde as pessoas esqueceram seu poder interior. Sua missão, se aceitar, é redescobrir esse poder em si mesmo primeiro.'",
    choices: [
      {
        id: 1,
        text: "Aceitar a missão com mais clareza",
        nextNode: 2,
        effect: {
          points: 5,
          heroType: "mentor"
        }
      },
      {
        id: 2,
        text: "Ainda hesitar e pedir provas",
        nextNode: 5
      }
    ]
  },
  4: {
    id: 4,
    text: "O caminho te leva a um espelho mágico que mostra não seu reflexo físico, mas aspectos da sua personalidade e potencial. 'Encare seu verdadeiro eu', diz a voz. 'Qual aspecto você deseja explorar primeiro?'",
    choices: [
      {
        id: 1,
        text: "Explorar suas forças e qualidades",
        nextNode: 6,
        effect: {
          missionUnlock: 3
        }
      },
      {
        id: 2,
        text: "Confrontar seus medos e limitações",
        nextNode: 7,
        effect: {
          missionUnlock: 2
        }
      }
    ]
  },
  5: {
    id: 5,
    text: "A voz silencia por um momento, então responde calmamente: 'A única prova que posso oferecer está dentro de você. Se não sentir o chamado, talvez ainda não seja sua hora.' A presença começa a desvanecer.",
    choices: [
      {
        id: 1,
        text: "Mudar de ideia e aceitar o chamado",
        nextNode: 2,
        effect: {
          heroType: "rebel"
        }
      },
      {
        id: 2,
        text: "Deixar a presença ir embora",
        nextNode: 8,
        isEnding: true
      }
    ]
  },
  6: {
    id: 6,
    text: "O espelho brilha intensamente e mostra imagens de momentos em que você demonstrou força, coragem e determinação. 'Estas qualidades são suas armas nesta jornada', diz a voz. 'Use-as com sabedoria.'",
    choices: [
      {
        id: 1,
        text: "Agradecer pela visão e seguir em frente",
        nextNode: 9,
        effect: {
          points: 15
        }
      }
    ]
  },
  7: {
    id: 7,
    text: "O espelho escurece e mostra situações em que você sentiu medo ou limitações. 'Confrontar seus medos é o verdadeiro teste de um herói', diz a voz. 'Eles são apenas sombras do que você pode se tornar.'",
    choices: [
      {
        id: 1,
        text: "Reconhecer seus medos e aceitar o desafio de superá-los",
        nextNode: 9,
        effect: {
          points: 20,
          heroType: "warrior"
        }
      }
    ]
  },
  8: {
    id: 8,
    text: "A presença se dissipa completamente. Você continua sua vida como antes, às vezes sentindo que há algo mais que poderia ter explorado. Talvez um dia o chamado retorne, e você esteja pronto para responder.",
    isEnding: true
  },
  9: {
    id: 9,
    text: "O espelho desaparece e você sente uma nova clareza interior. 'Esta é apenas o começo da sua jornada', diz a voz. 'Cada missão que completar revelará mais do seu potencial heroico. Está pronto para o próximo desafio?'",
    choices: [
      {
        id: 1,
        text: "Sim, estou pronto para continuar minha jornada",
        nextNode: 10,
        effect: {
          points: 10,
          missionUnlock: 4
        }
      }
    ]
  },
  10: {
    id: 10,
    text: "A voz parece satisfeita. 'Excelente! Agora, sua próxima missão aguarda. Lembre-se: sua jornada é única, suas escolhas definem seu caminho. E este é apenas o começo...'",
    isEnding: true
  }
};

// Calculate hero type based on quiz answers
export const calculateHeroType = (answers: {[key: number]: string}) => {
  const scores: {[key: string]: number} = {
    warrior: 0,
    explorer: 0,
    mentor: 0,
    rebel: 0
  };
  
  Object.entries(answers).forEach(([questionId, answerId]) => {
    const question = quizQuestions.find(q => q.id === parseInt(questionId));
    if (question) {
      const answer = question.options.find(a => a.id === answerId);
      if (answer) {
        Object.entries(answer.points).forEach(([heroType, points]) => {
          scores[heroType] += points;
        });
      }
    }
  });
  
  let maxScore = 0;
  let dominantType = "warrior"; // default
  
  Object.entries(scores).forEach(([heroType, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantType = heroType;
    }
  });
  
  return dominantType;
};

// Check if a badge is unlocked
export const checkBadgeUnlocked = (
  badge: Badge, 
  completedMissions: number[], 
  points: number
): boolean => {
  if (badge.requirement.type === "points") {
    return points >= (badge.requirement.value as number);
  } else if (badge.requirement.type === "missions") {
    return completedMissions.length >= (badge.requirement.value as number);
  } else if (badge.requirement.type === "specific-mission") {
    return completedMissions.includes(parseInt(badge.requirement.value as string));
  }
  return false;
};
