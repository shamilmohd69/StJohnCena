const mongoose = require('mongoose')

const staff = new mongoose.Schema({
    img: String,
    firstname: String,
    lastname: String,
    age: Number,
    gender: String,
    empId: String,
    designation: String,
    email: String,
    subject1: { type: mongoose.Schema.Types.ObjectId, ref: 'SUBJECTDB' },
    subject2: { type: mongoose.Schema.Types.ObjectId, ref: 'SUBJECTDB' },
    subject3: { type: mongoose.Schema.Types.ObjectId, ref: 'SUBJECTDB' },
    login: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    dept: { type: mongoose.Schema.Types.ObjectId, ref: 'DEPTDB' },
})

const staffdb = mongoose.model('STAFFDB', staff)

module.exports = staffdb;