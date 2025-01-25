const mongoose = require('mongoose')

const complaint = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    data: String,
    reply: String,
})

const complaintdb = mongoose.model('COMPLAINTDB', complaint)

module.exports = complaintdb;