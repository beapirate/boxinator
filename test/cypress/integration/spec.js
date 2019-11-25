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

  it("Should show created box in list view", () => {
    cy.contains('Add').click()
    cy.get("#box-recipientName").type("recipient1")
    cy.get("#box-weight").clear().type("19.2")

    // fix #box-color input to handle raw input instead
    cy.get("#root > div > div > div > form > div:nth-child(10) > div:nth-child(2)").click()
    cy.get("#root > div > div > div > form > div.chrome-picker > div:nth-child(2) > div:nth-child(2) > div.flexbox-fix > div > div > input").clear().type("#fafafa")
    cy.get("#root > div > div > div > form > div:nth-child(10) > div:nth-child(2)").click()

    cy.get("#box-destinationCountry").select("Brazil");
    cy.get("#box-save").click();

    cy.contains("List").click();

    cy.contains("19.2").should("exist")

  })
})
