const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const auth = require('../middlewares/middlewares');

// Index Page

router.get('/', (req, res) => {
    Post.find({})
    .populate('author')
    .populate('image')
    .then((err, posts) => {
        if(err) {
            res.json(err);
        } else {
            console.log(posts);
            res.json(posts)
        }
    })
})

// Post(Create) Route

router.post('/add', auth.isLoggedIn, upload.single('image'), (req, res, next) => {
    let post = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.user.id,
        image: {
            url: req.file.path,                                              
            filename: req.file.filename
        }
    });
    post.save().then((post) => {
        res.status(200).json({post: 'post'})
    })     
})

// Edit Post route
 
router.get('/edit/:id', (req, res) => {
    Post.findById(req.params.id,  (err, post) => {
        if(err){
            res.json(err)
        } else {
            res.json(post)
        }
    })
})

// Update the Post

router.post('/update/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if(err){
            res.json(404).send('data was not found');
        } else {
            post.title = req.body.title;
            post.body = req.body.body;
            post.image = req.body.image
            post.save()
            .then(() => {
                res.json('Update was successful')
            })
            .catch(() => {
                res.status(400).send('was unable to update');
            });
        }
    });
})

// Delete Router

router.delete('/delete/:id',  (req, res) => {
    Post.findByIdAndRemove({_id: req.params.id}, (err) => {
        if(err){
            res.json(err);
        } else {
            res.status(200).json('removal was successful');
        }
    });
});


module.exports = router;