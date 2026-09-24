# Pharmexa — Pharmaceutical Website

Pharmexa is a pharmaceutical manufacturing website built with **React, Tailwind CSS, Node.js, Express, and MongoDB**.

The project includes a public pharmaceutical website and an internal admin dashboard for managing pharmaceutical products through full CRUD operations.

---

## Project Structure

```text
Pharmexa/

├── pharma-website/        # Frontend
├── server/                # Backend
└── README.md
```

---

## Technologies

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Redux Toolkit
- Axios
- Lucide React
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Cookie Parser
- CORS
- Dotenv

---

## Features

### Public Website

The public website includes:

- Home page
- Products page
- Product search
- Product filtering by:

  - Product Type
  - Form
  - Active Substance

- Products retrieved from the backend API
- User registration
- User login
- User authentication using JWT

---

## Admin Dashboard

The project includes an internal dashboard for product management.

The dashboard supports full CRUD operations:

- Create Product
- View Products
- Edit Product
- Delete Product

Access to the dashboard is restricted to users with the `admin` role.

---

## Authentication & Authorization

The project uses **JWT (JSON Web Tokens)** for user authentication and role-based authorization.

After a successful login:

1. The backend verifies the user's email and password.
2. A JWT is generated.
3. The JWT contains the authenticated user's ID and role.
4. The JWT is stored in an `httpOnly` cookie.
5. Protected routes verify the JWT before allowing access.
6. Admin routes additionally check that the user's role is `admin`.

Passwords are securely hashed using **Bcrypt** before being stored in the database.

---

## Admin Demo Account

A demo administrator account is provided for evaluation purposes.

```text
Email:    rola2002el@gmail.com
Password: Rola1234
Role:     admin
```

Use these credentials to log in and test the admin dashboard.

### Dashboard

After logging in, open:

```text
http://localhost:5173/dashboard
```

Then navigate to:

```text
Dashboard → Products
```

From the Products section, you can test:

- Adding a product
- Viewing products
- Editing a product
- Deleting a product

---

## Environment Variables

The `.env` file is **not included in this repository** for security reasons.

The backend requires both a MongoDB connection string and a JWT secret key.

Create a `.env` file inside the `server` folder:

