/**
 * Assignment #2 - Write a function that takes a jwt as input and returns 
 * true if the jwt can be DECODED (not verified). Return false otherwise
 */

const jwt = require("jsonwebtoken");

function decodeJwt(token) {
    // decode the jwt token
    const decoded = jwt.decode(token);

    if(decoded) {
        return true;
    } else {
        return false;
    }
}

const ans = decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJoYXJhdEBnbWFpbC5jb20ifQ.1");

console.log(ans);
