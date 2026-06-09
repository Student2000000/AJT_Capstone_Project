describe('Navbar', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('displays on home page', () => {
        cy.contains('L E A P').should('be.visible')
        cy.get('[data-testid="cart-button"]').should('be.visible')
        cy.get('[data-testid="orders-button"]').should('be.visible')
    })

    it('navigates home when clicking store name', () => {
        // Go to a product page first
        cy.get('[data-testid="product-card"]').first().click()
        cy.url().should('include', '/product/')

        // Click store name to go home
        cy.contains('L E A P').click()
        cy.url().should('eq', 'http://localhost:5173/')
    })

    it('opens cart sidebar when clicking cart button', () => {
        cy.get('[data-testid="cart-button"]').click()
        cy.contains('Your Cart', { timeout: 6000 }).should('be.visible')
    })

    it('navigates to order history when clicking orders button', () => {
        cy.get('[data-testid="orders-button"]').click()
        cy.url().should('include', '/orders')
        cy.contains('Order History').should('be.visible')
    })

    it('displays on product view page', () => {
        cy.get('[data-testid="product-card"]').first().click()
        cy.contains('L E A P').should('be.visible')
        cy.get('[data-testid="cart-button"]').should('be.visible')
        cy.get('[data-testid="orders-button"]').should('be.visible')
    })

    it('displays on checkout page', () => {
        // Add item and go to checkout
        cy.get('[data-testid="product-card"]').first().click()
        cy.contains('button', 'Add to Cart').click()
        cy.get('[data-testid="cart-button"]').click()
        cy.contains('Proceed to Checkout').click()

        cy.contains('L E A P').should('be.visible')
        cy.get('[data-testid="cart-button"]').should('be.visible')
    })
})