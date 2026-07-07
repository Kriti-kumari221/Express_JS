const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// EJS Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view')); // Change to 'views' if your folder name is views

// Dummy Data
let comments = [
    {
        id: uuid(),
        user: "Akshit",
        text: "I am comment1"
    },
    {
        id: uuid(),
        user: "Akshitt",
        text: "I am comment2"
    },
    {
        id: uuid(),
        user: "Akshittt",
        text: "I am comment3"
    },
];

// Show all comments
app.get("/comments", (req, res) => {
    res.render("index", { comments });
});

// New Comment Form
app.get("/comments/new", (req, res) => {
    res.render("new");
});

// Add New Comment
app.post("/comments/new", (req, res) => {
    const { user, text } = req.body;

    comments.push({
        id: uuid(),
        user,
        text
    });

    res.redirect("/comments");
});

// Show Single Comment
app.get("/comments/:id", (req, res) => {
    const commentid = req.params.id;

    const comment = comments.find(c => c.id === commentid);

    if (!comment) {
        return res.send("Comment not found");
    }

    res.render("show", { comment });
});

// Edit Form
app.get("/comments/:id/edit", (req, res) => {
    const commentid = req.params.id;
    const comment = comments.find(c => c.id === commentid);
    // if (!comment) {
    //     return res.send("Comment not found");
    // }
    res.render("edit", { comment });
});

// Update Comment
app.patch("/comments/:id", (req, res) => {
    const commentid = req.params.id;
    const comment = comments.find(c => c.id === commentid);
    // if (!comment) {
    //     return res.send("Comment not found");
    // }
    comment.user = req.body.user;
    comment.text = req.body.text;

    res.redirect("/comments");
});

// Delete Comment
app.delete("/comments/:id", (req, res) => {
    const commentid = req.params.id;
    comments = comments.filter(c => c.id !== commentid);
    res.redirect("/comments");
});


// Server
app.listen(4400, () => {
    console.log("Server is running on port 4400");
});