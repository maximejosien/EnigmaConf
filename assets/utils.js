const localStorage = require('localStorage');
const User = require('../models/user').User;

module.exports = {
    checkConnect: function (result) {
        let userId = localStorage.getItem('user');
        User.findOne({ _id: userId }, (err, user) => {
            if (user === null) {
                result.redirect('/users/login')
            }
        });
    }
}