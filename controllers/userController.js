const User = require('../models/customerSchema');
const moment = require('moment');

exports.getAllUsers = (req, res) => {
    User.find()
        .then(result => {
            res.render('index', { arr: result, moment });
        })
        .catch(err => {
            console.error("Error fetching users:", err.message);
            res.render('index', { arr: [] });
        });
};

exports.showAddPage = (req, res) => {
    res.render('user/add', { currentPage: "add" });
};

exports.showEditPage = (req, res) => {
    User.findById(req.params.id)
        .then(result => {
            res.render('user/edit', { user: result, currentPage: "edit", moment });
        })
        .catch(err => {
            console.error("Error fetching user:", err.message);
            res.redirect('/');
        });
};

exports.showViewPage = (req, res) => {
    User.findById(req.params.id)
        .then(result => {
            res.render('user/view', { user: result, currentPage: "view", moment });
        })
        .catch(err => {
            console.error("Error fetching user:", err.message);
            res.redirect('/');
        });
};

exports.addUser = (req, res) => {
    User.create(req.body)
        .then(() => res.redirect('/'))
        .catch(err => console.error("Error saving user:", err.message));
};

exports.searchUser = (req, res) => {
    const searchText = req.body.searchText;
    User.find({
        $or: [
            { fireName: { $regex: searchText, $options: 'i' } },
            { lastName: { $regex: searchText, $options: 'i' } },
            { email: { $regex: searchText, $options: 'i' } },
            { phoneNumber: { $regex: searchText, $options: 'i' } },
        ]
    })
        .then(result => {
            res.render('user/search', { arr: result, currentPage: "search", moment });
        })
        .catch(err => {
            console.error("Error searching user:", err.message);
        });
};

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('/'))
        .catch(err => console.error("Error deleting user:", err.message));
};

exports.updateUser = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/'))
        .catch(err => console.error("Error updating user:", err.message));
};
