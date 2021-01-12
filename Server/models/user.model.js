const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        minglength: 3
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        minglength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minglength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minglength: 3
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;