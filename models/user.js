const mongoose  = require('mongoose');

const userShema = new mongoose.Schema({
    email : String,
    firstName : String,
    lastName: String,
    password: String
})

const User = mongoose.model('User', userShema);

module.exports = {
    User: User
}