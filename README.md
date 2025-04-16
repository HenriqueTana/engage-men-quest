
# Sua Jornada do Herói

Um aplicativo web para jornada de autoconhecimento e desenvolvimento pessoal.

## Configuração do Projeto para VS Code

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [VS Code](https://code.visualstudio.com/download)
- Extensões recomendadas para VS Code:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

### Como executar o projeto

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd engage-men-quest
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em [http://localhost:8080](http://localhost:8080)

## Estrutura do projeto

```
├── public/             # Arquivos estáticos como imagens e favicon
├── src/                # Código fonte do projeto
│   ├── components/     # Componentes React reutilizáveis
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Bibliotecas e utilidades
│   ├── pages/          # Páginas da aplicação
│   └── utils/          # Funções utilitárias
├── index.html          # Página HTML principal
└── vite.config.ts      # Configuração do Vite
```

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Visualiza o build de produção localmente
- `npm run lint` - Executa o linter para verificar problemas no código

## Tecnologias utilizadas

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vite

## Funcionalidades principais

- Teste para descoberta do tipo de herói
- Missões personalizadas baseadas no perfil
- Sistema de conquistas
- Avaliação de saúde emocional
- Narrativa interativa

