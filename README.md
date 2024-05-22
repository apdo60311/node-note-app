# Notes Application

This is a full-stack notes application built with Node.js, Express, MongoDB, and React. The application allows users to register, log in, create, view, edit, and delete notes. It also includes password reset functionality.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Features

- User authentication (registration and login)
- Create, read, update, and delete notes
- Password change and reset functionality
- Responsive frontend built with React [not implemented yet]
- Backend built with Node.js and Express

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/apdo60311/node-notes-app.git
    cd node-notes-app
    ```

2. **Set up the backend:**

    ```bash
    cd backend
    npm install
    ```

3. **Set up the frontend:**

    ```bash
    cd frontend
    npm install
    ```

4. **Configure environment variables:**

    Create a `.env` file in the `backend` directory and add your MongoDB connection string and email credentials (for password reset functionality).

    ```.
    MONGO_URI=url to connect to mongodb
    JWT_SECRET= sevret value for jwt
    NODE_ENV=development
    USER_EMAIL=email to send reset password email
    USER_PASSWORD=app password for this email
    ```

5. **Run the backend server:**

    ```bash
    cd backend
    npm run dev
    ```

6. **Run the frontend:**

    ```bash
    cd client
    npm run start
    ```

The backend server will be running on `http://localhost:8000` and the frontend on `http://localhost:3000`.

## Environment Variables

The application uses environment variables to store sensitive information. Create a `.env` file in the `backend` directory with the following variables:

note to get USER_PASSWORD for your email follow this [link](https://support.google.com/mail/answer/185833?hl=en)

## Usage

After setting up and running the application, you can perform the following actions:

- **Register** a new user
- **Login** with existing user credentials
- **Create** new notes
- **View** all your notes
- **Edit** and **delete** notes
- **Reset password** if you forget your password

## API Endpoints

The following API endpoints are available in the application:

- **Auth Routes**
  - `POST /auth/register`: Register a new user
  - `POST /auth/login`: Login with user credentials

- **User Routes**
  - `GET /user/profile`: Get user profile (requires authentication)
  - `PUT /user/profile`: Update user profile (requires authentication)
  - `PUT /user/changePassword`: change user password (requires authentication)
  - `DELETE /user/delete`: delete user account (requires authentication)
  - `POST /user/resetPassword`: Request a password reset
  - `PUT /user/resetPassword/:token`: Reset password with token

- **Notes Routes**
  - `GET /notes/list`: Get all notes (requires authentication)
  - `POST /notes/create`: Create a new note (requires authentication)
  - `GET /notes/get/:id`: Get a single note by ID (requires authentication)
  - `PUT /notes/update/:id`: Update a note by ID (requires authentication)
  - `DELETE /notes/delete/:id`: Delete a note by ID (requires authentication)

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Nodemailer
  - dotenv

- **Frontend:**
  - React
  - Axios
  - React Router

## Project Structure

The project is structured as follows:

### Backend (`/backend`)

- [adapters/](.\backend\adapters)
  - [controllers/](.\backend\adapters\controllers) containes logic for handling api requests
    - [authController.js](.\backend\adapters\controllers\authController.js)
    - [noteController.js](.\backend\adapters\controllers\noteController.js)
    - [userController.js](.\backend\adapters\controllers\userController.js)
  - [repositories/](.\backend\adapters\repositories)
  - [mailer.mjs](.\backend\adapters\mailer.mjs)
- [db/](.\backend\db) containes mongodb configurations
  - [connectDB.js](.\backend\db\connectDB.js)
- [Entities/](.\backend\Entities)
  - [Note.js](.\backend\Entities\Note.js)
- [models/](.\backend\models) containes Mongoose models
  - [note.js](.\backend\models\note.js)
  - [user.js](.\backend\models\user.js)

- [Response/](.\backend\Response)
  - [Response.js](.\backend\Response\Response.js)
- [routers/](.\backend\routers)
  - [authRouter.js](.\backend\routers\authRouter.js)
  - [notesRouter.js](.\backend\routers\notesRouter.js)
  - [userRouter.js](.\backend\routers\userRouter.js)
- [.env](.\backend\.env) containes environment variables for sensitive information
- [index.js](.\backend\index.js)
- [package-lock.json](.\backend\package-lock.json)
- [package.json](.\backend\package.json)

### Frontend (`/frontend`)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
