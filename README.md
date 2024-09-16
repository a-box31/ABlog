# ABlog

## Overview
This is a blogging platform where users can create blogs, follow other users, and manage their profiles.

## Front-End Documentation

### Features:
1. **User Authentication**: Users can register, log in, and log out using forms on the website.
2. **Blog Search**: A search bar allows users to search for blog posts.
3. **Blog Post Creation**: Users can create, view, and update blog posts.
4. **Responsive Design**: The app is fully responsive and adapts to different screen sizes.
5. **Follower System**: Users can follow each other, and their followers are displayed on their profiles.

### Front-End Stack:
- **HTML/CSS**: Used for layout and styling.
- **JavaScript (Sass)**: Implements interactive and dynamic features.
- **Vite**: For bundling the project and optimizing it for deployment.

## Back-End API Documentation

### 1. **User API**

- **POST /api/register**
  - **Description**: Registers a new user.
  - **Request Body**:
    ```json
    {
      "username": "newuser",
      "email": "newuser@gmail.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **POST /api/login**
  - **Description**: Logs in an existing user.
  - **Request Body**:
    ```json
    {
      "email": "newuser@gmail.com",
      "password": "password123"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "Session Token"
    }
    ```

### 2. **Blog API**

- **GET /api/blogs**
  - **Description**: Retrieves all blogs.
  - **Response**:
    ```json
    [
      {
        "id": 1,
        "owner_id": 1,
        "title": "My First Blog",
        "media": "media1.jpg",
        "content": "This is my first blog",
        "updated_at": "2024-09-12T12:00:00Z"
      }
    ]
    ```

- **POST /api/blogs**
  - **Description**: Create a new blog post.
  - **Request Body**:
    ```json
    {
      "owner_id": 1,
      "title": "New Blog",
      "media": "image.jpg",
      "content": "Content of the blog."
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Blog created successfully."
    }
    ```

### 3. **Follower API**

- **POST /api/follow**
  - **Description**: Follow a user.
  - **Request Body**:
    ```json
    {
      "user_id": 1,
      "followed_id": 2
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User followed successfully."
    }
    ```

### 4. **Session API**

- **POST /api/session**
  - **Description**: Create a new session.
  - **Request Body**:
    ```json
    {
      "user_id": 1,
      "token": "Session Token"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Session created."
    }
    ```

## MySQL Database Structure

### 1. **Users Table**
| Column Name | Data Type      | Description                    |
|-------------|----------------|--------------------------------|
| id          | INT            | Primary key, auto-increment    |
| username    | VARCHAR(255)    | User's username                |
| password    | VARCHAR(255)    | User's password (hashed)       |
| email       | VARCHAR(255)    | User's email (unique)          |
| avatar      | VARCHAR(255)    | Path to avatar image           |
| bio         | TEXT           | User bio                       |

### 2. **Sessions Table**
| Column Name | Data Type      | Description                    |
|-------------|----------------|--------------------------------|
| id          | INT            | Primary key, auto-increment    |
| user_id     | INT            | Foreign key to `users.id`      |
| token       | VARCHAR(255)    | Unique session token           |

### 3. **Blogs Table**
| Column Name | Data Type      | Description                    |
|-------------|----------------|--------------------------------|
| id          | INT            | Primary key, auto-increment    |
| owner_id    | INT            | Foreign key to `users.id`      |
| title       | VARCHAR(255)    | Title of the blog              |
| media       | VARCHAR(255)    | Media associated with blog     |
| content     | TEXT           | Blog content                   |
| updated_at  | TIMESTAMP       | Last updated time              |

### 4. **Followers Table**
| Column Name | Data Type      | Description                    |
|-------------|----------------|--------------------------------|
| id          | INT            | Primary key, auto-increment    |
| user_id     | INT            | Foreign key to `users.id`      |
| followed_id | INT            | Foreign key to `users.id`      |

## Installation and Setup

To get the project up and running locally, follow these steps:

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo-url.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd backend
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Set up the MySQL database:
    - Create a new MySQL database.
    - Run the SQL script (`ABlogDB.session.sql`) to set up the database tables.
    
    Example of setting up the tables:
    ```sql
    CREATE DATABASE blogApp;
    USE blogApp;
    
    -- Create users table
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        avatar VARCHAR(255) DEFAULT 'default.png',
        bio TEXT
    );
    
    -- Create other tables as needed...
    ```

5. Set up environment variables:
    - Create a `.env` file in the backend root directory.
    - Add the following environment variables:
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_password
    DB_NAME=blogApp
    ```

6. Run the backend server:
    ```bash
    npm start
    ```

7. The backend server will be running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```

4. The frontend server will be running on `http://localhost:3000`.

Now, the app should be fully functional with both the backend and frontend running locally.
