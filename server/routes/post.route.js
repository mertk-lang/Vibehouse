const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const middlewares = require('../middlewares/middlewares')


// Index Page

router.get('/', middlewares.isLoggedIn, (req, res) => {

    Post.find({})
    .sort({"date":-1})
    .populate('author')
    .populate('image')
    .then((err, posts) => {
        if(err) {
            res.json(err);
        } else {
            res.json(posts)
        }
    })
})

// Post(Create) Route

router.post('/add', middlewares.isLoggedIn, upload.single('image'), (req, res, next) => {
    let post = new Post({
        location: req.body.location,
        caption: req.body.caption,
        author: req.user.id,
        date: req.body.date,
        image: {
            url: req.file.path,
            filename: req.file.filename
        }
    });
    post.save().then((post) => {
        res.status(200).json({post: 'post'})
    })
})

// Delete Route

router.delete('/:id/delete', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.json(err);
        } else {
            res.status(200).json('removal was successful');
        }
    });
});




module.exports = router;
