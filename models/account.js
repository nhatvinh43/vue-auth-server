const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 4,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    Account,
}