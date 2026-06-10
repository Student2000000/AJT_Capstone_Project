describe('Admin Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/admin')
    })

    it('displays admin dashboard', () => {
        cy.contains('Admin Dashboard').should('be.visible')
        cy.contains('Manage your store').should('be.visible')
    })

    it('displays all tabs', () => {
        cy.contains('Overview').should('be.visible')
        cy.contains('Products').should('be.visible')
        cy.contains('Users').should('be.visible')
        cy.contains('Settings').should('be.visible')
    })

    describe('Overview Tab', () => {
        it('displays overview stats', () => {
            cy.contains('Quick stats about your store').should('be.visible')
            cy.contains('Total Products').should('be.visible')
            cy.contains('Pending Orders').should('be.visible')
            cy.contains('Registered Users').should('be.visible')
        })
    })

    describe('Products Tab', () => {
        beforeEach(() => {
            cy.contains('Products').click()
        })

        it('displays product management section', () => {
            cy.contains('Product Management').should('be.visible')
            cy.contains('Add New Product').should('be.visible')
        })

        it('displays products table with data', () => {
            cy.get('table').should('be.visible')
            cy.contains('th', 'Name').should('be.visible')
            cy.contains('th', 'Price').should('be.visible')
            cy.contains('th', 'Category').should('be.visible')
            cy.contains('th', 'Actions').should('be.visible')
        })

        it('opens create product modal', () => {
            cy.contains('Add New Product').click()
            cy.contains('Create Product').should('be.visible')
            cy.contains('Product Name').should('be.visible')
            cy.contains('Price').should('be.visible')
            cy.contains('Category').should('be.visible')
        })

        it('closes create product modal', () => {
            cy.contains('Add New Product').click()
            cy.contains('Create Product').should('be.visible')
            cy.get('.mantine-Modal-close').click()
            cy.contains('Create Product').should('not.exist')
        })

        it('opens edit product modal', () => {
            cy.contains('button', 'Edit').first().click()
            cy.contains('Edit Product').should('be.visible')
        })

        it('opens delete confirmation modal', () => {
            cy.contains('button', 'Delete').first().click()
            cy.contains('Delete Product').should('be.visible')
            cy.contains('Are you sure you want to delete').should('be.visible')
        })
    })

    describe('Users Tab', () => {
        beforeEach(() => {
            cy.contains('Users').click()
        })

        it('displays users section', () => {
            cy.contains('h2', 'Users').should('be.visible')
            cy.contains('Mock user list').should('be.visible')
        })

        it('displays users table', () => {
            cy.contains('th', 'User ID').should('be.visible')
            cy.contains('th', 'Email').should('be.visible')
            cy.contains('th', 'Role').should('be.visible')
            cy.contains('John Doe').should('be.visible')
            cy.contains('Jane Smith').should('be.visible')
        })
    })

    describe('Settings Tab', () => {
        beforeEach(() => {
            cy.contains('Settings').click()
        })

        it('displays settings section', () => {
            cy.contains('h2', 'Settings').should('be.visible')
            cy.contains('Store configuration').should('be.visible')
        })

        it('displays settings cards', () => {
            cy.contains('Store Information').should('be.visible')
            cy.contains('Appearance').should('be.visible')
            cy.contains('Currency & Pricing').should('be.visible')
        })
    })
})