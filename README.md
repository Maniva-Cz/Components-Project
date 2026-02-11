# Maniva-CZ – Plataforma de Gestão para CSA

Este projeto é a implementação das **Etapas 1 e 2** da disciplina **Programação para Web II**.

O sistema **Maniva-CZ** visa automatizar a gestão, transparência e fortalecimento da rede de **Comunidades que Sustentam a Agricultura (CSA)**, resolvendo gargalos operacionais entre agricultores e co-agricultores por meio de uma aplicação web modular, testável e escalável.

---

## Tecnologias Utilizadas

### Front-end
- React (Vite + TypeScript)
- Redux Toolkit (estado global)
- React Router DOM (roteamento)
- Storybook (documentação de componentes)
- Service Worker (Workbox / VitePWA) – cache de funcionalidades

### Testes
- Vitest + React Testing Library (testes unitários)
- Cypress (testes de sistema / E2E)

### Backend
- JSON Server (API REST simulada)

---

## Requisitos Funcionais Implementados

- RF01 – Gestão de Membros  
- RF02 – Gestão de Cestas  
- RF03 – Controle de Produção  
- RF04 – Itens da Cesta  
- RF05 – Mural de Avisos (com cache via Service Worker)  
- RF06 – Entradas Financeiras  
- RF07 – Saídas Financeiras  
- RF08 – Dashboard de Indicadores  

---

## Cache com Service Worker

A funcionalidade **Mural de Avisos (RF05)** utiliza cache via **Service Worker**, garantindo que:
- Após a primeira requisição, os avisos ficam disponíveis mesmo em caso de falha da API.
- O comportamento foi validado por testes E2E.

---

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão LTS recomendada)

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar o backend
```bash
npm run api
```

### 3. Rodar o front-end
```bash
npm run dev
```

Acesse: http://localhost:5173

### 4. Rodar Storybook
```bash
npm run storybook
```

### 5. Testes Unitários
```bash
npx vitest
```

### 6. Testes E2E
```bash
npx cypress run
```

---

## Estrutura do Projeto

src/
- api/        Comunicação com backend  
- componentes/ Componentes reutilizáveis  
- paginas/    Páginas e rotas  
- store/      Redux (estado global)  
- utils/      Funções auxiliares  

---

## Observações

Projeto desenvolvido com foco acadêmico, priorizando clareza, modularidade e testabilidade, conforme o escopo definido pelo mestre professor.
