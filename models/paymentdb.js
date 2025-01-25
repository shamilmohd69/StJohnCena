const mongoose = require('mongoose')

const payment = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOGINDB' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'COURSEDB' },
    amount: Number,
    date: String,
})

const paymentdb = mongoose.model('PAYMENTDB', payment)

module.exports = paymentdb;