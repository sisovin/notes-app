const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

// Function for caching user sessions
function cacheUserSession(userId, sessionData) {
    client.set(`user:${userId}:session`, JSON.stringify(sessionData), 'EX', 3600);
}

// Function for retrieving cached user sessions
function getUserSession(userId) {
    return new Promise((resolve, reject) => {
        client.get(`user:${userId}:session`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

// Function for caching notes
function cacheNotes(userId, notes) {
    client.set(`user:${userId}:notes`, JSON.stringify(notes), 'EX', 3600);
}

// Function for retrieving cached notes
function getCachedNotes(userId) {
    return new Promise((resolve, reject) => {
        client.get(`user:${userId}:notes`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

module.exports = {
    cacheUserSession,
    getUserSession,
    cacheNotes,
    getCachedNotes
};
