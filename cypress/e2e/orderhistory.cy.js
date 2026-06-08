describe('Order History Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/orders')
    })

    it('displays order history page', () => {
        cy.contains('Order History').should('be.visible')
    })

    it('shows empty state or orders', () => {
        // Either shows "No orders yet" or shows order cards
        cy.get('body').then(($body) => {
            if ($body.text().includes('No orders yet')) {
                cy.contains('No orders yet').should('be.visible')
            } else {
                // Orders exist - check for order elements
                cy.contains('PAID').should('be.visible')
                cy.contains('Order #').should('be.visible')
            }
        })
    })

    it('displays order details when orders exist', () => {
        cy.get('body').then(($body) => {
            if (!$body.text().includes('No orders yet')) {
                // Check order card has expected elements
                cy.contains('Order placed:').should('be.visible')
                cy.get('body').should('contain', '$')
            }
        })
    })

    it('can navigate back to home from order history', () => {
        cy.contains('Name').click()
        cy.url().should('eq', 'http://localhost:5173/')
    })
})