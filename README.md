# E-Commerce Platform with Bitcoin Payments


A full-stack e-commerce platform built with Node.js, Express, PostgreSQL, and React, featuring Bitcoin payment integration.

## Features

- **User Authentication**: Register, login, and account management
- **Product Management**: CRUD operations for products (admin only)
- **Product Search & Pagination**: Browse products with search and pagination
- **Order System**: Create and manage orders
- **Bitcoin Payments**: Pay for orders using Bitcoin (testnet or mainnet)
- **Admin Dashboard**: Manage products, orders, and users
- **Responsive Design**: Built with Tailwind CSS for all device sizes

## Technologies

### Backend
- Node.js
- Express.js
- PostgreSQL (with Sequelize ORM)
- JWT Authentication
- BitcoinJS for cryptocurrency payments

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios for API calls
- React Hook Form for forms
- BitcoinJS for client-side crypto operations

## Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn
- Bitcoin testnet wallet (for development)

## Installation

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/KIRENGA-Remy/E_Commerce_Product_Management_System_with_Blockchain_Payments.git
   cd E_Commerce_Product_Management_System_with_Blockchain_Payments/backend


# Install dependencies:

npm install
Create a .env file in the backend directory with the following variables:

env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=4321
BITCOIN_NETWORK=testnet  # or mainnet for production
# Set up the database:

npx sequelize-cli db:create
npx sequelize-cli db:migrate
Start the server:

npm run dev

## Frontend Setup
Navigate to the frontend directory:

cd ../frontend
# Install dependencies:

npm install
Create a .env file in the frontend directory:

env
REACT_APP_API_URL=http://localhost:4321
REACT_APP_BITCOIN_NETWORK=testnet
Start the development server:

npm start
API Endpoints
Authentication
POST /api/auth/register - Register a new user

POST /api/auth/login - Login with existing credentials

# Products
GET /api/products - Get all products (with pagination)

GET /api/products/:id - Get a single product

POST /api/products - Create a new product (admin only)

PUT /api/products/:id - Update a product (admin only)

DELETE /api/products/:id - Delete a product (admin only)

# Orders
POST /api/orders - Create a new order

GET /api/orders/:id - Get order details

POST /api/orders/:id/pay - Process Bitcoin payment

GET /api/orders/user/:userId - Get user's orders

# Project Structure
E_Commerce_Product_Management_System_with_Blockchain_Payments/
├── backend/                  # Node.js/Express backend
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── app.js               # Main application file
│   ├── server.js            # Server entry point
│   └── package.json
├── frontend/                # React frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── api/             # API service calls
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── styles/          # Global styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # App entry point
│   │   └── routes.js        # Application routes
│   └── package.json
└── README.md

# Bitcoin Payment Flow
1. User creates an order
2. System generates a unique Bitcoin address for the order
3. User sends the exact Bitcoin amount to the provided address
4. System periodically checks for payment confirmation
5. Once payment is confirmed, order status is updated

# Testing
To run tests for the backend:

cd backend
npm test

# Deployment
Backend Deployment

1. Set up a PostgreSQL database on your hosting provider
2. Configure environment variables in production
3. Use PM2 or similar process manager to run the Node server

# Frontend Deployment
1. Build the React app:

cd frontend
npm run build

2. Deploy the build folder to your hosting provider (Netlify, Vercel, etc.)

# Environment Variables
See .env.example files in both backend and frontend directories for required variables.

# Contributing
1. Fork the project
2. Create your feature branch (git checkout -b feature/ AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

# License
Distributed under the MIT License. See LICENSE for more information.

# Contact
Your Name - gitoliremy@gmail.com

Project Link: https://github.com/KIRENGA-Remy/E_Commerce_Product_Management_System_with_Blockchain_Payments.git

Happy coding!