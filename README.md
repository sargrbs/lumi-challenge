# Gerenciamento de Faturas - Frontend React + TypeScript + Vite

Este projeto é o frontend para uma aplicação de gerenciamento de faturas de energia elétrica, desenvolvido com React, TypeScript e Vite.

# Visão Geral

    O aplicativo oferece as seguintes funcionalidades principais:

    Página inicial (Home)
    Dashboard com gráficos
    Biblioteca de faturas para gerenciamento (upload e exclusão)
    Visualização detalhada de faturas (com futura implementação de download)

# Tecnologias Principais

    React 18
    TypeScript
    Vite
    React Router DOM
    Styled Components
    Axios
    Recharts (para gráficos)
    React Modal
    React Toastify

# Requisitos do Sistema

    Node.js versão 18.x ou superior
    npm

# Instalação

    Clone o repositório:
      git clone [URL_DO_REPOSITÓRIO]

    Navegue até o diretório do projeto:
      cd [NOME_DO_DIRETÓRIO]

    Instale as dependências:
      npm install

    Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias (por exemplo, URL da API).

    Scripts Disponíveis
    No diretório do projeto, você pode executar:

    npm run dev: Inicia o servidor de desenvolvimento Vite.
    npm run build: Compila o projeto TypeScript e constrói a versão de produção.
    npm run lint: Executa o ESLint para verificação de código.
    npm run preview: Inicia um servidor local para pré-visualização da versão de produção.
    npm run format: Formata o código usando Prettier.

# Desenvolvimento

    Para iniciar o desenvolvimento:

    Execute npm run dev
    Abra http://localhost:5173 no seu navegador

    O Hot Module Replacement (HMR) está ativado por padrão, permitindo atualizações em tempo real durante o desenvolvimento.

# Estrutura do Projeto

    A estrutura principal do projeto é organizada da seguinte forma:
      src/
    ├── assets/
    ├── data/
    ├── protocols/
    ├── usecases/
    ├── domain/
    ├── infra/
    ├── main/
    ├── presentation/
    │   ├── components/
    │   └── pages/
    ├── styles/
    ├── main.tsx
    └── vite-env.d.ts

# Roteamento

    O roteamento é gerenciado usando react-router-dom. Novas rotas podem ser adicionadas no arquivo src/presentation/components/routes/index.tsx.

# Estilização

    O projeto utiliza Styled Components para estilização. Os estilos globais estão definidos em src/styles/global.css, e o tema em src/styles/theme.ts.

# Comunicação com a API

    As requisições para a API são feitas através do Axios. O arquivo para criar novas requisições é src/main/usecases/invoice/invoice-factory.ts.
