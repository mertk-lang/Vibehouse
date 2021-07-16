const express = require('express');
const router = express.Router({mergeParams: true });
const Comment = require('../models/comment.model');
const Post = require('../models/post.model');
const auth = require('../middlewares/middlewares');

router.get('/', auth.isLoggedIn, (req, res, next) => {
  Post.findById(req.params.id)
  .populate({
    path: 'comments',
    populate: { path: 'author'}
  })
  .then((post) => {
    res.json(post.comments)
  })
  .catch((err) => {
    res.status(404);
    next(err) 
  })
})

router.post('/new', auth.isLoggedIn, (req, res, next) => {
  let comment = new Comment({
    author: req.user.id,
    caption: req.body.comment
  });
  comment.save()
  .then((comment) => {
    console.log(comment)
    Post.findById(req.params.id, (err, post) => {
      if(err) {
        res.status(404);
        next(err);
      } else {
        post.comments.push(comment);
        post.save();
        comment.populate('author').execPopulate()
        .then((comment) => {
          res.json(comment)
        })
      }
    })
  })
  .catch((err) => {
    res.status(400);
    next(err);
  })
})

module.exports = router;
