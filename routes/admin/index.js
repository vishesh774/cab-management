var express = require('express');
const cabsRouter = require('./cab');
const cityRouter = require('./city');
const analyticsRouter = require('../analytics');

var app = express();
app.use('/cab', cabsRouter);
app.use('/city', cityRouter);
app.use('/analytics', analyticsRouter);
module.exports = app;