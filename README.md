# Event Platform API

REST API for an Event Registration Platform built with Node.js, Express, MongoDB, and Mongoose following a layered architecture with Passport.js authentication.

---

## Project Overview

Event Platform API is designed to manage users and events through a secure, scalable, and maintainable backend architecture.

The application uses Passport.js to centralize authentication while JWT and HTTP Only cookies provide stateless authentication for protected routes.

---

## Features

- User registration
- Secure password hashing with bcrypt
- User authentication with Passport.js
- JWT authentication
- HTTP Only authentication cookies
- Protected routes
- Secure logout
- MongoDB persistence with Mongoose
- Layered architecture (Route → Controller → Service → Repository → DAO → Model)
- Passport authentication strategies
- Global error handling
- Email validation and normalization
- Duplicate user detection

---

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- Passport.js
- passport-local
- passport-jwt
- bcrypt
- jsonwebtoken
- cookie-parser
- dotenv
- JavaScript ES Modules

---

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

---

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

---

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

---

## Project Structure

```text
src/
├── app.js
├── server.js
├── config/
│   ├── env.config.js
│   └── passport.config.js
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

---

# API Documentation

## Health Check

```http
GET /api/health
```

Returns the current server status.

---

## Get Events

```http
GET /api/events
```

Returns the list of registered events.

---

## User Registration

```http
POST /api/sessions/register
```

Request body:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
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
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## User Login

```http
POST /api/sessions/login
```

Request body:

```json
{
  "email": "john@example.com",
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
    "email": "john@example.com",
    "role": "user"
  }
}
```

A successful login generates a JWT that is stored inside an HTTP Only cookie named **currentUser**.

---

## Current User

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
    "email": "john@example.com",
    "role": "user"
  }
}
```

Returns **401 Unauthorized** if the authentication cookie is missing or the JWT is invalid or expired.

---

## Logout

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

Removes the authentication cookie.

---

# Passport Strategies

Authentication is centralized using Passport.js.

## register

Uses **passport-local**.

Responsibilities:

- Validate required fields
- Normalize email
- Validate email format
- Verify duplicate email
- Hash password using bcrypt
- Save user in MongoDB

---

## login

Uses **passport-local**.

Responsibilities:

- Validate credentials
- Compare hashed password
- Return generic invalid credentials message

After successful authentication, the controller:

- Generates the JWT
- Stores it in an HTTP Only cookie
- Returns the authenticated user

---

## current

Uses **passport-jwt**.

Responsibilities:

- Extract JWT from the **currentUser** cookie
- Verify the JWT signature
- Validate expiration
- Populate `req.user`
- Protect authenticated routes

---

# Authentication Flow

## Register

```text
POST /api/sessions/register
        │
        ▼
Passport Local Strategy
        │
        ▼
Validation
        │
        ▼
Hash Password
        │
        ▼
MongoDB
```

---

## Login

```text
POST /api/sessions/login
        │
        ▼
Passport Local Strategy
        │
        ▼
Credential Validation
        │
        ▼
Controller
        │
        ▼
JWT Generation
        │
        ▼
HTTP Only Cookie
```

---

## Current User

```text
GET /api/sessions/current
        │
        ▼
Passport JWT Strategy
        │
        ▼
JWT Validation
        │
        ▼
req.user
        │
        ▼
Controller Response
```

---

# Security Features

The application implements:

- Required field validation
- Email normalization
- Email format validation
- Duplicate email detection
- Password hashing with bcrypt
- Secure password comparison
- JWT authentication
- HTTP Only cookies
- Protected routes
- Passport.js authentication
- Generic authentication error messages
- Password never returned in responses
- Password never included inside JWT payload
- Default user role assignment

---

# Architecture

The project follows a layered architecture.

```text
Client
   │
   ▼
Routes
   │
   ▼
Passport Strategies
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

Authentication is centralized inside Passport strategies while controllers remain responsible for generating JWTs, setting cookies, and formatting responses.

---

# Roadmap

Current implementation includes:

- User registration
- Secure password hashing with bcrypt
- Passport.js authentication
- JWT authentication
- HTTP Only authentication cookies
- Protected routes
- Secure logout
- MongoDB integration
- Layered backend architecture

Future improvements:

- Role-based authorization
- Google OAuth
- GitHub OAuth
- Event management
- Event registrations
- Ticket generation
- Password recovery
- Refresh tokens

---

# Extensibility

Authentication is centralized through Passport.js, allowing future authentication providers such as Google OAuth, GitHub OAuth, or other Passport strategies to be added without modifying the application's routing layer.