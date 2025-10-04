const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
app.use(express.urlencoded({ extended: true }));
const User = require('./models/customerSchema');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Auto refresh code
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.get('/', (req, res) => {
    res.render('index', { currentPage: "index" });
});

app.get("/user/add.html", (req, res) => {
    res.render("user/add", { currentPage: "add" });
});

app.get("/user/view.html", (req, res) => {
    res.render("user/view", { currentPage: "view" });
});

app.get("/user/edit.html", (req, res) => {
    res.render("user/edit", { currentPage: "edit" });
});

// Post request to add user
app.post('/user/add.html', async (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.redirect('/user/add.html');
    }).catch((err) => {
        console.error("Error saving user:", err.message);
    });
});

// MongoDB connection
const uri = "mongodb+srv://abdalrahmanabdalnasirfalfal_db_user:Abc12345%21@cluster0.pdeviqy.mongodb.net/all-data?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB successfully!");
        app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
    })
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
    });
