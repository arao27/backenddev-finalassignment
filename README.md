# PR Tracker API - MVP

## Overview
The PR Tracker API is a backend application for tracking personal records (PRs) in weightlifting. Users can log lifts and compare them to benchmark datasets for percentile rankings (general population and active lifters).  

This MVP demonstrates:
- CRUD operations for Users and PRs  
- JWT-based authentication  
- Role-based access control (User/Admin)  
- Percentile calculations  

---

## Setup Instructions

1. Clone the repo and navigate into it:
‘’’bash
git clone <>
cd backenddev-finalassignment

Utilize these commands in a terminal
npm install
npm run seed
npm start

Run these in postman:

Method
URL
Auth
Description
POST
/users/register
No
Register a new user
POST
/users/login
No
Login and receive JWT
GET
/exercises
Optional
List exercises
POST
/prs
Yes
Create a new PR
GET
/prs/:user_id
Yes
Retrieve a user’s PRs
GET
/prs/:user_id/percentiles
Yes
View percentile rankings
PUT
/prs/:pr_id
Yes
Update a PR
DELETE
/prs/:pr_id
Yes
Delete a PR