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
        res.status(500).send({ message: err.message });
    }
});

// Route for Get One Book by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch(err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

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
        res.status(400).send({ message: error.message });
        console.log(error);
    }
});

// Route for Update a Book
router.put("/:id", async (req, res) => {
    try {
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            })
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book updated successfully" })

    } catch(err) {
        console.log(err.message);
        res.status(500).send(500).send({ message: err.message });
    }
});

module.exports = router;