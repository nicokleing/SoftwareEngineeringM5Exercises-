// app.js
const express = require('express');
const path = require('path');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/calculator', calculatorRoutes);

module.exports = app;
