const mongoose = require('mongoose');

const attendance = new mongoose.Schema({
    date: String,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'SUBJECTDB' },
    student: [{
        std: { type: mongoose.Schema.Types.ObjectId, ref: 'STUDENTDB' },
        present: { type: Boolean, default: false },
    }]
})

const attendancedb = mongoose.model('ATTENDANCEDB', attendance)

module.exports = attendancedb