const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
const bookRotues = require("./routes/book")

app.use('/book',bookRotues)

module.exports = app;  