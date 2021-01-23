const mongoose = require('mongoose')

const router = require('express').Router();
let User = require('../models/user.model');

router.route('/signup').post((req, res) => {
    //grab username, create new User
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const newUser = new User({fname, lname, email, password});
    //save to database then respond with status
    newUser.save()
        .then(() => res.status(200).json('User added!'))
        .catch(err => res.status(409).json('Error: ' + err))
});

router.route('/login').post((req, res) => {
    data = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne(data)
        .then(user => res.status(200).json(user))
        .catch(err => res.status(401).json("Bad credentials. Error: " + err))
});

module.exports = router;