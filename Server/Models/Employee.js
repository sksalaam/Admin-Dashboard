const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    gender :{
        type: String,
        required: true
    },
    course :{
        type: Array,
        required: true
    },
    image :{
        type: String,
        required : true
    }
}, { timestamps: true }
);

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;