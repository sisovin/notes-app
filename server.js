const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { signup, login, authenticate } = require('./auth');
const { getNotes, addNote, editNote, deleteNote } = require('./app');
const { setupDatabase } = require('./database');
const { setupRedisClient } = require('./redisClient');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware for JWT authentication
function jwtAuthMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
}

// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
}

// Routes for user authentication
app.post('/signup', async (req, res) => {
    try {
        const user = await signup(req.body.username, req.body.password);
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);
        res.status(200).send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Routes for notes CRUD operations
app.get('/notes', jwtAuthMiddleware, (req, res) => {
    const notes = getNotes(req.user.id);
    res.status(200).send(notes);
});

app.post('/notes', jwtAuthMiddleware, (req, res) => {
    const note = addNote(req.user.id, req.body.content);
    res.status(201).send(note);
});

app.put('/notes/:id', jwtAuthMiddleware, (req, res) => {
    const note = editNote(req.user.id, req.params.id, req.body.content);
    res.status(200).send(note);
});

app.delete('/notes/:id', jwtAuthMiddleware, (req, res) => {
    deleteNote(req.user.id, req.params.id);
    res.status(204).send();
});

app.use(errorHandler);

setupDatabase();
setupRedisClient();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
