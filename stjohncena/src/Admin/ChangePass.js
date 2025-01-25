import React, { useState } from 'react'
import './Admin.css'
import AdminSidebar from '../Components/AdminSidebar'
import axios from 'axios'

import eyeopen from './Components/eyeopen.svg'
import eyeclose from './Components/eyeclose.svg'

const ChangePass = () => {
  const sidebarState = sessionStorage.getItem('sidebar') === 'true' || !sessionStorage.getItem('sidebar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);

  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleNewPassword = () => setNewPasswordVisible(!newPasswordVisible);
  const toggleConfirmPassword = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      sessionStorage.setItem('sidebar', newState);
      return newState;
    });
  };

  const adminid = sessionStorage.getItem('adminid')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      await axios.post('http://localhost:4000/change_pass', {
        id: adminid,
        newPassword: newPassword,
      });
      console.log("Password change request sent!");
      alert("Password changed successfully!");
      window.location.href = '/admin/home'
    } catch (err) {
      console.log("Error changing password:", err);
    }
  }

  return (
    <div className='admin'>
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="title">
          <h1>St. John Cena's College Of Science</h1>
        </div>

        <div className="chngpass">
          <form className='form' onSubmit={handleSubmit}>

            <div className="input-wrapper">
              <input
                type={newPasswordVisible ? "text" : "password"}
                className='input'
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              {newPassword && (
                <button type="button" onClick={toggleNewPassword} className="show-password-btn">
                  {newPasswordVisible ? <img src={eyeopen} alt="eyeopen" /> : <img src={eyeclose} alt="eyeclose" />}
                </button>
              )}
            </div>

            <div className="input-wrapper">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                className='input'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword && (
                <button type="button" onClick={toggleConfirmPassword} className="show-password-btn">
                  {confirmPasswordVisible ? <img src={eyeopen} alt="eyeopen" /> : <img src={eyeclose} alt="eyeclose" />}
                </button>
              )}
            </div>

            <button className='loginbtn'>Change Password</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ChangePass
