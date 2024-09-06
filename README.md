# Task Management Application - Backend

This is the backend of the Task Management Application built with **Node.js**, **Express.js**, and **MongoDB**. The backend provides a RESTful API for managing tasks, with features such as user authentication via **JWT**, CRUD operations on tasks, and secure route protection.

## Features
- **JWT Authentication**: Users can log in and access protected routes.
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Filtering and Sorting**: Based on task priority and due dates.
- **Task Completion Status**: Mark tasks as completed or pending.
- **Mongoose Integration**: MongoDB schema and interaction using **Mongoose**.
- **Input Validation**: Validate user input using **express-validator**.

## Technologies
- **Node.js** with **Express.js** for server-side logic.
- **MongoDB** as the database.
- **Mongoose** for MongoDB object modeling.
- **express-validator** for input validation.
- **JWT (JSON Web Token)** for secure authentication.
- **bcrypt.js** for password hashing.
- **dotenv** for environment variable management.

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or above)
- **MongoDB** (v4 or above)
- **npm** (v6 or above)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Anandkumar0187/Task-Manager-Backend.git
    cd Task_Manager_backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment variables**:
    Create a `.env` file in the root of the `backend` directory with the following content:
    ```bash
    PORT=8080

    ACCESS_TOKEN_SECERET=JaiShreeKrishna
    ACCESS_TOKEN_EXPIRY=1d
    ```

4. **Running the server**:
    - **Development mode**:
      ```bash
      npm run dev
      ```
