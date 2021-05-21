const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = Joi.object({
  username: Joi.string()
      .regex(/(^[a-zA-Z0-9_]+$)/)
      .min(2)
      .max(30)
      .required(),

  password: Joi.string().min(8).required()
});

function createToken(user, req, res, next) {
  const payload = {
    id: user._id,
    username: req.body.username,
  }; 
  
  jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  }, (err, token) => {
    if(err) {
      res.status(422)
      next(err);
    } else {
      res.json({
        token
      });
    }
  });
}

// Create User 
router.post('/register', (req, res, next) => {
  const validation = schema.validate(req.body);
  if(validation.error === undefined) {
    User.findOne({
      'username': req.body.username
    }).then((user) => {
      if(user) {
        let error = new Error('This username is already in use');
        res.status(409);
        next(error);
      } else {
        bcrypt.hash(req.body.password, 12).then(hashedPassword => {
          let user = new User({
            'username': req.body.username,
            'password': hashedPassword
          });
          user.save()
          .then((registeredUser) => {
           // res.json(registeredUser.username);
           // console.log(registeredUser.username);
            createToken(registeredUser, req, res, next);
          })
        })
      }
    });
  } else {
    res.status(406);
    next(validation.error);
    console.log(validation.error);
  }
})
  

// Login

router.post('/login', (req, res, next) => {
  const validation = schema.validate(req.body);
  if(validation.error === undefined) {
    User.findOne({
      'username': req.body.username
    }).then(user => {
      if(user) {
        bcrypt.compare(req.body.password, user.password)
        .then(result => {
          if(result) {
            createToken(user, req, res, next);
          } else {
            res.status(406);
            let error = new Error('Wrong password');
            next(error);
          }
        })
      } else {
        res.status(404);
        let error = new Error("Unable to login");
        next(error);
      }
    });
  } else {
    res.status(406);
    next(validation.error);
  }
})


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
  

module.exports = router;


