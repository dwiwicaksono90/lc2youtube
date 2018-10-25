var express = require('express');
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/userLC2', {useNewUrlParser: true});

var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/users', usersRouter);

module.exports = app;
