# AJT Capstone Project

## Table of Contents
* [Project Overview](#project-overview)
* [Team Members](#team-members)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Stripe Integration](#stripe-integration)
* [Testing](#testing)
* [Future Enhancements](#future-enhancements)

## Project Overview
This repository houses a prototype React/Vite e-commerce webapp, designed to showcase and sell apparel, accessories, and other merchandise. Built as a multi-phase capstone project.

This project includes:
* A React + Vite frontend with Mantine UI components
* Supabase backend (PostgreSQL database + authentication + REST API)
* Stripe payment processing (test mode)
* End-to-end testing with Cypress
* A multi-phase structure for future expansion (login, admin tools)

## Team Members
AJT is a diverse group of 3 students in their senior year of North Seattle College's Computer Science Bachelor program.
* Armando - Dev Lead
* Jay - Project Manager
* Tinisha - Developer

## Tech Stack
* Frontend: React 19, Vite, Mantine UI, React Router
* Backend: Supabase (PostgreSQL + Auth + REST API + Edge Functions)
* Payments: Stripe (test mode)
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

4. Create a `.env` file in the project root with your credentials:
    ```
    VITE_SUPABASE_URL=<your-supabase-url>
    VITE_SUPABASE_ANON_KEY=<your-anon-key>
    VITE_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
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
│   ├── common/         # Shared UI components (Navbar, SearchBar, CategoryFilter)
│   ├── product/        # Product-related components (ProductCard, ProductGrid, etc.)
│   └── cart/           # Cart-related components (CartSidebar, CartCard)
├── pages/              # Page components (Home, ProductView, Checkout, OrderConfirmation)
├── services/           # Supabase database functions
│   ├── auth.js         # Authentication (sign up, sign in, sign out)
│   ├── products.js     # Product queries
│   ├── cart.js         # Cart operations
│   └── orders.js       # Order/checkout operations
├── lib/
│   └── supabase.js     # Supabase client setup
└── assets/             # Images and static files

supabase/
└── functions/
    └── create-payment-intent/   # Stripe Edge Function for payment processing

cypress/
├── e2e/                # End-to-end test files
├── fixtures/           # Test data
└── support/            # Test helpers and commands
```

## Stripe Integration
This project uses Stripe in test mode for payment processing. 

### Prerequisite (skip if already done)
Run `npm install`, and ask teammate for up-to-date .env credentials. 

### How it works
1. User adds items to cart and clicks "Proceed to Checkout"
2. Checkout page calls a Supabase Edge Function (`create-payment-intent`)
3. Edge Function creates a Stripe PaymentIntent and returns a client secret
4. Frontend uses Stripe Elements to collect payment info
5. On success, cart is cleared and user sees confirmation page

### Testing payments
Select "card" as payment method, and use these test credentials:
* Card number: `4242 4242 4242 4242`
* Expiry: Any future date (e.g., `01/28`)
* CVC: Any 3 digits (e.g., `123`)
* ZIP: Any 5 digits (e.g., `12345`)

### Edge Function deployment (Optional)
The Edge Function is already deployed to Supabase. If you need to redeploy:
```
npx supabase login
npx supabase link --project-ref mcpkpxypguulgabahrog
npx supabase functions deploy create-payment-intent
```

## Testing
This project uses Cypress for end-to-end testing.

**Before Running tests**
```
npm install
npm run dev
```

**Run tests with GUI:**
```
npm run test
```

**Run tests headlessly (CI):**
```
npm run test:ci
```

## Future Enhancements
* Admin dashboard for managing inventory
* Pickup scheduling/notifications
* Deployment to production