const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "viveknamdev25";
const app = express();
app.use(express.json());

const users = [];

app.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You have signed up",
    })
})

app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for(let i=0; i<users.length; i++) {
        if(users[i].username === username && users[i].password === password) {
            foundUser = users[i];
        }
    }

    if(!foundUser) {
        res.json({
            message: "Credentials incorrect"
        })
        return
    } else {
        const token = jwt.sign({
            username
        }, JWT_SECRET)

        res.json({
            token: token
        })
    }
})

function auth(req, res, next) {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if the token is provided
    if (!token) {
        return res.json({
            message: "Token is missing!",
        });
    }

    // Handle the error if the token is invalid
    try {
        // Verify the token using the secret key
        const decodedData = jwt.verify(token, JWT_SECRET);

        // Attach the username to the request object
        req.username = decodedData.username;
        next();
    } catch (error) {
        // Send an error message if the token is invalid
        res.json({
            message: "Invalid token!",
        });
    }
}

app.get('/me', auth, function(req, res) {
    const token = req.headers.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData.username) {
        let foundUser = null;

        for(let i=0; i<users.length; i++) {
            if(users[i].username === decodedData.username) {
                foundUser = users[i];
            }
        }

        res.json({
            username: foundUser.username,
            password: foundUser.username
        })
    }
})

app.listen(3000);