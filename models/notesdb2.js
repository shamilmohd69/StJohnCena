const mongoose = require('mongoose');

const note = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: 'NOTESDB' },
    data: String,
})

const notesdb2 = mongoose.model('NOTESDB2', note)

module.exports = notesdb2