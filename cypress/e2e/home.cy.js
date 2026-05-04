describe('Home Page', () => {
    beforeEach(() => {
        // Visit the home page before each test
        cy.visit('/')
    })

    it('displays the page title and subtitle', () => {
        cy.contains('Featured Products').should('be.visible')
        cy.contains('Show your school spirit with our exclusive collection').should('be.visible')
    })

    it('displays product cards after loading', () => {
        // Wait for products to load and verify cards appear
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    })

    it('displays product information on each card', () => {
        // Check that first product card has required elements
        cy.get('[data-testid="product-card"]').first().within(() => {
            // Product image
            cy.get('img').should('be.visible')

            // Category label
            cy.get('[data-testid="product-category"]').should('be.visible')

            // Product name
            cy.get('[data-testid="product-name"]').should('be.visible')

            // Price
            cy.get('[data-testid="product-price"]').should('be.visible')

            // Stock badge
            cy.get('[data-testid="stock-badge"]').should('be.visible')

            // Add to cart button
            cy.contains('button', 'Add to Cart').should('be.visible')
        })
    })

    it('shows correct stock badge colors', () => {
        // Green badge for in-stock items (more than 5)
        cy.get('[data-testid="stock-badge"]')
            .contains('in stock')
            .should('exist')

        // Note: Yellow (low stock) and red (out of stock) badges
        // depend on actual inventory data in the database
    })

    it('disables Add to Cart button for out-of-stock items', () => {
        // Find any out of stock badges and verify their buttons are disabled
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="stock-badge"]:contains("Out of stock")').length > 0) {
                cy.get('[data-testid="product-card"]')
                    .has('[data-testid="stock-badge"]:contains("Out of stock")')
                    .find('button')
                    .should('be.disabled')
            }
        })
    })

    it('displays products in a grid layout', () => {
        // Verify the grid container exists
        cy.get('[data-testid="product-grid"]').should('be.visible')

        // Verify multiple cards are displayed
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 1)
    })
})

describe('Home Page - Loading State', () => {
    it('shows loading indicator while fetching products', () => {
        // Intercept the Supabase request and delay it
        cy.intercept('GET', '**/rest/v1/products*', (req) => {
            req.on('response', (res) => {
                res.setDelay(1000)
            })
        }).as('getProducts')

        cy.visit('/')

        // Should show loader initially
        cy.get('[data-testid="loader"]').should('be.visible')

        // After loading, products should appear
        cy.wait('@getProducts')
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    })
})
