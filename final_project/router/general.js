const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  if (books) {
    return res.send(books);
  } else {
  return res.status(404).json({message: "No available list of books"});
  }
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
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
