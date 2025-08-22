require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoute");
const contactRoutes = require("./routes/contactRoutes");
const notes = require("./routes/notes");

// DB Connect
const connectToDatabase = require("./db");
connectToDatabase();

// Express App
const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: "http://localhost:5173", // frontend ka URL
    credentials: true, // cookies allow karne ke liye
  })
);
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static uploads
app.use(express.static(__dirname));

/* ---------- MongoDB ---------- */
mongoose.set("strictQuery", false);

/* ---------- Multer Setup ---------- */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

/* ---------- Book Schema ---------- */
const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    pages: Number,
    price: Number,
    edition: String,
    coverImage: String,
  })
);

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/notes", notes);

// Sample GET route
app.get("/books", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Fiction",
      coverImage: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      coverImage: "https://via.placeholder.com/150",
    },
  ]);
});

// Upload new book with image
app.post("/add-book", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, author, pages, price, edition, description } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newBook = new Book({
      title,
      author,
      pages,
      price,
      edition,
      description,
      coverImage,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

/* ---------- 404 + ERROR HANDLING ---------- */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res
    .status(err.statusCode || 500)
    .send(err.message || "Internal Server Error");
});

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
});
