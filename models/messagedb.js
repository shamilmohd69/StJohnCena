const mongoose = require('mongoose')

const message = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    message: String,
    date: { type: Date, default: Date.now },
})

const messagedb = mongoose.model('MESSAGEDB', message)

module.exports = messagedb;