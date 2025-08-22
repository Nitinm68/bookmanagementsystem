const express = require("express");
const router = express.Router();
const multer = require("multer");
const Library = require("../model/Library");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Library.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get total number of books
router.get("/count", async (req, res) => {
  try {
    const totalBooks = await Library.countDocuments();
    res.json({ totalBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new book with optional cover image
router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const {
      title,
      author,
      book_page_number,
      book_price,
      book_edition,
      description,
    } = req.body;

    const book = new Library({
      book_name: title,
      book_author: author,
      book_page_number,
      book_price,
      book_edition,
      book_description: description,
      coverImage: req.file?.filename || "", // Save filename if uploaded
    });

    await book.save();

    res
      .status(201)
      .json({ message: "Book inserted successfully!", success: true, book });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Library.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book by ID with optional new cover image
router.put("/:id", upload.single("coverImage"), async (req, res) => {
  try {
    const updateData = {
      book_name: req.body.book_name,
      book_author: req.body.book_author,
      book_page_number: req.body.book_page_number,
      book_price: req.body.book_price,
      book_edition: req.body.book_edition,
      book_description: req.body.book_description,
    };

    if (req.file) {
      updateData.coverImage = req.file.filename; // Update cover if new file uploaded
    }

    const updatedBook = await Library.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook)
      return res
        .status(404)
        .json({ message: "Book not found", success: false });

    res.json({
      message: "Book updated successfully!",
      success: true,
      updatedBook,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete book by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Library.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({
      message: "Book deleted successfully",
      success: true,
      deletedBook,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search books by name (case-insensitive)
router.get("/search/:name", async (req, res) => {
  try {
    const searchTerm = req.params.name;
    const matchedBooks = await Library.find({
      book_name: { $regex: searchTerm, $options: "i" },
    });

    if (matchedBooks.length === 0)
      return res
        .status(404)
        .json({ message: "No books found", success: false });

    res.json({ success: true, result: matchedBooks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
