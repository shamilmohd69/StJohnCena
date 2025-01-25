const mongoose = require('mongoose')

const leave = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    data: String,
    date: String,
    status: String,
})

const leave_reqdb = mongoose.model('LEAVE_REQDB', leave)

module.exports = leave_reqdb;