```env
DATABASE_CONNECTION=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

Replace:

- `your_mongodb_connection_string` with a valid MongoDB connection string.
- `your_jwt_secret_key` with a secure secret key used to sign JWT tokens.

### Important

The actual MongoDB connection string and JWT secret are intentionally excluded from the repository.

The `.env` file should not be committed to GitHub.

---

# Installation

## 1. Clone the Repository

Clone the project and open the project directory.

```bash
git clone <repository-url>
cd Pharmexa
```

---

## 2. Frontend Setup

Open the frontend folder:

```bash
cd pharma-website
```

Install the dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 3. Backend Setup

Open another terminal and go to the server folder:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
DATABASE_CONNECTION=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

# Using the Admin Dashboard

To test the complete CRUD functionality:

### Step 1 — Start the Backend

```bash
cd server
npm run dev
```

### Step 2 — Start the Frontend

```bash
cd pharma-website
npm run dev
```

### Step 3 — Login

Open the login page and use the demo admin account:

```text
Email:    rola2002el@gmail.com
Password: Rola1234
```

### Step 4 — Open the Dashboard

Go to:

```text
http://localhost:5173/dashboard
```

### Step 5 — Open Products

Navigate to:

```text
Dashboard → Products
```

You can now test the complete product management system.

---

# Product CRUD Operations

The admin dashboard provides the following operations:

### Create Product

Administrators can add a new pharmaceutical product through the dashboard.

### View Products

Administrators can view all products stored in the MongoDB database.

### Edit Product

Administrators can update the information of an existing product.

### Delete Product

Administrators can delete an existing product.

---

# API Endpoints

The product CRUD API is available under:

```text
/api/admin/dashboard
```

## Create Product

```http
POST /api/admin/dashboard/addProduct
```

Creates a new product.

---

## Get All Products

```http
GET /api/admin/dashboard/products
```

Returns all products.

---

## Get One Product

```http
GET /api/admin/dashboard/oneProduct/:id
```

Returns a specific product by its ID.

---

## Update Product

```http
PUT /api/admin/dashboard/editProduct/:id
```

Updates an existing product.

---

## Delete Product

```http
DELETE /api/admin/dashboard/deleteProduct/:id
```

Deletes an existing product.

---

# Authentication API

## Register

```http
POST /api/register
```

Creates a new user account.

Newly registered users receive the default `user` role.

---

## Login

```http
POST /api/login
```

Authenticates the user and creates a JWT authentication cookie.

---

## Get User Details

```http
GET /api/userDetails
```

Returns the authenticated user's details.

This endpoint requires authentication.

---

## Logout

```http
POST /api/logout
```

Logs the user out and clears the authentication cookie.

---

# Role-Based Access

The application uses two user roles:

```text
user
admin
```

### User

A regular user can:

- Register
- Login
- Access the public website
- Browse products

### Admin

An administrator can additionally:

- Access the Admin Dashboard
- Create products
- View products
- Edit products
- Delete products

The admin role is verified on the backend to protect the CRUD API endpoints.

---

# Security

The project implements several security measures:

- Passwords are hashed using Bcrypt.
- Authentication is handled using JWT.
- JWT tokens are stored in `httpOnly` cookies.
- Admin routes are protected with role-based authorization.
- Database credentials are stored in environment variables.
- JWT secrets are stored in environment variables.
- The `.env` file is excluded from the repository.
- Regular users cannot assign themselves the `admin` role during registration.

---

# Important Notes

The MongoDB connection and JWT secret are **not included in this repository**.

The `.env` file has intentionally been excluded to prevent exposing:

- MongoDB database credentials
- JWT secret key

A valid MongoDB connection and JWT secret must be configured before running the backend.

The admin credentials provided in this README are for **demo and evaluation purposes**.

---

# Project URLs

### Frontend

```text
http://localhost:5173
```

### Admin Dashboard

```text
http://localhost:5173/dashboard
```

### Backend

```text
http://localhost:5000
```

---

# Internship Task

This project was developed as part of a **frontend/backend internship task**.

The project focuses on building a functional pharmaceutical website using React and implementing a backend-connected product management system using Node.js, Express, and MongoDB.

The project demonstrates:

- React frontend development
- Responsive UI development with Tailwind CSS
- React Router navigation
- Redux state management
- REST API integration
- MongoDB database integration
- User authentication
- JWT-based authorization
- Role-based access control
- Secure password hashing
- Full CRUD operations
- Admin dashboard development

---

## Demo Admin Credentials

```text
Email:    rola2002el@gmail.com
Password: Rola1234
Role:     admin
```

Use the credentials above to access the dashboard and test the product CRUD functionality.

//task 7

## Customer Service Dashboard

The project also includes a dedicated **Customer Service Dashboard** for managing customer requests and inquiries.

### Customer Service Demo Account

A demo customer service account is provided for evaluation purposes.

```text
Email:    sallyService@gmail.com
Password: passwordSally1234
Role:     service
```

You can use these credentials to log in and access the Customer Service Dashboard.

### How to Access the Customer Service Dashboard

After logging in with the customer service account:

1. Open the website.
2. Use the user dropdown menu in the **Navbar**.
3. A **Customer Service** option will appear for users with the `service` role.
4. Click **Customer Service** to access the dashboard.

The dashboard is protected and is only accessible to users with the `service` role.

### Customer Request Management

The Customer Service Dashboard allows the service team to manage customer requests submitted through the website.

The implemented functionality includes:

- View all customer requests.
- View detailed information for each request.
- Search requests by:

  - Customer name
  - Email
  - Company name
  - Request type
  - Subject

- Sort requests by:

  - Oldest first
  - Newest first

- View request status.
- Update request status.
- Delete requests.
- Display the request submission date.
- View the complete request message and customer information.

### Request Status

Each customer request has one of the following statuses:

```text
Pending
In Progress
Resolved
```

New requests are automatically created with the `Pending` status.

The Customer Service team can update the status directly from the dashboard.

### Customer Request Information

Each request contains information such as:

- Customer name
- Email
- Company name
- Request type
- Subject
- Message
- Status
- Submission date

The customer request data is stored in **MongoDB** and retrieved through the backend API.

### Customer Request API

The Customer Service functionality is handled through the following API routes:

```text
POST   /api/customerService/contact
GET    /api/customerService/contacts
GET    /api/customerService/contact/:id
PUT    /api/customerService/contact/:id/status
DELETE /api/customerService/contact/:id
```

The customer can submit a request through the website, while the Customer Service team can view and manage the submitted requests from the dashboard.

### Additional Improvements

The Customer Service Dashboard is already functional, but additional features can be added if needed, such as advanced filtering, pagination, request categories, or additional request-management functionality.
