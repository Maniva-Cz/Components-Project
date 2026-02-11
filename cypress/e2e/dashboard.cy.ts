describe("Dashboard (RF08)", () => {
  it("deve carregar e mostrar os cards do dashboard", () => {
    cy.visit("http://localhost:5173/dashboard");
    cy.contains("Dashboard").should("be.visible");

    cy.get('[data-testid="dash-card-membros"]').should("exist");
    cy.get('[data-testid="dash-card-producao"]').should("exist");
    cy.get('[data-testid="dash-card-cestas"]').should("exist");
    cy.get('[data-testid="dash-card-financeiro"]').should("exist");
  });

  it("deve exibir valores numéricos nos indicadores", () => {
    cy.visit("http://localhost:5173/dashboard");

    cy.get('[data-testid="dash-membros"]').invoke("text").should("match", /^\d+$/);
    cy.get('[data-testid="dash-producao"]').invoke("text").should("match", /^\d+$/);
    cy.get('[data-testid="dash-cestas"]').invoke("text").should("match", /^\d+$/);
  });
});
