const express = require('express')
const router = express.Router()
const STUDENTDB = require('../models/studentdb')
const STAFFDB = require('../models/staffdb')
const DEPTDB = require('../models/deptdb')
const COURSEDB = require('../models/coursedb')
const LOGINDB = require('../models/logindb')
const SUBJECTDB = require('../models/subjectdb')
const COMPLAINTDB = require('../models/complaintdb')
const LEAVEDB = require('../models/leave_reqdb')
const NOTIFICATIONDB = require('../models/notificationdb')


router.post('/add_dept', async (req, res) => {
    const item = {
        name: req.body.name
    }
    const std = new DEPTDB(item)
    await std.save()

    res.json('ok')
})

router.get('/view_dept', async (req, res) => {
    const dept = await DEPTDB.find()
    res.json({ 'data': dept })
})

router.get('/delete_dept', async (req, res) => {
    const id = req.query.id
    await DEPTDB.deleteOne({ _id: id })
    await COURSEDB.deleteMany({ dept: id })
    res.json({ 'status': 'ok' })
})

router.get('/edit_dept', async (req, res) => {
    const id = req.query.id

    const dept = await DEPTDB.findOne({ _id: id })
    res.json({ 'data': dept })
})

router.post('/edit_dept_post', async (req, res) => {
    const item = {
        name: req.body.name
    }
    await DEPTDB.updateOne({ _id: req.body.id }, item)
    res.json('ok')
})

router.post('/add_course', async (req, res) => {
    const item = {
        name: req.body.name,
        dept: req.body.dept,
        fees: req.body.fees
    }

    const std = new COURSEDB(item)
    await std.save()
})

router.post('/add_subject', async (req, res) => {
    const item = {
        name: req.body.name,
        course: req.body.course,
        semester: req.body.sem
    }
    const std = new SUBJECTDB(item)
    await std.save()
    res.json('ok')
})

router.get('/view_staffs', async (req, res) => {
    const dept = await COURSEDB.findOne({ _id: req.query.course })
    const staff = await STAFFDB.find({ dept: dept.dept })
    res.json({ 'data': staff })
})

router.get('/view_subject', async (req, res) => {
    const subject = await SUBJECTDB.find({ course: req.query.course }).populate('staff')
    res.json({ 'data': subject })
})

router.post('/assign_sub', async (req, res) => {
    const item = {
        staff: req.body.staff,
    }

    await SUBJECTDB.findOneAndUpdate({ _id: req.body.id }, item)
    res.json('ok')
})

router.get('/delete_subject', async (req, res) => {
    const id = req.query.id
    console.log(id);

    await SUBJECTDB.findOneAndDelete({ _id: id })
    res.json({ 'status': 'ok' })
})

router.get('/view_course', async (req, res) => {
    const course = await COURSEDB.find({ dept: req.query.dept })
    res.json({ 'data': course })
})

router.get('/viewall_course', async (req, res) => {
    const course = await COURSEDB.find()
    res.json({ 'data': course })
})

router.get('/student_id', async (req, res) => {
    try {
        const lastStudent = await STUDENTDB.findOne().sort({ stdId: -1 }).limit(1);

        const lastStdId = lastStudent ? parseInt(lastStudent.stdId.replace("S", ""), 10) : 0;

        res.json({ lastStdId });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching last admission number' });
    }
});

router.post('/add_std', async (req, res) => {

    const login = {
        username: req.body.stdId,
        pass: `${req.body.lastName}${req.body.stdId}`,
        type: 'student'
    }

    console.log(login);
    const log = new LOGINDB(login)
    await log.save()

    const item = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        stdId: req.body.stdId,
        login: log._id,
        course: req.body.course,
        semester: req.body.semester,
        dept: req.body.dept,
        fees: null
    }

    console.log(item);
    const std = new STUDENTDB(item)
    await std.save()

})

router.get('/view_std', async (req, res) => {
    const std = await STUDENTDB.find().populate('course').populate('dept')
    res.json({ 'data': std })
})

router.get('/std_profile', async (req, res) => {

    const stdId = req.query.id

    const std = await STUDENTDB.findOne({ _id: stdId }).populate('course').populate('dept')
    res.json({ 'data': std })
    console.log(std);

})

router.get('/delete_std', async (req, res) => {
    const stdId = req.query.id
    const loginId = req.query.id2

    await LOGINDB.findOneAndDelete({ _id: loginId })
    await STUDENTDB.findOneAndDelete({ _id: stdId })
    res.json({ 'status': 'ok' })
})

