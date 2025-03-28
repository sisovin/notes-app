const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Function for user signup
async function signup(username, password) {
    const hashedPassword = await argon2.hash(password);
    // Save the user to the database (this is a placeholder, implement actual database logic)
    const user = { id: Date.now(), username, password: hashedPassword };
    return user;
}

// Function for user login
async function login(username, password) {
    // Retrieve the user from the database (this is a placeholder, implement actual database logic)
    const user = { id: 1, username, password: 'hashed_password_from_db' };

    if (await argon2.verify(user.password, password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } else {
        throw new Error('Invalid username or password');
    }
}

// Function for handling user authentication
function authenticate(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

// Function for storing tokens in localStorage
function storeToken(token) {
    localStorage.setItem('authToken', token);
}

// Function for soft-deleting users
async function softDeleteUser(userId) {
    // Mark the user as deleted in the database (this is a placeholder, implement actual database logic)
    const user = { id: userId, deleted: true };
    return user;
}

module.exports = {
    signup,
    login,
    authenticate,
    storeToken,
    softDeleteUser
};
