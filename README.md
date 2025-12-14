# PR Tracker API

A fitness Personal Record (PR) tracking API built with Node.js, Express, and Sequelize. Users can track exercise PRs, view percentiles, and manage profiles. The API supports JWT authentication, role-based access, and is deployed to Render.

---

## Table of Contents
1. [Setup](#setup)
2. [Environment Variables](#environment-variables)
3. [Running the Server](#running-the-server)
4. [Running Tests](#running-tests)
5. [API Routes](#api-routes)
6. [Authentication & Roles](#authentication--roles)
7. [Deployment](#deployment)
8. [Postman Collection](#postman-collection)
9. [Database Models](#database-models)

---

## Setup
Clone the repository and install dependencies:

```bash
git clone <YOUR_REPO_URL>
cd backenddev-finalassignment
npm install
Environment Variables
Create a .env file in the root:

env
Copy code
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=3000
Running the Server
Start the server locally:

bash
Copy code
npm start
Server runs on http://localhost:3000 by default.

Running Tests
Run all tests with Jest:

bash
Copy code
npm test
Tests cover authentication, role-based access, and PR endpoints.

API Routes
Authentication
Method	Route	Description	Access
POST	/auth/register	Register a new user	Public
POST	/auth/login	Login and receive JWT token	Public
GET	/auth	List all users	Admin
GET	/auth/profile	View current user profile	Authenticated

Request Example (Register):

json
Copy code
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male",
  "weight_class": "70kg",
  "role": "user"
}
Request Example (Login):

json
Copy code
POST /auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
PR Endpoints
Method	Route	Description	Access
POST	/prs	Create a new PR	Authenticated
GET	/prs/:userId	Get PRs for a specific user	Authenticated
GET	/prs/:userId/percentiles	Get PR percentiles (dummy data)	Authenticated

Request Example (Create PR):

json
Copy code
POST /prs
Headers:
  Authorization: Bearer <JWT_TOKEN>

Body:
{
  "exercise_id": 1,
  "weight": 100,
  "reps": 5
}
Exercises
Method	Route	Description	Access
GET	/exercises	List all exercises	Public

Authentication & Roles
JWT tokens protect routes.

Two roles:

user: Can manage own PRs and profile.

admin: Can access /auth endpoint and manage all users.

Include Authorization: Bearer <JWT_TOKEN> header for protected routes.

Deployment
The API is deployed on Render:

Primary URL: https://task-api-ivvk.onrender.com

Postman Collection
Includes all endpoints.

Demonstrates registration, login, PR creation, fetching PRs, and admin-only routes.

Contains example requests with JWT authentication headers.

Database Models
User
user_id (PK)

name

email (unique)

password_hash

gender

weight_class

role (user or admin)

PR
pr_id (PK)

user_id (FK)

exercise_id (FK)

weight

reps

date_recorded

percentile_general

percentile_lifters

Exercise
exercise_id (PK)

name

category

units (weight or reps)