# AJT Capstone Project  

## Table of Contents
* [Project Overview](#project-overview)
* [Team Members](#team-members)
* [Tech Stack](#teck-stack)
* [Getting started](#getting-started)
* [Folder Structure](#folder-strucutre)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Backend Setup](#backend-setup)
* [Frontend Setup](#frontend-setup)
* [API Overview](#api-overview)
* [Future Enhancements](#future-enhancements)

## Project Overview
This repository houses a prototype React/Vite e-commerce webapp for North Seattle College, designed to showcase and sell official apparel, accessories, and branded merchandise. Built as a multi-phase capstone project. 

This project includes:
* A React + Vite frontend
* An Express backend with full CRUD operations that mimics data persistence 
* JSON-based data storage for merchandise (prototype mode)
* A multi-phase structure for future expansion (login, payments, admin tools)

## Team Members
AJT is a diverse group of 3 students in their senior year of North Seattle College's Computer Science Bachelor program.
* Armando - Dev Lead
* Jay - Project Manager
* Tinisha - Developer

## Tech Stack
* Frontend: React 19, Vite
* Backend: Node.js, Express, CORS
* Storage: JSON file (prototype)
* Tooling: ESLint, modern ES modules

## Getting Started

### File Structure
```
AJT_Capstone_Project/
│
├── AJT-Capstone/                     # Main project folder (React + Vite + Express)
│   │
│   ├── public/                       # Static assets served by Vite
│   │
│   ├── src/                          # React frontend source code
│   │   ├── components/               # Reusable UI components
│   │   ├── pages/                    # Page-level components (Home, Shop, etc.)
│   │   ├── assets/                   # Images, icons, styles
│   │   └── main.jsx                  # Frontend entry point
│   │
│   ├── server/                       # Express backend (JSON-based prototype API)
│   │   ├── index.js                  # Full CRUD API for lists + tasks
│   │   └── data.json                 # Local JSON storage for backend data
│   │
│   ├── img/                          # Project images (logos, mockups, etc.)
│   │
│   ├── .github/                      # GitHub workflows, issue templates, etc.
│   │
│   ├── index.html                    # Root HTML template for Vite
│   ├── package.json                  # Frontend dependencies + scripts
│   ├── package-lock.json             # Dependency lockfile
│   ├── vite.config.js                # Vite configuration
│   ├── eslint.config.js              # ESLint configuration
│   ├── .gitignore                    # Git ignore rules
│   └── README.md                     # Project documentation
│
└── (root) README.md                  # Repo-level documentation (optional)

```

### Prerequisites
* Node.js v14.18 or 16+ is required
* npm v8+

### Installation
1. Clone the repository
    * `git clone https://github.com/"your-username"/AJT_Capstone_Project`
    * Replace "your-username" with your github username

2. Navigate to the Project in your files
    * `cd "..."/AJT_Capstone_Project
    * Replace "..." with your filepath

2. Navigate to the project directory 
    * `cd AJT-Capstone`

### Backend Setup
1. Install Dependencies
    * `cd server` 
    * `npm install`

2. Start the backend server
    * `npm run start`
    * Server will start running at http://localhost:3000
    * You can test this by visiting http://localhost:3000/data

### Frontend Setup
1. Install Dependencies
    * `cd AJT-Capstone`
    * `npm install`

2. Run the frontend
    * `npm run dev`
    * Vite will start running at something like http://localhost:5173

## API Overview
The backend supports full CRUD operations for merchandise products, stored in `data.json`. These routes support browsing, adding, updating, and removing items from the NSC Swag Store catalog. 
* Products
    * **GET/products**: Retrieve all merchandise items (hoodies, shirts, accessories, etc).
    * **POST/products**: Create a new product entry. Used for adding new apparel or accessories to the store. 
    * **GET/products/:productId**: Retrieve a single product by ID
    * **PATCH/products/:productId**: Update part of a product (price, name, description, inventory)
    * **PUT/products/:productId**: Replace an entire product object.
    * **DELETE/products/:productId**: Remove a product from the catalog.
    * **POST/products/:productId/variants**: Add a new variant (size, color, etc).
    * **GET/products/:productId/variants**: Get all variants for a product.
    * **GET/products/:productId/variants/variantId**: Get a specific variant
    * **PATCH/products/:productId/variants/variantId**: Update a variant (inventory count).
    * **DELETE/products/:productId/variants/variantId**: Remove a variant

## Future Enhancements
* Payment integration
* Admin dashboard for managing inventory
* Secure login & user accounts
* Database migration (MongoDB, PostgreSQL, etc)