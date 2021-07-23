const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    location: String,
    caption: String,
    image: {
        url: String,
        filename: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: Number,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
    }, 
    {timestamps: true}
    )

module.exports = mongoose.model('Post', Post);
