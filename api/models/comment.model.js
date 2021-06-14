const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    caption: String,
},
  { timestamps: true }
)

module.exports = mongoose.model('Comment', Comment);
