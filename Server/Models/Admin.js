const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;