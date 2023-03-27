const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
   title: { type: String, required: true },
   author: { type: String },
   description: { type: String },
   imageUrl: { type: String },
   isbn: { type: String},
   tags: { type: String}
});

module.exports = mongoose.model('Book', bookSchema);