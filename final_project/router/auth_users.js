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
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    function createToken(payload) {
        let accessToken = jwt.sign(payload, "access", { expiresIn: '1h' });
        return accessToken;
    }

    if (authenticatedUser(username, password)) {
        const user = users.find(user => user.username === username);
        const accessToken = createToken({ username: user.username });
        //Store access token and username in session
        req.session.authorization = { accessToken, username };
        return res.status(200).json({message: "Successfully registered", token: accessToken});
    } else {
        return res.status(401).json({message: "Username or password is invalid"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const user = req.session.authorization["username"];
  const review = req.query.review;

  console.log(req.session.authorization);

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[isbn].reviews[user] = review;
  return res.status(200).json({message: "Successfully added reviews", reviews: books[isbn].reviews});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
