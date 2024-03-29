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
      isbn: req.body.isbn
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

router.put('/:id', (req, res, next) => {
   const book = new Book ({
      _id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isbn: req.body.isbn,
   });

         Book.updateOne({_id: req.params.id}, book)
            .then(result => {
               res.status(204).json({
                  message: 'Book updated successfully'
               });
            })
            .catch(error => {
               res.status(500).json({
                  message: 'An error occurred',
                  error: error
               });
            });
});

router.delete("/:id", (req, res, next) => {
   Book.findOne({id: req.params.id})
      .then(book => {
         Book.deleteOne({_id: req.params.id})
            .then(result => {
               res.status(200).json({message: "Deleted"})
            })
            .catch(error => {
               res.status(500).json({
                  message: 'An error occured',
                  error: error
               });
            });
      })
      .catch(error => {
         res.status(500).json({
            message: 'Book not found',
            error: {book: 'Book not found'}
         });
      });
});

module.exports = router;