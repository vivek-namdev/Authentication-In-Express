/**
 * Assignment #1 - Write a function that takes in a username and password and returns
 * a JWT token with the username encoded. Should return null if the username is
 * not a valid email or if the password is less than 6 characters. Try using the zod library here
*/

// Import jwt and zod library
const jwt = require("jsonwebtoken");
const zod = require("zod");

const jwtPassword = "secret";

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

// function to sign the jwt token

function signJwt(username, password) {
    // validate the email and password 
    const usernameResponse = emailSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

     // if the email and password are not valid then return null
     if(!usernameResponse.success || !passwordResponse.success) {
        return null;
    }

    // if the email and password are valid then sign the jwt token
    const signature = jwt.sign({
        username,
    }, jwtPassword);

    return signature;
}
// call the signJwt function with the username and password
const ans = signJwt("viveknamdev@gmail.com", "1234567");

console.log(ans);
