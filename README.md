# Maniva-CZ - Plataforma de Gestão para CSA

Este projeto é a implementação da **1ª Etapa (Projeto de Componentes)** da disciplina **Programação para Web II**.

O sistema **Maniva-CZ** visa automatizar a gestão, transparência e fortalecimento da rede de **Comunidades que Sustentam a Agricultura (CSA)**, focando em resolver gargalos operacionais entre agricultores e co-agricultores.

## Tecnologias Utilizadas

* **React** (Vite + TypeScript)
* **Storybook** (Documentação e visualização de componentes isolados)
* **Vitest** + **React Testing Library** (Testes Unitários)

---

## Como Instalar e Executar

Certifique-se de ter o **Node.js** instalado em sua máquina.

### 1. Clonar e Instalar Dependências
Abra o terminal na pasta do projeto e execute:

```bash
npm install
```
### 2. Rodar o Storybook

```bash
npm run storybook
```

### 3. Rodar os Testes Unitários

```bash
npx vitest
```
## Componentes Desenvolvidos

* **CardCesta**: Permite a visualização dos itens da cesta da semana e o status da entrega, garantindo transparência na partilha.

* **MuralAvisos**: Facilita a comunicação interna, permitindo a divulgação de excedentes e solicitações de ajuda mútua entre os membros.

* **WidgetFinanceiro**: Dashboard para controle financeiro comunitário, exibindo arrecadação e custos para transparência da gestão.

* **TabelaProducao**: Interface para o agricultor registrar detalhadamente sua produção diária, substituindo o fluxo manual.

* **CardMembro**: Componente administrativo para gestão de usuários, permitindo a visualização e aprovação de novos membros (agricultores e co-agricultores).

---

## Estrutura do Projeto

A organização dos arquivos segue o padrão modular para facilitar a manutenção e os testes:

* `src/componentes/`: Pasta contendo subpastas para cada componente. Cada uma inclui:
    * `NomeComponente.tsx`: Lógica e interface do componente.
    * `NomeComponente.stories.tsx`: Configuração para exibição no Storybook.
    * `NomeComponente.test.tsx`: Testes unitários.
    * `*.mock.ts`: Dados fictícios para simulação.
* `src/setupTests.ts`: Configurações globais do ambiente de testes.