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
    isEnding?: boolean;
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
  },
  {
    id: 6,
    title: "Teste de Resistência Mental",
    description: "Quanto tempo você dedica por semana ao seu bem-estar mental? Reflita sobre isso e defina pelo menos 15 minutos na sua agenda para um 'treino mental'.",
    type: "action",
    difficulty: "easy",
    points: 15,
    completionMessage: "Excelente! Investir tempo no seu bem-estar mental é tão importante quanto malhar o corpo. Este é o primeiro passo para se tornar um homem completo."
  },
  {
    id: 7,
    title: "O Jogo da Mente",
    description: "Identifique um 'inimigo mental' em sua vida (procrastinação, ansiedade, auto-sabotagem) e escreva uma estratégia para enfrentá-lo.",
    type: "reflection",
    difficulty: "medium",
    points: 20,
    completionMessage: "Parabéns! Você já está aplicando princípios da psicologia para vencer seus desafios. Um psicólogo poderia ajudá-lo a desenvolver estratégias ainda mais eficazes."
  },
  {
    id: 8,
    title: "Ranking dos Lendários",
    description: "O que te impede de buscar ajuda profissional para otimizar seu desempenho mental? Identifique sua principal barreira e um passo para superá-la.",
    type: "reflection",
    difficulty: "medium",
    points: 25,
    completionMessage: "Excelente análise! Os homens mais bem-sucedidos reconhecem que ter um profissional para treinar sua mente é uma vantagem competitiva, não uma fraqueza."
  },
  {
    id: 9,
    title: "A Escolha do Herói",
    description: "Pesquise por 5 minutos sobre como a psicoterapia ajudou algum homem bem-sucedido que você admira (atleta, empresário, etc).",
    type: "challenge",
    difficulty: "medium",
    points: 30,
    completionMessage: "Ótimo trabalho! Homens de sucesso não têm medo de buscar ferramentas para otimizar seu desempenho mental. A terapia é uma dessas ferramentas poderosas."
  },
  {
    id: 10,
    title: "O Psicólogo dos Campeões",
    description: "Complete a frase: 'Se eu tivesse um psicólogo, eu finalmente...' e liste três áreas da sua vida que poderiam melhorar com ajuda profissional.",
    type: "reflection",
    difficulty: "hard",
    points: 35,
    completionMessage: "Impressionante! Essa clareza sobre seus objetivos é o primeiro passo para transformá-los em realidade. Um psicólogo pode ajudá-lo a criar um plano estratégico para alcançá-los mais rápido."
  },
  {
    id: 11,
    title: "Desafio da Coragem Real",
    description: "Pesquise online por um psicólogo especializado em homens ou marque uma sessão experimental. Apenas pesquisar já completa a missão!",
    type: "action",
    difficulty: "hard",
    points: 50,
    completionMessage: "Você demonstrou uma coragem que poucos homens têm! Dar o primeiro passo é sempre o mais difícil. Lembre-se: buscar ajuda não é fraqueza, é estratégia inteligente."
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
  },
  {
    id: "mind-warrior",
    name: "Guerreiro Mental",
    description: "Completou o Teste de Resistência Mental",
    imageClass: "bg-orange-600",
    requirement: {
      type: "specific-mission",
      value: "6"
    }
  },
  {
    id: "pattern-breaker",
    name: "Quebrador de Padrões",
    description: "Identificou e enfrentou um inimigo mental",
    imageClass: "bg-indigo-600",
    requirement: {
      type: "specific-mission",
      value: "7"
    }
  },
  {
    id: "legend-tier",
    name: "Nível Lendário",
    description: "Entrou para o ranking dos homens que priorizam saúde mental",
    imageClass: "bg-yellow-500",
    requirement: {
      type: "specific-mission",
      value: "8"
    }
  },
  {
    id: "strategic-thinker",
    name: "Pensador Estratégico",
    description: "Pesquisou como a psicoterapia beneficia homens bem-sucedidos",
    imageClass: "bg-blue-500",
    requirement: {
      type: "specific-mission",
      value: "9"
    }
  },
  {
    id: "self-leader",
    name: "Líder de Si Mesmo",
    description: "Definiu objetivos claros para desenvolvimento pessoal",
    imageClass: "bg-green-500",
    requirement: {
      type: "specific-mission",
      value: "10"
    }
  },
  {
    id: "true-courage",
    name: "Coragem Verdadeira",
    description: "Deu o primeiro passo em direção à ajuda profissional",
    imageClass: "bg-red-700",
    requirement: {
      type: "specific-mission",
      value: "11"
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
  },
  11: {
    id: 11,
    text: "Enquanto você avança em sua jornada, percebe que alguns desafios parecem se repetir. 'Todos os heróis precisam de aliados', diz a voz. 'Até mesmo os mais fortes buscam conselho e orientação em sua jornada.'",
    choices: [
      {
        id: 1,
        text: "Concordar que ajuda pode ser útil",
        nextNode: 12,
        effect: {
          points: 15,
          missionUnlock: 6
        }
      },
      {
        id: 2,
        text: "Questionar se realmente preciso de ajuda",
        nextNode: 13
      }
    ]
  },
  12: {
    id: 12,
    text: "A voz parece satisfeita. 'Um verdadeiro guerreiro sabe quando buscar aliados. Na sua jornada, um guia mental pode ser tão importante quanto uma espada afiada. Experimentar um treino mental pode fortalecer sua mente assim como exercícios fortalecem seu corpo.'",
    choices: [
      {
        id: 1,
        text: "Aceitar o desafio do treino mental",
        nextNode: 14,
        effect: {
          points: 20,
          missionUnlock: 7
        }
      }
    ]
  },
  13: {
    id: 13,
    text: "A voz responde calmamente: 'Questionar é sábio. Mas observe: os maiores líderes e guerreiros da história tinham conselheiros e mentores. Não para mostrar fraqueza, mas para maximizar força. O que você tem a perder ao considerar essa possibilidade?'",
    choices: [
      {
        id: 1,
        text: "Talvez valha a pena experimentar",
        nextNode: 12,
        effect: {
          points: 10
        }
      },
      {
        id: 2,
        text: "Prefiro continuar sozinho por enquanto",
        nextNode: 15
      }
    ]
  },
  14: {
    id: 14,
    text: "Você decide explorar o conceito de treino mental. 'Assim como um atleta tem um preparador físico, um guerreiro da mente pode se beneficiar de um treinador mental - um psicólogo', explica a voz. 'Não é sobre fraqueza, mas sobre otimização e desempenho máximo.'",
    choices: [
      {
        id: 1,
        text: "Isso faz sentido, quero saber mais",
        nextNode: 16,
        effect: {
          missionUnlock: 8
        }
      }
    ]
  },
  15: {
    id: 15,
    text: "A voz respeita sua decisão. 'Sua jornada, suas escolhas. Mas saiba que essa opção permanecerá disponível se mudar de ideia. Às vezes, a verdadeira força está em reavaliar nossas posições quando temos novas informações.'",
    choices: [
      {
        id: 1,
        text: "Continuar a jornada por enquanto",
        nextNode: 16
      }
    ]
  },
  16: {
    id: 16,
    text: "À medida que você avança em sua jornada, nota que muitos heróis bem-sucedidos mencionam ter buscado orientação de mentores e conselheiros. 'Você sabia que muitos atletas de elite, CEOs e líderes trabalham com psicólogos para otimizar seu desempenho?', pergunta a voz.",
    choices: [
      {
        id: 1,
        text: "Isso é interessante, conte mais",
        nextNode: 17,
        effect: {
          missionUnlock: 9
        }
      },
      {
        id: 2,
        text: "Ainda tenho dúvidas sobre isso",
        nextNode: 18
      }
    ]
  },
  17: {
    id: 17,
    text: "A voz continua: 'Michael Jordan, Dwayne Johnson, Michael Phelps - todos falam abertamente sobre como a terapia os ajudou a alcançar seus objetivos. Não é sobre consertar o que está quebrado, mas sobre maximizar potencial. O que você poderia conquistar com esse tipo de vantagem?'",
    choices: [
      {
        id: 1,
        text: "Refletir sobre meus próprios objetivos",
        nextNode: 19,
        effect: {
          points: 25,
          missionUnlock: 10
        }
      }
    ]
  },
  18: {
    id: 18,
    text: "A voz responde com calma: 'É natural ter dúvidas. Pense nisso: se existisse uma ferramenta que pudesse ajudá-lo a superar obstáculos mais rapidamente e alcançar seus objetivos com mais eficiência, não valeria ao menos explorar essa possibilidade?'",
    choices: [
      {
        id: 1,
        text: "Colocado dessa forma, faz sentido",
        nextNode: 17,
        effect: {
          points: 15
        }
      },
      {
        id: 2,
        text: "Prefiro focar em outras estratégias",
        nextNode: 20
      }
    ]
  },
  19: {
    id: 19,
    text: "Ao refletir sobre seus objetivos, você percebe que existem padrões que se repetem em sua vida. 'O verdadeiro heroísmo está em dar passos concretos em direção à melhor versão de si mesmo', diz a voz. 'Às vezes, isso significa buscar aliados estratégicos para sua jornada.'",
    choices: [
      {
        id: 1,
        text: "Explorar a possibilidade de buscar ajuda profissional",
        nextNode: 21,
        effect: {
          points: 35,
          missionUnlock: 11
        }
      },
      {
        id: 2,
        text: "Continuar a jornada e considerar isso mais tarde",
        nextNode: 20
      }
    ]
  },
  20: {
    id: 20,
    text: "Sua jornada continua, e você acumula vitórias e desafios. 'Lembre-se', diz a voz, 'todo herói tem seu próprio caminho. A porta para buscar aliados estratégicos permanecerá aberta quando você sentir que é o momento certo.'",
    choices: [
      {
        id: 1,
        text: "Agradecer e continuar a jornada",
        nextNode: 10,
        isEnding: true
      }
    ]
  },
  21: {
    id: 21,
    text: "Você decide dar um passo corajoso que poucos homens têm a audácia de dar. 'Esta pode ser uma das decisões mais estratégicas da sua jornada', afirma a voz com convicção. 'Buscar um psicólogo não é sinal de fraqueza, mas de inteligência tática e autoconhecimento avançado.'",
    choices: [
      {
        id: 1,
        text: "Comprometer-me a pesquisar um profissional",
        nextNode: 22,
        effect: {
          points: 50
        }
      }
    ]
  },
  22: {
    id: 22,
    text: "A voz parece genuinamente impressionada. 'Você demonstrou um nível de coragem que poucos possuem. Esta busca por otimização mental e desenvolvimento pessoal o coloca à frente da maioria. Sua jornada como herói acaba de atingir um novo patamar.'",
    choices: [
      {
        id: 1,
        text: "Seguir em frente com determinação renovada",
        nextNode: 23,
        isEnding: true
      }
    ]
  },
  23: {
    id: 23,
    text: "Parabéns! Você completou um importante capítulo da sua jornada. Ao considerar a busca por ajuda profissional, você demonstrou uma qualidade rara: a capacidade de usar todas as ferramentas disponíveis para alcançar seu pleno potencial. Este é apenas o começo de uma jornada extraordinária.",
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
