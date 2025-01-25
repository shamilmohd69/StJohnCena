const db = require('./config/db')
const login = require('./router/login')
const admin = require('./router/admin')
const student = require('./router/student')
const staff = require('./router/staff')

const path = require('path')
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')

const app = express()
const port = process.env.PORTNUMBER

app.use('/img', express.static(path.join(__dirname, 'img')));
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

dotenv.config()
db()

app.use('/', login)
app.use('/admin', admin)
app.use('/student', student)
app.use('/staff', staff)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})