# PR Tracker API

## Setup
npm install
npm start

## Environment Variables
JWT_SECRET=your_secret_key

## Running Tests
npm test

## API Routes
POST /auth/register
POST /auth/login
GET /auth (admin only)

POST /prs
GET /prs/:userId
GET /prs/:userId/percentiles