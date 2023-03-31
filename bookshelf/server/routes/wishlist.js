var express = require('express');
var router = express.Router();

const Wishlist = require('../models/wishlist');

router.get('/', (req, res, next) => {
   Wishlist.find()
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
   const book = new Wishlist({
      title: req.body.title,
      author: req.body.author
   });

   console.log(book)

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
   Wishlist.findOne({id: req.params.id})
      .then(book => {
         Wishlist.deleteOne({_id: req.params.id})
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