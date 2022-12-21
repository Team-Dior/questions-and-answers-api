require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const path = require("path");
const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
