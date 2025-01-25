const mongoose = require('mongoose');

const note = new mongoose.Schema({
    title: String,
    notes: String,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'SUBJECTDB' },
})

const notesdb = mongoose.model('NOTESDB', note)

module.exports = notesdb