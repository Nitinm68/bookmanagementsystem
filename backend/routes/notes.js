const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/test", (req, res) => {
  res.json({ message: "Notes route is working 🚀" });
});
// Get All Notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
