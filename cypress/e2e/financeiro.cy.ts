describe("Financeiro (RF06/RF07)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("deve carregar o resumo financeiro (widget) a partir da API", () => {
    cy.contains("Financeiro da Comunidade").should("be.visible");
  });

  it("deve adicionar e remover um lançamento", () => {
  const desc = `Lanc E2E ${Date.now()}`;

  cy.intercept("POST", "**/lancamentos").as("criar");
  cy.intercept("DELETE", "**/lancamentos/*").as("deletar");

  cy.get('[data-testid="fin-tipo"]').select("Entrada");
  cy.get('[data-testid="fin-valor"]').clear().type("10");
  cy.get('[data-testid="fin-descricao"]').clear().type(desc);
  cy.get('[data-testid="fin-adicionar"]').click();

  cy.wait("@criar").then((i) => {
    expect(i.response?.statusCode).to.eq(201);
    const id = i.response?.body?.id;
    expect(id).to.exist;

    // garante que apareceu
    cy.contains(desc).should("be.visible");

    // remove exatamente o lançamento criado
    cy.get(`[data-testid="fin-remover-${id}"]`).click();
  });

  cy.wait("@deletar").its("response.statusCode").should("be.oneOf", [200, 204]);

  cy.reload();
  cy.contains(desc).should("not.exist");
    });

});
