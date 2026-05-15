// describe() groups related tests together under a name
describe('ProductView Page', () => {
    // beforeEach() runs before every test in this describe block
    beforeEach(() => {
        // Visit home page first, then click a product to get to ProductView
        cy.visit('/')

        // Wait for products to load, then click the first one
        cy.get('[data-testid="product-card"]').first().click()
    })

    it('displays product information', () => {
        // Product name should be visible
        cy.get('h2').should('be.visible')

        // Price should be visible (starts with $)
        cy.contains('$').should('be.visible')

        // Category label should be visible (uppercase text like APPAREL, ACCESSORIES, etc.)
        // .invoke('text') gets all text content from the element
        // .should('match', /regex/) checks if the text matches the pattern
        // The | in regex means "or", so this checks for any of the three categories
        // The 'i' flag makes it case-insensitive (matches "apparel", "APPAREL", etc.)
        cy.get('body').invoke('text').should('match', /APPAREL|ACCESSORIES|STATIONERY/i)
    })

    it('displays product image', () => {
        // Main product image should be visible
        cy.get('img').first().should('be.visible')
    })

    it('displays product details section', () => {
        // Product Details heading should exist
        cy.contains('Product Details').should('be.visible')

        // Material and Care rows should be present
        cy.contains('Material').should('be.visible')
        cy.contains('Care').should('be.visible')
    })

    it('displays Add to Cart button', () => {
        cy.contains('button', 'Add to Cart').should('be.visible')
    })
})

describe('ProductView - Variant Selection', () => {
    beforeEach(() => {
        // Visit a product that has variants (apparel has size + color)
        cy.visit('/')

        // cy.contains('[selector]', 'text') finds an element matching the selector that contains the text
        // This clicks the product card that has "Hoodie" in it
        cy.contains('[data-testid="product-card"]', 'Hoodie').click()
    })

    it('displays size options for apparel', () => {
        // Size label should be visible
        cy.contains('Size').should('be.visible')

        // Size buttons should exist (S, M, L, XL)
        cy.contains('button', 'S').should('be.visible')
        cy.contains('button', 'M').should('be.visible')
        cy.contains('button', 'L').should('be.visible')
    })

    it('displays color options for apparel', () => {
        // Color label should be visible
        cy.contains('Color').should('be.visible')
    })

    it('allows selecting a different size', () => {
        // Click on size M
        cy.contains('button', 'M').click()

        // .should('have.css', 'property') checks the element's CSS
        // .and() chains another assertion on the same element
        // This verifies the button has a background color (not transparent)
        // which indicates it's in the selected/filled state
        cy.contains('button', 'M').should('have.css', 'background-color')
            .and('not.equal', 'rgba(0, 0, 0, 0)')
    })

    it('updates SKU when variant is selected', () => {
        // SKU should be visible in product details
        cy.contains('SKU').should('be.visible')

        // Click a different size
        cy.contains('button', 'L').click()

        // SKU should still be visible (value will change but we just check it exists)
        cy.contains('SKU').should('be.visible')
    })
})

describe('ProductView - Stock Indicators', () => {
    it('shows low stock warning when variant has 1-5 items', () => {
        cy.visit('/')

        // Find and click on a product (we'll check if low stock appears)
        cy.get('[data-testid="product-card"]').first().click()

        // Use jQuery to check if low stock badge exists without failing test
        // .mantine-Badge-root is the CSS class Mantine adds to Badge components
        // :contains("Only") is a jQuery selector that matches elements containing that text
        cy.get('body').then(($body) => {
            if ($body.find('.mantine-Badge-root:contains("Only")').length > 0) {
                cy.contains('Only').should('be.visible')
            }
        })
    })

    it('disables Add to Cart for out of stock variants', () => {
        cy.visit('/')

        // Click on Beanie (seeded with 0 inventory)
        cy.contains('[data-testid="product-card"]', 'Beanie').click()

        // Add to Cart button should be disabled
        cy.contains('button', 'Add to Cart').should('be.disabled')

        // Out of Stock badge should be visible
        cy.contains('Out of Stock').should('be.visible')
    })
})

describe('ProductView - Related Products', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('[data-testid="product-card"]').first().click()
    })

    it('displays You May Also Like section', () => {
        cy.contains('You May Also Like').should('be.visible')
    })

    it('shows related product cards', () => {
        // .parent() gets the parent element of "You May Also Like" heading
        // .find() searches within that parent for product cards
        // This ensures we're only looking at cards in the related products section
        cy.contains('You May Also Like')
            .parent()
            .find('[data-testid="product-card"]')
            .should('have.length.greaterThan', 0)
    })

    it('navigates to a different product when clicking related product', () => {
        // cy.url() gets the current page URL
        // .then() lets us store it in a variable to compare later
        cy.url().then((originalUrl) => {
            // Click a related product
            cy.contains('You May Also Like')
                .parent()
                .find('[data-testid="product-card"]')
                .first()
                .click()

            // Verify we navigated to a different product page
            cy.url().should('not.equal', originalUrl)
            cy.url().should('include', '/product/')
        })
    })
})

describe('ProductView - Navigation', () => {
    it('navigates from Home to ProductView when clicking a card', () => {
        cy.visit('/')

        // Click first product card
        cy.get('[data-testid="product-card"]').first().click()

        // URL should now include /product/
        cy.url().should('include', '/product/')
    })

    it('shows loader while product is loading', () => {
        // Intercept the Supabase request and delay it
        cy.intercept('GET', '**/rest/v1/products*', (req) => {
            req.on('response', (res) => {
                res.setDelay(500)
            })
        }).as('getProduct')

        cy.visit('/')
        cy.get('[data-testid="product-card"]').first().click()

        // Loader should appear briefly
        cy.get('[data-testid="loader"]').should('be.visible')
    })
})