const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    body: String
})

module.exports = mongoose.model('Comment', Comment);