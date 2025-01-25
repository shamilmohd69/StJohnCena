const mongoose = require('mongoose')

const subject = new mongoose.Schema({
    name: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'COURSEDB' },
    semester: String,
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'STAFFDB' },
})

const subjectdb = mongoose.model('SUBJECTDB', subject)

module.exports = subjectdb;