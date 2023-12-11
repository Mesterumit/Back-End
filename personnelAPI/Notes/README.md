# Project Task Document: Personnel Management API with Mongoose

## Project Description

In this project, you will develop a personnel management system using Mongoose, which is an Object Data Modeling (ODM) library for MongoDB. The system will allow you to create, read, update, and delete personnel records. It includes two main models: `Department` and `Personnel`, and also provides user authentication with password hashing.

## Project Skeleton

Your project directory structure might look like this depending on your design:

```
project-root/
│
├── controllers/
│   ├── departmentController.js
│   ├── personnelController.js
│
├── middlewares/
│   ├── errorMiddleware.js
│
├── models/
│   ├── Department.js
│   ├── Personnel.js
│
├── routes/
│   ├── departmentRoutes.js
│   ├── personnelRoutes.js
│
├── config/
│   ├── dbConnection.js
│
├── app.js
├── package.json
├── .env
├── README.md
```

## ERD

<img src="../erdPersonnelAPI.png" >

## Tasks

### 1. Mongoose Models

Create Mongoose models for `Department` and `Personnel`. Define their schemas and validation rules.

#### 1.1. `Department` Model

- Define a schema for the `Department` model.
- Include a field for the department name, which is required and unique.
- Enable timestamps to track when the records were created and updated.

#### 1.2. `Personnel` Model

- Define a schema for the `Personnel` model.
- Include fields for department, username, password, first name, last name, phone, email, title, salary, description, isActive, isAdmin, isLead, and startedAt.
- Implement appropriate validation rules for these fields.
- Hash the password before saving it to the database using a pre-save middleware.
- Provide a method to check the entered password against the stored hashed password.

### 2. Express Application (API)

Create an Express.js application (or build upon an existing one) to create API endpoints for CRUD operations on `Department` and `Personnel` records. Set up routes, controllers, and handle API requests and responses.

### 3. Error Handling Middleware

Create error handling middleware to catch and handle errors within the Express application. Implement error responses for various scenarios, such as validation errors or database errors.

### 4. Logging Middleware

Implement a logging middleware to log relevant information about incoming requests and application activities. Use a logging library (e.g., Winston, Morgan) to manage logs.

### 5. Testing

Test your API endpoints using tools like Postman or Insomnia to ensure they function correctly. Test various scenarios, including creating, reading, updating, and deleting records.

### 6. Additional Features (Optional)

- Implement a front-end (e.g., React or HTML/CSS) to interact with your API.

## Additional Guides

- Use proper status codes and meaningful error messages in your API responses.
- Secure sensitive information, such as database connection strings and secret keys.
- Deploy your application to a hosting platform (e.g., Heroku, AWS) for public access.
- Document your API endpoints and usage for future reference.

By completing this project, you will gain hands-on experience in developing a personnel management system, including creating and using Mongoose models, implementing authentication, and managing error handling and logging. This project will help you build practical skills in developing a secure and efficient API.