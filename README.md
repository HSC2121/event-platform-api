# Event Platform API

REST API for an Event Registration Platform built with Node.js, Express, MongoDB and Mongoose following a layered architecture.

## Project Overview

Event Platform API is designed to manage users and events through a secure, scalable, and maintainable backend architecture.

The application follows a layered architecture that separates request handling, business logic, data access, and persistence, making it easier to extend and maintain over time.

## Features

* User registration
* Secure password hashing with bcrypt
* MongoDB persistence with Mongoose
* Layered architecture (Route → Controller → Service → Repository → DAO → Model)
* Global error handling
* Email validation and normalization
* Duplicate user detection

## Technologies

* Node.js
* Express
* MongoDB
* Mongoose
* bcrypt
* dotenv
* JavaScript ES Modules

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
└── utils/
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

## Registration Features

The registration endpoint performs:

* Required field validation
* Email format validation
* Password minimum length validation
* Email normalization (trim + lowercase)
* Duplicate email verification
* Password hashing using bcrypt
* MongoDB persistence with Mongoose
* Password exclusion from API responses
* Default user role assignment

## Architecture

The project follows a layered architecture:

```txt
Route
↓
Controller
↓
Service
↓
Repository
↓
DAO
↓
Model
↓
MongoDB
```

This separation keeps business logic, request handling, and database operations independent, making the application easier to maintain, test, and scale.

## Roadmap

Current implementation includes:

* User registration
* Secure password hashing
* MongoDB integration
* Event endpoints
* Layered backend architecture

Upcoming features:

* User authentication (Login)
* JWT authentication
* Current user endpoint
* Role-based authorization
* Event registration
* Capacity management
* Ticket generation
