const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const Comment = require("./models/Comments");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// ======================
// Database Connection
// ======================
mongoose
  .connect("mongodb://localhost:27017/commentlpu")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ======================
// Show All Comments
// ======================
app.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  res.render("index", { comments });
});

// ======================
// New Comment Form
// ======================
app.get("/comments/new", (req, res) => {
  res.render("new");
});

// ======================
// Add New Comment
// ======================
app.post("/comments/new", async (req, res) => {
  const { user, text } = req.body;

  await Comment.create({
    user,
    text,
  });

  res.redirect("/comments");
});

// ======================
// Show Single Comment
// ======================
app.get("/comments/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.send("Comment not found");
  }

  res.render("show", { comment });
});

// ======================
// Edit Form
// ======================
app.get("/comments/:id/edit", async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.send("Comment not found");
  }

  res.render("edit", { comment });
});

// ======================
// Update Comment
// ======================
app.patch("/comments/:id", async (req, res) => {
  const { user, text } = req.body;

  await Comment.findByIdAndUpdate(req.params.id, {
    user,
    text,
  });

  res.redirect("/comments");
});

// ======================
// Delete Comment
// ======================
app.delete("/comments/:id", async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);

  res.redirect("/comments");
});
// ======================
// Server
// ======================
app.listen(4400, () => {
  console.log("Server Running on Port 4400");
});