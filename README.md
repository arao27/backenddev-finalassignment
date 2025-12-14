https://task-api-ivvk.onrender.com

# PR Tracker API

A RESTful API for tracking personal records (PRs) in various exercises, with user authentication, role-based authorization, and percentile calculations.

---

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Users (Admin Only)](#users-admin-only)
  - [PRs](#prs)
  - [Exercises](#exercises)
- [Data Models](#data-models)
- [Postman Collection](#postman-collection)
- [Deployment](#deployment)

---

## setup
1. Clone the repository:
```bash
git clone <your-repo-url>
cd backenddev-finalassignment```

2. Install dependencies:
```npm install```

3. Start the server:
```npm start```

## environment-variables
```Create a .env file in the root directory with the following variables:

JWT_SECRET=your_secret_key
DATABASE_URL=sqlite://./database.sqlite


JWT_SECRET: Secret key for signing JWT tokens.

DATABASE_URL: URL to your database (SQLite for local development).```

## running-tests
```Create a .env file in the root directory with the following variables:

JWT_SECRET=your_secret_key
DATABASE_URL=sqlite://./database.sqlite


JWT_SECRET: Secret key for signing JWT tokens.

DATABASE_URL: URL to your database (SQLite for local development).```

## api-endpoints
```Authentication

POST /auth/register
Register a new user.
Required fields: name, email, password, gender, weight_class
Optional: role (user by default)

POST /auth/login
Log in an existing user. Returns a JWT token.

GET /auth/profile
Returns the authenticated user's profile. Requires Bearer token.

Users (Admin Only)

GET /auth/
Get all users. Requires admin role.

PUT /auth/:user_id
Update a user. Requires admin role.

DELETE /auth/:user_id
Delete a user. Requires admin role.

PRs

POST /prs/
Create a new personal record. Requires authentication.
Body: exercise_id, weight, reps

GET /prs/:userId
Get all PRs for a user. Requires authentication.

GET /prs/:userId/percentiles
Get PRs with percentile data. Requires authentication.

Exercises

GET /exercises/
Get all exercises.```

## authentication
```Register

POST /auth/register
Required fields: name, email, password, gender, weight_class
Optional: role (user by default)

Example request:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male",
  "weight_class": "70kg"
}

Login

POST /auth/login
Returns a JWT token.

Example response:

{
  "token": "<jwt-token>"
}

Profile

GET /auth/profile
Returns authenticated user info. Requires Bearer token.```

## users-admin-only
```GET /auth/ – Get all users. Requires admin role.

PUT /auth/:user_id – Update a user. Requires admin role.

DELETE /auth/:user_id – Delete a user. Requires admin role.```

## prs
```POST /prs/ – Create a new PR. Requires authentication.
Body: exercise_id, weight, reps

GET /prs/:userId – Get all PRs for a user. Requires authentication.

GET /prs/:userId/percentiles – Get PRs with percentile data. Requires authentication.```

## exercises
```GET /exercises/ – Returns all exercises.```

## data-models
```User

user_id (PK)

name

email

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

units (weight or reps)```

## postman-collection
```Include a Postman collection demonstrating:

Register/Login

JWT-protected routes

Admin-only routes

Creating and fetching PRs

Fetching exercises```

## deployment
```Deployed on Render: https://task-api-ivvk.onrender.com

Push changes to GitHub.

Render deploys the latest commit automatically.

Set environment variables on Render (JWT_SECRET and DATABASE_URL).```