const express = require('express')
const router = express.Router()
const multer = require('multer')

const STAFFDB = require('../models/staffdb')
const NOTESDB = require('../models/notesdb')
const NOTESDB2 = require('../models/notesdb2')
const SUBJECTDB = require('../models/subjectdb')
const STUDENTDB = require('../models/studentdb')
const ATTENDANCEDB = require('../models/attendancedb')
const COMPLAINTDB = require('../models/complaintdb')
const LEAVEDB = require('../models/leave_reqdb')
const NOTIFICATIONDB = require('../models/notificationdb')


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

router.get('/view_staff', async (req, res) => {
    const id = req.query.id;

    const std = await STAFFDB.findOne({ login: id }).populate('dept')
    res.json({ 'data': std })
})

router.get('/email_search',async(req,res)=>{
    
})

router.post('/edit_staff', upload.single('image'), async (req, res) => {
    const item = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        img: req.file && req.file.filename
    }

    try {
        const updatedStaff = await STAFFDB.findOneAndUpdate(
            { login: req.query.id },
            { $set: item },
            { new: true }
        );

        if (updatedStaff) {
            return res.json({ status: 'ok', satff: updatedStaff });
        } else {
            return res.status(404).json({ error: 'Staff not found' });
        }

    }
    catch (err) {
        return res.status(500).json({ error: 'Error updating student' });
    }
})

router.post('/add_notes', async (req, res) => {
    const item = {
        title: req.body.title,
        notes: req.body.notes,
        subject: req.body.subject
    }

    const note = new NOTESDB(item)
    await note.save()
    res.json({ 'status': 'ok' })
})

router.get('/view_notes', async (req, res) => {
    const notes = await NOTESDB.find({ subject: req.query.id })
    res.json({ 'data': notes })
})

router.post('/add_comment', async (req, res) => {
    const item = {
        userId: req.body.userId,
        noteId: req.body.noteId,
        data: req.body.data
    }
    const note = new NOTESDB2(item)
    await note.save()
})

router.get('/view_comment', async (req, res) => {
    const notes = await NOTESDB2.find({ noteId: req.query.noteId }).populate('userId')
    res.json({ 'data': notes })
})

router.get('/view_subs', async (req, res) => {
    const id = req.query.id;

    const a = await SUBJECTDB.find({ staff: id })
    res.json({ 'data': a })
})

router.get('/view_sub', async (req, res) => {
    const id = req.query.id;

    const a = await SUBJECTDB.findOne({ _id: id }).populate('staff')
    res.json({ 'data': a })
})


router.get('/view_std', async (req, res) => {
    try {
        const id = req.query.id;
        const sub = await SUBJECTDB.findOne({ _id: id }).populate('course');

        if (!sub) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const std = await STUDENTDB.find({
            $and: [
                { semester: sub.semester },
                { course: sub.course._id }
            ]
        });

        res.status(200).json({ std: std });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/save_attendance', async (req, res) => {
    const { date, subjectId, attendance } = req.body;

    try {
        let record = await ATTENDANCEDB.findOne({ date, subject: subjectId });

        if (record) {
            record.student = attendance;
            await record.save();
        } else {
            record = new ATTENDANCEDB({
                date,
                subject: subjectId,
                student: attendance,
            });
            await record.save();
        }

        res.status(200).json({ message: 'Attendance saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save attendance' });
    }
});

router.get('/view_attendance', async (req, res) => {
    const date = req.query.date;
    const subjectId = req.query.id;

    try {
        const attendance = await ATTENDANCEDB.findOne({ date, subject: subjectId })
        res.json(attendance || { students: [] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch attendance' });
    }
});

router.post('/complaint', async (req, res) => {
    const item = {
        userId: req.body.userId,
        data: req.body.complaint,
        reply: null
    }

    const note = new COMPLAINTDB(item)
    await note.save()
})

router.get('/view_complaint', async (req, res) => {
    const notes = await COMPLAINTDB.find({ userId: req.query.id })
    res.json({ 'data': notes })
})

router.post('/leave_req', async (req, res) => {
    const item = {
        userId: req.body.userId,
        data: req.body.reason,
        date: req.body.date,
        status: 'pending'
    }
    const note = new LEAVEDB(item)
    await note.save()
})

router.get('/view_notif', async (req, res) => {
    const data = await NOTIFICATIONDB.find({ userId: req.query.userId })
    res.json({ data })
})

module.exports = router