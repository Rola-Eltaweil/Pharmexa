# Pharmexa — Pharmaceutical Website

Pharmexa is a pharmaceutical manufacturing website built with React, Tailwind CSS, Node.js, Express, and MongoDB.

The project includes a public pharmaceutical website and an internal dashboard for managing products through CRUD operations.

## Project Structure

```text
Pharmexa/
│
├── pharma-website/    # Frontend
│
├── server/            # Backend
│
└── README.md
```

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
- CORS
- Dotenv

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

- Products are retrieved from the backend API.

### Admin Dashboard

The project includes an internal dashboard for product management.

The dashboard supports full CRUD operations:

- Create Product
- View Products
- Edit Product
- Delete Product

## Dashboard Access

After running the frontend locally, open:

```text
http://localhost:5173/dashboard
```

The CRUD operations can be found under:

```text
Dashboard → Products
```

The **Products** section in the dashboard is where products can be added, viewed, edited, and deleted.

## Environment Variables

The `.env` file is **not included in this repository** for security reasons.

The backend requires a MongoDB connection string.

Create a `.env` file inside the `server` folder:

```env
DATABASE_CONNECTION=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your own MongoDB connection string.

## Installation

### 1. Frontend

Open the frontend folder:

```bash
cd pharma-website
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

### 2. Backend

Open another terminal and go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the `.env` file and add your MongoDB connection string.

Then start the server:

```bash
npm run dev
```

## Using the CRUD Dashboard

1. Start the backend server.
2. Start the frontend.
3. Open:

```text
http://localhost:5173/dashboard
```

4. Select **Products** from the dashboard navigation.
5. From there, you can:

   - Add a new product
   - View all products
   - Edit an existing product
   - Delete a product

## Important

The MongoDB connection is not included in this repository.

The `.env` file has been intentionally excluded to prevent exposing database credentials.

The project must be configured with a valid MongoDB connection before the backend and CRUD functionality can be used.

## API Endpoints

The product CRUD API is available under:

```text
/api/admin/dashboard
```

### Create Product

```text
POST /api/admin/dashboard/addProduct
```

### Get All Products

```text
GET /api/admin/dashboard/products
```

### Get One Product

```text
GET /api/admin/dashboard/oneProduct/:id
```

### Update Product

```text
PUT /api/admin/dashboard/editProduct/:id
```

### Delete Product

```text
DELETE /api/admin/dashboard/deleteProduct/:id
```

## Notes

This project was developed as part of a frontend/backend internship task focusing on building a functional pharmaceutical website and implementing a backend-connected CRUD system for product management.
