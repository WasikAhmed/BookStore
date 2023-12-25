require("dotenv").config()
const booksRoute = require("./routes/booksRoute")

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((error) => {
        console.log(error)
    });

app.use(express.json());
app.use('/books', booksRoute);

app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
});