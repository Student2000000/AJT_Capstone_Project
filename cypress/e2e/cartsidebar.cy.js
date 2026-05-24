describe('Cart Side Bar', () => {
    beforeEach(() => {
        // Starting at the homepage
        cy.visit('/'); 

        cy.get('[data-testid="cart-button"]').click();
    })

    it('displays product information on each card card', () => {
        cy.get('[data-testid="cart-card"]')
            .should('exist');

        // .first() gets only the first matching element
            cy.get('[data-testid="cart-card"]').first().within(() => {
                // .within() scopes all following commands to inside this element

                // Product name 
                cy.get('[data-testid="cart-product-name"]').should('be.visible')

                // Price
                cy.get('[data-testid="cart-product-price"]').should('be.visible')

                // Color 
                cy.get('[data-testid="cart-product-color"]').should('be.visible')

                // Size
                cy.get('[data-testid="cart-product-size"]').should('be.visible')
            });
    });
});