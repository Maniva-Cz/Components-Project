describe("Membros (RF01)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/membros");
  });

  it("deve listar membros vindos da API", () => {
    cy.contains("Membros da Cooperativa").should("be.visible");

    // Aguarda a lista renderizar e garante que tem pelo menos 1 item
    cy.get('[data-testid="lista-membros"]').should("exist");
    cy.get('[data-testid^="membro-"]').its("length").should("be.greaterThan", 0);
  });

  
it("deve adicionar e remover um membro", () => {
  const nome = `Teste E2E ${Date.now()}`;

  cy.intercept("POST", "**/membros").as("criar");
  cy.intercept("DELETE", "**/membros/*").as("deletar");

  cy.get('[data-testid="nome-membro"]').clear().type(nome);
  cy.get('[data-testid="btn-adicionar"]').click();

  cy.wait("@criar").then((i) => {
    expect(i.response?.statusCode).to.eq(201);
    const id = i.response?.body?.id;
    expect(id).to.exist;

    cy.get(`[data-testid="remover-${id}"]`).click();
  });

  cy.wait("@deletar").its("response.statusCode").should("be.oneOf", [200, 204]);

  cy.reload();
  cy.contains(nome).should("not.exist");
});

});
