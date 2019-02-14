const mongoose  = require('mongoose');

const conferenceSchema = new mongoose.Schema({
    name : String,
    users : Array,
    speaker : {
        firstName: String,
        lastName: String
    },
    date : String,
    ownerId : String
})

const Conference = mongoose.model('Conferences', conferenceSchema);

module.exports = {
    Conference: Conference
}