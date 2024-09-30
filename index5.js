/**
 * Assignment #3 - Write a function that takes a jwt as input and returns
 * true if the jwt can be VERIFIED. Return false otherewise
 */

const jwt = require("jsonwebtoken");
const jwtPassword = "password";

function verifyJwt(token) {
    try {
        const verified = jwt.verify(token, jwtPassword);
        return true;
    } catch (error) {
        return false;
    }
}

const ans = verifyJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJoYXJhdEBnbWFpbC5jb20ifQ.1");

console.log(ans);