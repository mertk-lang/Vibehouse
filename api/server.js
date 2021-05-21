const express = require('express');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');


require('dotenv').config();

if(process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const app = express();
const middlewares = require('./middlewares/middlewares');



mongoose.Promise = global.Promise;
 mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(express.json());

app.use(middlewares.checkTokenSetUser);


app.use('/auth', require('./routes/user.route.js'));
app.use('/posts',  require('./routes/post.route.js'));

app.use('/', (req, res) => {
  res.json({
    user: req.user
  })
})




function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res,) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}



app.use(notFound);
app.use(errorHandler);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});
