describe('SearchBar', () => {
    beforeEach(() => {
        //visit the home page first 
        cy.visit('/')
    })

    it('displays potential search terms', () => {
        cy.get('[data-testid="search-bar"]')
            .type('Hood')
        
        cy.contains('Classic Hoodie')
            .should('be.visible')
    })
})