router.post('/edit_std', async (req, res) => {
    const item = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        semester: req.body.semester
    }

    try {
        const updatedStudent = await STUDENTDB.findOneAndUpdate(
            { _id: req.query.id },
            { $set: item },
            { new: true }
        );

        if (updatedStudent) {
            return res.json({ status: 'ok', student: updatedStudent });
        } else {
            return res.status(404).json({ status: 'error', message: 'Student not found' });
        }
    } catch (err) {
        console.error("Error updating student:", err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
})

router.post('/add_staff', async (req, res) => {

    const login = {
        username: req.body.staffId,
        pass: `${req.body.lastName}${req.body.staffId}`,
        type: 'staff'
    }

    const log = new LOGINDB(login)
    await log.save()

    const item = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        empId: req.body.staffId,
        login: log._id,
        dept: req.body.dept,
        designation: req.body.designation
    }

    const stf = new STAFFDB(item)
    await stf.save()
})

router.get('/staff_id', async (req, res) => {
    try {
        const lastStaff = await STAFFDB.findOne().sort({ empId: -1 }).limit(1);

        const lastStfId = lastStaff ? parseInt(lastStaff.empId.replace("E", ""), 10) : 0;

        res.json({ lastStfId });

    } catch (err) {
        res.status(500).json({ error: 'Error fetching last admission number' });
    }
});

router.get('/view_staff', async (req, res) => {
    const stf = await STAFFDB.find().populate('dept')
    res.json({ 'data': stf })
})

router.get('/view_my_subs', async (req, res) => {
    const subs = await SUBJECTDB.find({ staff: req.query.id })
    res.json({ 'data': subs })
})

router.get('/stf_profile', async (req, res) => {

    const stfId = req.query.id;

    const staff = await STAFFDB.findOne({ _id: stfId }).populate('dept')
    res.json({ 'data': staff })
})

router.get('/delete_staff', async (req, res) => {
    const stfId = req.query.id
    const loginId = req.query.id2

    await LOGINDB.findOneAndDelete({ _id: loginId })
    await STAFFDB.findOneAndDelete({ _id: stfId })
    res.json({ 'status': 'ok' })
})

router.post('/edit_staff', async (req, res) => {
    const item = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        gender: req.body.gender,
        designation: req.body.designation,
        subject: req.body.subject
    }


    try {
        const updatedStaff = await STAFFDB.findOneAndUpdate(
            { _id: req.query.id },
            { $set: item },
            { new: true }
        );

        if (updatedStaff) {
            return res.json({ status: 'ok', staff: updatedStaff });
        } else {
            return res.status(404).json({ status: 'error', message: 'Staff not found' });
        }
    } catch (err) {
        console.error("Error updating staff:", err);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
})

router.get('/view_subject', async (req, res) => {
    const sub = await COURSEDB.find({ dept: req.query.deptId })
    console.log(req.query.deptId);


    res.json({ 'data': sub })
})

router.get('/view_complaint', async (req, res) => {
    const data = await COMPLAINTDB.find().populate('userId')
    res.json({ data })
})

router.post('/complaint_reply', async (req, res) => {
    const item = {
        reply: req.body.reply
    }

    await COMPLAINTDB.findOneAndUpdate({ _id: req.body.id }, { $set: item }, { new: true })

    const item2 = {
        userId: req.body.userId,
        data: `Your complaint : ${req.body.data}, has been resolved and reply is ${req.body.reply}`
    }

    const note = new NOTIFICATIONDB(item2)
    await note.save()
})

router.get('/view_leavereq', async (req, res) => {
    const data = await LEAVEDB.find().populate('userId')
    res.json({ data })
})

router.post('/leave_req_status', async (req, res) => {
    const item = {
        status: req.body.status
    }

    await LEAVEDB.findOneAndUpdate({ _id: req.body.id }, { $set: item }, { new: true })

    if (req.body.status == 'approved') {
        const item2 = {
            userId: req.body.userId,
            data: `Your leave request on ${req.body.date} has been approved `
        }

        const note = new NOTIFICATIONDB(item2)
        await note.save()
    }
    else if (req.body.status == 'rejected') {
        const item2 = {
            userId: req.body.userId,
            data: `Your leave request on ${req.body.date} has been rejected `
        }

        const note = new NOTIFICATIONDB(item2)
        await note.save()
    }
})


module.exports = router