const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({message: 'Username and passsword are required'});
  } else if (!isValid(username)) {
    res.status(400).json({message: 'Username is invalid'});
  } else {
    users.push({username, password});
    return res.status(200).json({message: "User is successfully registered!"});
  }
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
  //Write your code here
  axios.get('https://localhost:5000/books')
  .then(response => { return res.status(200).json(response.data) })
  .catch(error => { return res.status(500).json({message: "Error fetching data:", error: error.message}); });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    if (books[isbn]) {
      return res.send(books[isbn])
    } else {
      return res.status(404).json({message: "No available ISBN"});
    }
   });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let matchingBooks = [];
  
  const keys = Object.keys(books);

  for (let key of keys) {
    if (books[key].author === author) {
      matchingBooks.push(books[key]);
    }
  }
  if (matchingBooks) {
    return res.send(matchingBooks);
  } else {
    return res.status(404).json({message: "No available book"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
const title = req.params.title;
  let matchingBooks = [];
  
  const keys = Object.keys(books);

  for (let key of keys) {
    if (books[key].title === title) {
      matchingBooks.push(books[key]);
    }
  }
  if (matchingBooks) {
    return res.send(matchingBooks);
  } else {
    return res.status(404).json({message: "No available book"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.send(books[isbn].reviews);
  } else {
    return res.status(404).json({message: "No available ISBN"});
  }
});

module.exports.general = public_users;
