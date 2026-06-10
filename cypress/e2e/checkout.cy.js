describe('Checkout Page', () => {
    beforeEach(() => {
        // Add an item to cart first
        cy.visit('http://localhost:5173')
        cy.get('[data-testid="product-card"]').first().click()

        // Wait for ProductView to load
        cy.contains('You May Also Like').should('be.visible')

        // Add to cart
        cy.contains('button', 'Add to Cart').click()

        // Open cart sidebar from Navbar
        cy.get('[data-testid="cart-button"]').click()
        cy.contains('Proceed to Checkout').click()
    })

    it('displays checkout page with order summary', () => {
        cy.url().should('include', '/checkout')
        cy.contains('Checkout').should('be.visible')
        cy.contains('Order Summary').should('be.visible')
    })

    it('shows cart item details in summary', () => {
        cy.get('body').should('contain', '$')
        cy.contains('Total').should('be.visible')
    })

    it('displays Stripe payment form', () => {
        cy.contains('Payment').should('be.visible')
        cy.contains('Test mode').should('be.visible')
        cy.get('iframe').should('exist')
    })

    it('has continue shopping button', () => {
        cy.contains('Continue Shopping').should('be.visible')
        cy.contains('Continue Shopping').click()
        cy.url().should('eq', 'http://localhost:5173/')
    })
})