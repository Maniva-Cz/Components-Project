describe("Cestas e Itens (RF02/RF04)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/loja");
  });

  it("deve criar uma cesta", () => {
    const nome = `Cesta E2E ${Date.now()}`;

    cy.intercept("POST", "**/cestas").as("criarCesta");

    cy.get('[data-testid="cesta-nome"]').clear().type(nome);
    cy.get('[data-testid="cesta-criar"]').click();

    cy.wait("@criarCesta").its("response.statusCode").should("be.oneOf", [200, 201]);
    cy.contains(nome).should("be.visible");
  });

  it("deve adicionar e remover um item na cesta a partir de Produção", () => {
    cy.intercept("POST", "**/cestaItens").as("addItem");
    cy.intercept("DELETE", "**/cestaItens/*").as("delItem");

    // Adiciona o primeiro produto disponível (vem de /producao)
    cy.get('[data-testid^="produto-add-"]').first().click();

    cy.wait("@addItem").then((i) => {
      expect(i.response?.statusCode).to.be.oneOf([200, 201]);
      const id = i.response?.body?.id;
      expect(id).to.exist;

      // Remove pelo id retornado
      cy.get(`[data-testid="item-remover-${id}"]`).click();
    });

    cy.wait("@delItem").its("response.statusCode").should("be.oneOf", [200, 204]);
  });
});
