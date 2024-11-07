const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());


// ROUTES
const bookRotes = require("./routes/book")
const userRotes = require("./routes/user")
const commentRotes = require("./routes/comments")

app.use('/book',bookRotes)
app.use('/user',userRotes)
app.use('/comment',commentRotes)

module.exports = app;  