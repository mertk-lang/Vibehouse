const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const User = require('./models/user.model.js')
const MongoStore = require('connect-mongo');

require('dotenv').config();

if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const app = express();

const middlewares = require('./middlewares/middlewares');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());


mongoose.Promise = global.Promise;
 mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const secret = process.env.SECRET

app.use(session({
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: MongoStore.create({
      mongoUrl: config.DB,
      secret,
      touchAfter: 24 * 60 * 60,
    })
}))

app.use(middlewares.checkTokenSetUser)


app.use('/auth', require('./routes/user.route.js'));
app.use('/posts', require('./routes/post.route.js'));
app.use('/posts/:id/comments', middlewares.isLoggedIn, require('./routes/comment.route.js'));

app.use('/', (req, res) => {
  User.findById(req.user.id)
  .populate('image')
  .then((user) => {
    res.json({
      user: user
    })
  })
  .catch((err) => {
    res.status(404);
    next(err)
  })
}
)

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(error, req, res,) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
    stack: error.stack
  });
}



app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

app.listen(port, function(){
  console.log('Server is running on Port:',port);
});
