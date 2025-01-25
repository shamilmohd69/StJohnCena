const mongoose = require('mongoose')

const login = new mongoose.Schema({
    username: String,
    pass: String,
    type: String,
})

const logindb = mongoose.model('LOGINDB', login)

module.exports = logindb;