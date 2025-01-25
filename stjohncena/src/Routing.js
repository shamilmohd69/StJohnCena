import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Welcome from './Common/Welcome'
import Login from './Common/Login'


import AdminHome from './Admin/Home'
import AdminManageStudents from './Admin/ManageStudents'
import AdminManageStaff from './Admin/ManageStaff'
import AdminManageDept from './Admin/ManageDept'
import AdminChangePass from './Admin/ChangePass'
import AdminComplaint from './Admin/Complaint'

import StudentHome from './Students/Home'
import StudentProfile from './Students/Profile'
import StudentFriends from './Students/Friends'
import StudentNotification from './Students/Notification'
import StudentSubjects from './Students/Subjects'
import StudentAttendence from './Students/Attendence'

import StaffHome from './Staffs/Home'
import StaffProfile from './Staffs/Profile'
import StaffSubjects from './Staffs/Subjects'
import StaffMsg from './Staffs/Message'


const Routing = () => {
  return (
    <div>
      <Routes>

        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />


        <Route path="/admin/home" element={<AdminHome />} />
        <Route path="/admin/managestudents" element={<AdminManageStudents />} />
        <Route path="/admin/managestaff" element={<AdminManageStaff />} />
        <Route path="/admin/managedept" element={<AdminManageDept />} />
        <Route path="/admin/changepass" element={<AdminChangePass />} />
        <Route path="/admin/complaints" element={<AdminComplaint />} />

        <Route path='/student/home' element={<StudentHome />} />
        <Route path='/student/profile' element={<StudentProfile />} />
        <Route path='/student/friends' element={<StudentFriends />} />
        <Route path='/student/notification' element={<StudentNotification />} />
        <Route path='/student/subjects' element={<StudentSubjects />} />
        <Route path='/student/attendance' element={<StudentAttendence />} />

        <Route path='/staff/home' element={<StaffHome />} />
        <Route path='/staff/profile' element={<StaffProfile />} />
        <Route path='/staff/subject' element={<StaffSubjects />} />
        <Route path='/staff/message' element={<StaffMsg />} />
      </Routes>
    </div>
  )
}

export default Routing