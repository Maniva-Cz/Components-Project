describe('Fluxo de Compra da Cesta', () => {
  // Antes de cada teste, visita a página inicial
  beforeEach(() => {
    cy.visit('http://localhost:5173'); 
  });

  it('Deve navegar para a Loja e verificar os produtos', () => {
    // 1. Verifica se está na Home
    cy.contains('Maniva').should('be.visible');

    // 2. Clica no link "Loja" no menu
    cy.contains('nav a', 'Loja').click();

    // 3. Verifica se a URL mudou
    cy.url().should('include', '/loja');

    // 4. Verifica se os produtos apareceram
    cy.contains('Farinha de Mandioca').should('be.visible');
    cy.contains('Doce de Leite Artesanal').should('be.visible');
  });

  it('Deve adicionar um item ao carrinho e atualizar o contador', () => {
    // 1. Vai para a loja
    cy.contains('nav a', 'Loja').click();

    // 2. Verifica que o carrinho começa vazio (Cesta: 0)
    // Nota: O texto exato deve bater com o do seu componente App.tsx ("🛒 Cesta: 0")
    cy.contains('Cesta: 0').should('be.visible');

    // 3. CORREÇÃO DO ERRO:
    // Encontra botões "Adicionar", pega o PRIMEIRO (.first) e clica
    cy.contains('button', 'Adicionar').first().click();

    // 4. Verifica se o botão mudou para "Remover"
    cy.contains('button', 'Remover').should('be.visible');

    // 5. Verifica se o contador lá em cima mudou para 1
    cy.contains('Cesta: 1').should('be.visible');
  });

  it('Deve remover um item do carrinho', () => {
    // 1. Vai para a loja
    cy.contains('nav a', 'Loja').click();
    
    // 2. Adiciona o primeiro item
    cy.contains('button', 'Adicionar').first().click();
    
    // Confirma que adicionou
    cy.contains('Cesta: 1').should('be.visible');

    // 3. Clica em Remover (como só tem 1 botão de remover agora, não precisa do .first(), mas mal não faz)
    cy.contains('button', 'Remover').click();

    // 4. Verifica se voltou para Adicionar
    cy.contains('button', 'Adicionar').should('exist');

    // 5. Verifica se o contador zerou
    cy.contains('Cesta: 0').should('be.visible');
  });
});