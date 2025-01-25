const mongoose = require('mongoose')

const department = new mongoose.Schema({
    name: String,
})

const deptdb = mongoose.model('DEPTDB', department)   

module.exports = deptdb;