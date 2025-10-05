const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const methodOverride = require('method-override');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(connectLivereload());

// LiveReload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

// Routes
app.use('/', userRoutes);

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
