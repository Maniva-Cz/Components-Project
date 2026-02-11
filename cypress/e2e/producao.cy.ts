describe("Produção (RF03)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/producao");
  });

  it("deve listar registros vindos da API", () => {
    cy.contains("Controle de Produção").should("be.visible");
    cy.get('[data-testid="producao-tabela"]').should("exist");
  });

  it("deve adicionar e remover um registro", () => {
    const produto = `Prod E2E ${Date.now()}`;

    cy.intercept("POST", "**/producao").as("criar");
    cy.intercept("DELETE", "**/producao/*").as("deletar");

    cy.get('[data-testid="producao-produto"]').clear().type(produto);
    cy.get('[data-testid="producao-adicionar"]').click();

    cy.wait("@criar").its("response.statusCode").should("eq", 201);

    cy.contains(produto).should("be.visible");

    cy.contains('[data-testid^="producao-linha-"]', produto).within(() => {
      cy.contains("Remover").click();
    });

    cy.wait("@deletar").its("response.statusCode").should("be.oneOf", [200, 204]);

    cy.reload();
    cy.contains(produto).should("not.exist");
  });
});
