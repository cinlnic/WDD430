const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
   title: { type: String, required: true },
   author: { type: String, required: true },
   imageUrl: { type: String }
});

module.exports = mongoose.model('Wishlist', wishlistSchema);