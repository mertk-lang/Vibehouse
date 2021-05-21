const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }]
}, {timestamps: true}
);


module.exports = mongoose.model('User', User);