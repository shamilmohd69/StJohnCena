const express = require('express')
const router = express.Router()
const LOGINDB = require('../models/logindb')

router.post('/login_p', async (req, res) => {
    const username = req.body.username
    const pass = req.body.pass

    const data = await LOGINDB.findOne({ username: username, pass: pass })
    console.log(data);

    res.json(data)
})

router.post('/change_pass', async (req, res) => {
    const { id, newPassword } = req.body;

    await LOGINDB.findOneAndUpdate({ _id: id }, { $set: { pass: newPassword } })

    res.json('ok')
})

module.exports = router;