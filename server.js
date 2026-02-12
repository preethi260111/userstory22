const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* ---------- Middleware ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- MongoDB Connection ---------- */
mongoose
  .connect("mongodb://127.0.0.1:27017/forum")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

/* ---------- Routes ---------- */
const reportRoutes = require("./routes/reportRoutes");
app.use("/api", reportRoutes);

/* ---------- Default Route ---------- */
app.get("/", (req, res) => {
  res.send("Discussion Forum Backend Running");
});
app.get("/test", (req, res) => {
  res.send("Test route working");
});


/* ---------- Server ---------- */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


