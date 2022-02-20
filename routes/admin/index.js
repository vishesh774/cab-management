var express = require('express');
const cabsRouter = require('./cab');
const cityRouter = require('./city');

var app = express();
app.use('/cab', cabsRouter);
app.use('/city', cityRouter);
module.exports = app;