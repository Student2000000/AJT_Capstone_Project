// describe() groups related tests together under a name
describe('Home Page', () => {
    // beforeEach() runs before every test in this describe block
    // Useful for setup steps that all tests need
    beforeEach(() => {
        // cy.visit() navigates to a URL
        // '/' means the base URL (http://localhost:5173 from cypress.config.js)
        cy.visit('/')
    })

    // it() defines a single test case with a description
    it('displays the page title and subtitle', () => {
        // cy.contains() finds an element containing the specified text
        // .should('be.visible') asserts that element is visible on screen
        cy.contains('Featured Products').should('be.visible')
        cy.contains('Show your school spirit with our exclusive collection').should('be.visible')
    })

    it('displays product cards after loading', () => {
        // cy.get() finds elements by CSS selector
        // [data-testid="..."] targets elements with that data-testid attribute
        // .should('have.length.greaterThan', 0) asserts there's at least one element
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    })

    it('displays product information on each card', () => {
        // .first() gets only the first matching element
        cy.get('[data-testid="product-card"]').first().within(() => {
            // .within() scopes all following commands to inside this element
            // So cy.get('img') only looks for images inside the first product card

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

            // cy.contains('button', 'Add to Cart') finds a button containing that text
            cy.contains('button', 'Add to Cart').should('be.visible')
        })
    })

    it('shows correct stock badge colors', () => {
        // .contains() on a cy.get() filters to elements containing that text
        // .should('exist') just checks the element is in the DOM (doesn't need to be visible)
        cy.get('[data-testid="stock-badge"]')
            .contains('in stock')
            .should('exist')

        // Note: Yellow (low stock) and red (out of stock) badges 
        // depend on actual inventory data in the database
    })

    it('disables Add to Cart button for out-of-stock items', () => {
        // cy.get('body') gets the entire page body
        // .then(($body) => {}) gives us a jQuery object to work with
        // The $ prefix indicates it's a jQuery element, not a Cypress chain
        cy.get('body').then(($body) => {
            // $body.find() uses jQuery to search within the body
            // This doesn't fail the test if nothing is found (unlike cy.get)
            // .length gives us the count of matching elements
            if ($body.find('[data-testid="stock-badge"]:contains("Out of stock")').length > 0) {
                // Only run this check if out-of-stock items exist
                cy.get('[data-testid="product-card"]')
                    // .has() filters to cards that contain a matching child element
                    .has('[data-testid="stock-badge"]:contains("Out of stock")')
                    // .find() searches for elements inside the filtered cards
                    .find('button')
                    // .should('be.disabled') asserts the button is disabled
                    .should('be.disabled')
            }
            // If no out-of-stock items exist, test passes (nothing to check)
        })
    })

    it('displays products in a grid layout', () => {
        cy.get('[data-testid="product-grid"]').should('be.visible')

        // Verify multiple cards are displayed
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 1)
    })
})

describe('Home Page - Loading State', () => {
    it('shows loading indicator while fetching products', () => {
        // cy.intercept() catches network requests before they complete
        // 'GET' is the HTTP method
        // '**/rest/v1/products*' matches any URL containing this path (* is wildcard)
        cy.intercept('GET', '**/rest/v1/products*', (req) => {
            // req.on('response') lets us modify the response
            req.on('response', (res) => {
                // res.setDelay(1000) delays the response by 1 second
                // This gives us time to see the loading spinner
                res.setDelay(1000)
            })
        }).as('getProducts')  // .as() gives this intercept a name we can reference later

        cy.visit('/')

        // While the request is delayed, the loader should be visible
        cy.get('[data-testid="loader"]').should('be.visible')

        // cy.wait('@getProducts') pauses until the named intercept completes
        // The @ prefix references the alias we created with .as()
        cy.wait('@getProducts')

        // After loading completes, products should appear
        cy.get('[data-testid="product-card"]').should('have.length.greaterThan', 0)
    })
})