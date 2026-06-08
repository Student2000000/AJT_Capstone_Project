describe('Cart Side Bar', () => {
    beforeEach(() => {
        // Starting at the homepage
        cy.visit('/'); 

        // Add a product with size/color variants to cart
        cy.contains('[data-testid="product-card"]', 'Hoodie').click()
        // "You May Also Like" appears at bottom of ProductView, so if visible, page is fully loaded
        cy.contains('You May Also Like').should('be.visible')
        cy.contains('button', 'Add to Cart').click()

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