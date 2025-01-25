const mongoose = require('mongoose')

const notification = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    data: String,
})

const notificationdb = mongoose.model('NOTIFICATIONDB', notification)

module.exports = notificationdb;