context('Boxinator', () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it('Displays Form', () => {
    cy.contains('Add').click()
    cy.get("#box-recipientName").should('be.visible')
  })

  it("Should not display form in list view", () => {
    cy.contains("List").click();
    cy.get("#box-recipientName").should('not.be.visible')
  })

  it("Should display list in list view", () => {
    cy.contains("List").click();
    cy.get("#box-list").should("be.visible")
  })
})
