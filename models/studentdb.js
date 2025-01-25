const mongoose = require('mongoose')

const student = new mongoose.Schema({
    img: String,
    firstname: String,
    lastname: String,
    age: Number,
    gender: String,
    stdId: String,
    semester: String,
    fees: String,
    email:String,
    login: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'COURSEDB' },
    dept: { type: mongoose.Schema.Types.ObjectId, ref: 'DEPTDB' }
})

const stdentdb = mongoose.model('STUDENTDB', student)

module.exports = stdentdb;