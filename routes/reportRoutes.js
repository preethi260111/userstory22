const express = require("express");
const router = express.Router();
const Report = require("../models/Report"); // your schema

// POST /api/report → User submits a report
router.post("/report", async (req, res) => {
  try {
    // Get data from request body
    const { title, description } = req.body;

    // Validate data
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // Create a new report document
    const report = new Report({
      title,
      description,
    });

    // Save to MongoDB
    await report.save();

    // Send success response
    res.status(201).json({
      message: "Report submitted successfully",
      report, // optional: sends the saved document
    });
  } catch (error) {
    console.error("Error in /report:", error.message); // print real error
    res.status(500).json({
      message: "Error submitting report",
      error: error.message,
    });
  }
 
});

module.exports = router;
