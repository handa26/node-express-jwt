const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
  "mongodb://admin-handa:1234@cluster0-shard-00-00.nnubg.mongodb.net:27017,cluster0-shard-00-01.nnubg.mongodb.net:27017,cluster0-shard-00-02.nnubg.mongodb.net:27017/node-auth?ssl=true&replicaSet=atlas-olmmt0-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);