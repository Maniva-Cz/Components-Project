describe("Mural (RF05)", () => {
  it("deve carregar avisos do backend", () => {
    cy.visit("http://localhost:5173/");

    cy.get('[data-testid="mural"]').should("exist");
    cy.get('[data-testid="mural-post"]').its("length").should("be.greaterThan", 0);
  });

it("não deve quebrar a página quando a API do mural falha", () => {
  cy.visit("http://localhost:5173/");
  cy.get('[data-testid="mural"]').should("exist");

  cy.intercept("GET", "**/mural", { forceNetworkError: true });

  cy.reload();

  cy.contains("Carregando avisos...").should("not.exist");
  cy.get('[data-testid="mural-erro"]').should("be.visible");
});


});
