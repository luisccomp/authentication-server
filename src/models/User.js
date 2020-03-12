/**
 * Defining a user and it's fields: an user email and a hash string for
 * password.
 */
const mongoose = require('mongoose');


// A user on authentication server only stores it's user email and a hash of
// it's password.
const UserSchema = new mongoose.Schema({
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
