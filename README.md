# User Authentication and Booking System

This is a Node.js-based backend project designed for a user management and booking platform. It includes features such as user registration, login, profile updates, booking services, and an admin interface for managing bookings. The project uses **Express.js**, **MongoDB**, and **JWT** for authentication and data handling.

---

## Features

- **User Authentication**: Secure login and signup with JWT-based session management.
- **Profile Management**: Update profile information and reset passwords.
- **Booking System**: Users can book services and view booking history.
- **Review System**: Users can leave reviews, comment on them, and interact with likes/dislikes.
- **Admin Panel**: Admin users can view bookings and respond to requests.
- **Security**: Includes middleware for token verification and CORS for secure API interaction.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or cloud instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (for package management)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gouravsharma730/CarServiceBackend.git
   cd CarServiceBackend
2. npm install
3. Configure environment variables:

Create a .env file in the root directory.

4.npm start
The server will run at http://localhost:4000.

## Project Structure
 ```bash
├── config/
│   └── db.js                # MongoDB connection setup
├── src/
│   ├── controller/          # Controllers for various functionalities
│   ├── middleware/          # Middleware for token verification
│   ├── models/              # MongoDB models
│   └── routes/              # API route definitions
├── static/                  # Directory for static files
├── .env                     # Environment variables (not tracked by Git)
├── .gitignore               # Ignored files
├── index.js                 # Entry point of the application
└── package.json             # Project metadata and dependencies
```

## API Routes

**1  AUTHENTICATION & USER MANAGEMENT**

**POST /signup**

Description: User registration.

Payload:
 ```bash
{
  "username": "string",
  "password": "string",
  "email": "string"
}
 ```

**POST /login**

Description: User login.
Payload:
 ```bash{
  "email": "string",
  "password": "string"
}
```
**POST /logout**

Description: Logs out the user (requires token).

**POST /profileUpdate**

Description: Updates user profile information.
Payload
 ```bash{
  "name": "string",
  "address": "string"
}
```
**POST /resetpassword**

Description: Resets the user password (requires token).
Payload
 ```bash{
  "currentPassword": "string",
  "newPassword": "string"
}
```
**POST /forgetPassword**

Description: Initiates password reset for forgotten passwords.
Payload
 ```bash{
  "email": "string"
}
```

**2 REVIEWS**

**POST /review**

Description: Submits a review (requires token).
Payload:
 ```bash{
  "serviceId": "string",
  "rating": "number",
  "comment": "string"
}
```
**GET /reviews**

Description: Fetches all reviews.

**POST /commentReview**

Description: Adds a comment to a review (requires token).
Payload:
 ```bash{
  "reviewId": "string",
  "comment": "string"
}
```
**POST /likeReview**

Description: Likes a review (requires token).
Payload:
 ```bash
{
  "reviewId": "string"
}
```
**POST /dislikeReview**

Description: Dislikes a review (requires token).
Payload:
 ```bash
{
  "reviewId": "string"
}
```
**3 BOOKING SYSTEM**

POST /newBooking

Description: Books a new service (requires token).
Payload:
 ```bash
{
  "serviceId": "string",
  "date": "string",
  "time": "string"
}
```
**GET /bookingHistory**

Description: Retrieves booking history for the user (requires token).

Middleware
verifyToken: Middleware that verifies the validity of a JWT.

Security
CORS: Configured to allow the frontend URL specified in .env.
JWT Authentication: Ensures secure access to protected routes.
