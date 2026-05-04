# AJT Capstone Project

## Table of Contents
* [Project Overview](#project-overview)
* [Team Members](#team-members)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Testing](#testing)
* [Future Enhancements](#future-enhancements)

## Project Overview
This repository houses a prototype React/Vite e-commerce webapp for North Seattle College, designed to showcase and sell official apparel, accessories, and branded merchandise. Built as a multi-phase capstone project.

This project includes:
* A React + Vite frontend with Mantine UI components
* Supabase backend (PostgreSQL database + authentication + REST API)
* End-to-end testing with Cypress
* A multi-phase structure for future expansion (login, payments, admin tools)

## Team Members
AJT is a diverse group of 3 students in their senior year of North Seattle College's Computer Science Bachelor program.
* Armando - Dev Lead
* Jay - Project Manager
* Tinisha - Developer

## Tech Stack
* Frontend: React 19, Vite, Mantine UI
* Backend: Supabase (PostgreSQL + Auth + REST API)
* Testing: Cypress
* Tooling: ESLint, modern ES modules

## Getting Started

### Prerequisites
* Node.js v14.18 or 16+ is required
* npm v8+

### Installation
1. Clone the repository
    ```
    git clone https://github.com/<your-username>/AJT_Capstone_Project
    ```

2. Navigate to the project directory
    ```
    cd AJT_Capstone_Project
    ```

3. Install dependencies
    ```
    npm install
    ```

4. Create a `.env` file in the project root with your Supabase credentials:
    ```
    VITE_SUPABASE_URL=<your-supabase-url>
    VITE_SUPABASE_ANON_KEY=<your-anon-key>
    ```
   (Contact a team member for the credentials)

5. Run the development server
    ```
    npm run dev
    ```
   The app will be running at http://localhost:5173

## Project Structure
```
src/
├── components/
│   ├── common/         # Shared UI components (Navbar, Button, etc.)
│   ├── product/        # Product-related components (ProductCard, ProductGrid)
│   └── cart/           # Cart-related components (CartSidebar, CartItem)
├── pages/              # Page components (Home, Cart, Checkout)
├── services/           # Supabase database functions
│   ├── auth.js         # Authentication (sign up, sign in, sign out)
│   ├── products.js     # Product queries
│   ├── cart.js         # Cart operations
│   └── orders.js       # Order/checkout operations
├── lib/
│   └── supabase.js     # Supabase client setup
└── assets/             # Images and static files

cypress/
├── e2e/                # End-to-end test files
├── fixtures/           # Test data
└── support/            # Test helpers and commands
```

## Testing
This project uses Cypress for end-to-end testing.

**Run tests with GUI:**
```
npm run test
```

**Run tests headlessly (CI):**
```
npm run test:ci
```

## Future Enhancements
* Payment integration (Stripe)
* Admin dashboard for managing inventory
* Pickup scheduling/notifications
* Deployment to production