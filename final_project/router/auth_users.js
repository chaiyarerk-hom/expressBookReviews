const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ username:"my_username", password:"my_password" }];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return false;
        }
    }
    return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    for (var i = 0; i < users.length; i++) {
        if ((users[i].username === username) && (users[i].password === password)) {
            return true;
        } else {
            return false;
        }
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
    function createToken(payload) {
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        return token;
    }

    if (authenticatedUser(username,password)) {
        const user = users.find(user => user.username === username);
        const token = createToken({ username: user.username });
        return res.status(200).json({message: "Successfully registered", token: token});
    } else {
        return res.status(401).json({message: "Username or password is invalid"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
