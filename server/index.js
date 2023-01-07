require("dotenv").config({path: "vars/.env"});
const express = require("express");
const app = express();

const router = require('./router/routes.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/qa', router);

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);