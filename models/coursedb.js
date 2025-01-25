const mongoose = require('mongoose')

const course = new mongoose.Schema({
    name: String,
    dept: { type: mongoose.Schema.Types.ObjectId, ref: 'DEPTDB' },
    fees: String
})

const coursedb = mongoose.model('COURSEDB', course)

module.exports = coursedb;