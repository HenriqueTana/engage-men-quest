
/**
 * Este arquivo contém instruções adicionais para configuração do VS Code
 * e pode ser usado como referência para novos desenvolvedores.
 */

export const vsCodeSettings = {
  // Configurações recomendadas para o VS Code
  settings: {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "tailwindCSS.includeLanguages": {
      "typescript": "javascript",
      "typescriptreact": "javascript"
    },
    "tailwindCSS.experimental.classRegex": [
      ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
    ]
  },
  
  // Extensões recomendadas
  extensions: [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "dsznajder.es7-react-js-snippets"
  ]
};

/**
 * Passos para iniciantes configurarem o ambiente de desenvolvimento
 */
export const setupForBeginners = [
  "1. Instale o VS Code do site oficial: https://code.visualstudio.com/",
  "2. Instale o Node.js do site oficial: https://nodejs.org/ (versão LTS recomendada)",
  "3. Abra o terminal e clone o projeto: git clone <URL_DO_REPOSITORIO>",
  "4. Entre na pasta do projeto: cd engage-men-quest",
  "5. Instale as dependências: npm install",
  "6. Abra o projeto no VS Code: code .",
  "7. Instale as extensões recomendadas (listadas acima)",
  "8. Execute o projeto: npm run dev",
  "9. Acesse http://localhost:8080 no navegador"
];

/**
 * Solução de problemas comuns
 */
export const troubleshooting = {
  "Erro de porta em uso": "Se a porta 8080 estiver em uso, você pode mudar a porta no arquivo vite.config.ts",
  "Problemas com dependências": "Tente excluir a pasta node_modules e o arquivo package-lock.json, depois execute npm install novamente",
  "Erros de TypeScript": "Execute npm run lint para identificar problemas no código"
};

export default {
  vsCodeSettings,
  setupForBeginners,
  troubleshooting
};
