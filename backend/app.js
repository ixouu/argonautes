//imports
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// intercept all request who have a json contentType to be able to use tu body.req
app.use(express.json());

const argonaute = require('./controllers/argonaute.controller')


// Connection to mongoDB
mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.7fuwtnb.mongodb.net/argonautes?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion to MongoDB successed !'))
  .catch(() => console.log('Connexion to MongoDB failed !'));

// Headers config
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  next();
});

// Limit requests from the same API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// DB error handler
mongoose.connection.on("error", (err) => {
  console.error('error : ' + err)
});


// routes
app.post('/api/v1/argonaute/add',  argonaute.addMember);
app.get('/api/v1/argonaute/crew', argonaute.getMembers);
app.get('/api/v1/argonaute/crew/:id', argonaute.getMember);

module.exports = app;
