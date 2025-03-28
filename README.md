# Notes App

## Setup and Running the App

1. Clone the repository:
    ```sh
    git clone https://github.com/githubnext/workspace-blank.git
    cd workspace-blank
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up the SQLite database:
    ```sh
    node database.js
    ```

4. Start the server:
    ```sh
    node server.js
    ```

5. Open `index.html` in your browser to use the app.

## API Documentation

### User Authentication

#### Signup
- **Endpoint:** `/signup`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "id": "number",
        "username": "string",
        "password": "string"
    }
    ```

#### Login
- **Endpoint:** `/login`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
- **Response:**
    ```json
    {
        "token": "string"
    }
    ```

### Notes CRUD Operations

#### Get Notes
- **Endpoint:** `/notes`
- **Method:** `GET`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response:**
    ```json
    [
        {
            "id": "number",
            "content": "string"
        }
    ]
    ```

#### Add Note
- **Endpoint:** `/notes`
- **Method:** `POST`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Request Body:**
    ```json
    {
        "content": "string"
    }
    ```
- **Response:**
    ```json
    {
        "id": "number",
        "content": "string"
    }
    ```

#### Edit Note
- **Endpoint:** `/notes/:id`
- **Method:** `PUT`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Request Body:**
    ```json
    {
        "content": "string"
    }
    ```
- **Response:**
    ```json
    {
        "id": "number",
        "content": "string"
    }
    ```

#### Delete Note
- **Endpoint:** `/notes/:id`
- **Method:** `DELETE`
- **Headers:**
    ```json
    {
        "Authorization": "Bearer <token>"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Note deleted successfully"
    }
    ```

## Technologies Used

- **HTML**: 5
- **CSS**: 3
- **JavaScript**: ES6
- **Node.js**: 14.x
- **Express**: 4.x
- **JWT**: 8.x
- **Argon2**: 0.27.x
- **SQLite**: 5.x
- **Redis**: 3.x
