const express = require("express");
const router = express.Router();
const Contact = require("../model/Contact.js");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
