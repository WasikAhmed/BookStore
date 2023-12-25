const Book = require("../models/bookModel");

const express = require("express");
const router = express.Router();

// Route for Get All Books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
});

// Router for Save a new Book
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        };
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        });

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    } catch(error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
});

module.exports = router;