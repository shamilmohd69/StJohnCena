const express = require('express')
const router = express.Router()
const multer = require('multer')

const STUDENTDB = require('../models/studentdb')
const MESSAGEDB = require('../models/messagedb')
const ATTENDANCEDB = require('../models/attendancedb')
const COURSEDB = require('../models/coursedb')
const STAFFDB = require('../models/staffdb')

router.use(express.static('img'))

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'img')
    },
    filename: (req, res, cb) => {
        cb(null, 'profile' + Date.now() + ".jpg")
    }
})

const upload = multer({ storage: storage })

router.get('/view_std', async (req, res) => {
    const id = req.query.id;

    const std = await STUDENTDB.findOne({ login: id }).populate('course').populate('dept')
    res.json({ 'data': std })
})

router.post('/edit_std', upload.single('image'), async (req, res) => {
    const item = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        img: req.file && req.file.filename
    }


    try {
        const updatedStudent = await STUDENTDB.findOneAndUpdate(
            { login: req.query.id },
            { $set: item },
            { new: true }
        );

        if (updatedStudent) {
            return res.json({ status: 'ok', student: updatedStudent });
        } else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error updating student' });
    }
});

router.get('/myfriends', async (req, res) => {
    const cid = req.query.cId;

    const std = await STUDENTDB.find({ course: cid })

    const dept = await COURSEDB.findOne({ _id: cid })
    const staffs = await STAFFDB.find({ dept: dept.dept })

    console.log(staffs);

    res.json({ 'data': std, 'data2': staffs })
})

router.post('/send_msg', async (req, res) => {
    const item = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        message: req.body.message
    }
    const msg = new MESSAGEDB(item)
    await msg.save()
    res.json({ 'status': 'ok' })
})

router.get('/view_msg', async (req, res) => {
    const { id1, id2 } = req.query;

    const msg = await MESSAGEDB.find({ $or: [{ sender: id1, receiver: id2 }, { sender: id2, receiver: id1 }] })
    res.json({ 'data': msg })
})

router.get('/view_attendance', async (req, res) => {
    const studentId = req.query.id;

    try {
        const attendanceRecords = await ATTENDANCEDB.find({
            "student.std": studentId
        }).populate('subject');

        if (attendanceRecords.length === 0) {
            return res.json({
                studentId: studentId,
                presentPercentage: 0,
                attendanceDetails: []
            });
        }

        let totalDays = 0;
        let presentDays = 0;
        const attendanceDetails = [];

        attendanceRecords.forEach(record => {
            const studentAttendance = record.student.find(s => s.std.toString() === studentId);
            if (studentAttendance) {
                totalDays++;
                if (studentAttendance.present) {
                    presentDays++;
                }

                attendanceDetails.push({
                    date: record.date, 
                    subject: record.subject,
                    present: studentAttendance.present
                });
            }
        });

        const presentPercentage = (presentDays / totalDays) * 100;

        res.json({
            studentId: studentId,
            presentPercentage: presentPercentage.toFixed(2),
            attendanceDetails: attendanceDetails
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to fetch attendance details'
        });
    }
});


router.post('/payment', async (req, res) => {
    const item = {
        fees: 'paid'
    }

    console.log(item, req.query.id);


    try {
        const updatedStudent = await STUDENTDB.findOneAndUpdate(
            { login: req.query.id },
            { $set: item },
            { new: true }
        );

        if (updatedStudent) {
            return res.json({ status: 'ok', student: updatedStudent });
        } else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Error updating student' });
    }
})


module.exports = router