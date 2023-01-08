require("dotenv").config({path: "vars/.env"});
const express = require("express");
const cors = require('cors');
const app = express();

const router = require('./router/routes.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/qa', router);
// app.get(process.env.LOADER_ID_ENDPOINT, (req, res) => {
//   res.status(200).send(process.env.LOADER_ID);
// })

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);