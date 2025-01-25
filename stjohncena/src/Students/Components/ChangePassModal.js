import React, { useState } from 'react'
import axios from 'axios';

import cancel from '../Util/cancel_b.svg';

const ChangePassModal = ({ isOpen, onClose, id }) => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        try {
            await axios.post('http://localhost:4000/change_pass', {
                id: id,
                newPassword: newPassword,
            });
            console.log("Password change request sent!");
            alert("Password changed successfully!");
            onClose();
        } catch (err) {
            console.log("Error changing password:", err);
        }
    }

    if (!isOpen) return null;
    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Change Password</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <label className='label'>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassModal