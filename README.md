# Event Platform API

REST API for an Event Registration Platform built with Node.js, Express, MongoDB, and Mongoose following a layered architecture.

## Project Overview

Event Platform API is designed to manage users and events through a secure, scalable, and maintainable backend architecture.

The application follows a layered architecture that separates request handling, business logic, data access, and persistence, making it easier to extend, maintain, and scale over time.

## Features

- User registration
- Secure password hashing with bcrypt
- User authentication with JWT
- HTTP Only authentication cookies
- Protected routes
- Secure logout
- MongoDB persistence with Mongoose
- Layered architecture (Route → Controller → Service → Repository → DAO → Model)
- Global error handling
- Email validation and normalization
- Duplicate user detection

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken
- cookie-parser
- dotenv
- JavaScript ES Modules

## Installation

Clone the repository:

```bash
git clone https://github.com/HSC2121/event-platform-api.git
cd event-platform-api
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root using `.env.example` as reference.

Example:

```env
PORT=8080
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/event_platform
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

## Running the Project

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Tests:

```bash
npm test
```

## Project Structure

```txt
src/
├── app.js
├── server.js
├── config/
├── routes/
├── controllers/
├── services/
├── repositories/
├── dao/
├── models/
├── middlewares/
├── utils/
│   ├── hash.js
│   └── jwt.js
```

## API Documentation

### Health Check

```http
GET /api/health
```

Returns the current server status.

---

### Get Events

```http
GET /api/events
```

Returns the list of registered events.

---

### User Registration

```http
POST /api/sessions/register
```

Request body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

Successful response:

```json
{
  "status": "success",
  "message": "User registered successfully",
  "payload": {
    "id": "...",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

---

### User Login

```http
POST /api/sessions/login
```

Request body:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

Successful response:

```json
{
  "status": "success",
  "message": "Login successful",
  "payload": {
    "id": "...",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

> On successful login, the server generates a JWT and stores it in an **HTTP Only cookie** named `currentUser`.

---

### Current User

```http
GET /api/sessions/current
```

Protected endpoint.

Returns:

```json
{
  "status": "success",
  "payload": {
    "id": "...",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

Returns **401 Unauthorized** if the authentication cookie is missing or the JWT is invalid or expired.

---

### Logout

```http
POST /api/sessions/logout
```

Successful response:

```json
{
  "status": "success",
  "message": "Logout successful"
}
```

This endpoint removes the authentication cookie.

## Authentication Flow

1. Register a new user.
2. Login using email and password.
3. The server validates the credentials.
4. A JWT is generated containing:

```json
{
  "id": "...",
  "email": "...",
  "role": "user"
}
```

5. The JWT is stored inside an HTTP Only cookie (`currentUser`).
6. Protected endpoints validate the cookie through the authentication middleware.
7. Logout clears the authentication cookie.

## Registration & Authentication Features

The application provides:

- Required field validation
- Email format validation
- Password minimum length validation
- Email normalization (trim + lowercase)
- Duplicate email verification
- Password hashing with bcrypt
- Secure password comparison
- MongoDB persistence with Mongoose
- JWT generation
- HTTP Only authentication cookies
- Protected routes using authentication middleware
- Secure logout
- Password exclusion from API responses
- Default user role assignment

## Architecture

The project follows a layered architecture:

```txt
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Repositories
   │
   ▼
DAO
   │
   ▼
Models
   │
   ▼
MongoDB
```

Authentication flow:

```txt
Login
   │
   ▼
JWT Generation
   │
   ▼
HTTP Only Cookie
   │
   ▼
Authentication Middleware
   │
   ▼
Protected Routes
```

This separation keeps business logic, request handling, authentication, and database operations independent, making the application easier to maintain, test, and scale.

## Roadmap

Current implementation includes:

- User registration
- Secure password hashing with bcrypt
- JWT authentication
- HTTP Only authentication cookies
- Protected routes
- Secure logout
- MongoDB integration
- Layered backend architecture

Upcoming features:

- Role-based authorization
- Event registration
- Capacity management
- Ticket generation
- Refresh tokens
- Password recovery
- Event management dashboard
