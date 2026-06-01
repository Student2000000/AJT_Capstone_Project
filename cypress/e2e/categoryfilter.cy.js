describe('CategoryFilter', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
        // Wait for products to load
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    })

    it('shows all products by default', () => {
        cy.contains('button', 'All').should('exist')
        cy.get('[data-testid="product-card"]').should('have.length', 12)
    })

    it('filters to Apparel only', () => {
        cy.contains('button', 'Apparel').click()
        // Should show fewer than 12 products
        cy.get('[data-testid="product-card"]').should('have.length', 5)
    })

    it('filters to Accessories only', () => {
        cy.contains('button', 'Accessories').click()
        cy.get('[data-testid="product-card"]').should('have.length', 5)
    })

    it('filters to Stationery only', () => {
        cy.contains('button', 'Stationery').click()
        cy.get('[data-testid="product-card"]').should('have.length', 2)
    })

    it('returns to all products when All is clicked', () => {
        cy.contains('button', 'Apparel').click()
        cy.get('[data-testid="product-card"]').should('have.length', 5)

        cy.contains('button', 'All').click()
        cy.get('[data-testid="product-card"]').should('have.length', 12)
    })
})