var express = require('express');
var router = express.Router();

const Book = require('../models/book');

router.get('/', (req, res, next) => {
   Book.find()
      .then(books => {
         res.status(200).json({
            message: 'Books fetched successfully',
            books: books
         });
      })
      .catch(err => {
         res.status(500).json({
            message: 'An error orccurred',
            error: err
         });
      });
});

router.post("/", (req, res, next) => {
   const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isbn: req.body.isbn,
      tags: req.body.tags
   });

   book.save()
      .then(createdBook => {
         res.status(201).json({
            message: 'Book added successfully',
            book: createdBook
         });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occured',
            error: error
         });
      });
});

router.delete("/:id", (req, res, next) => {
   console.log(req.params.id);
   Book.deleteOne({id: req.params.id}).then();
   res.status(200).json({message: "Deleted"})
});

module.exports = router;