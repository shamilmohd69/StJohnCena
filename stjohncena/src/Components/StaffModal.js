import React, { useState, useEffect } from 'react'
import './utilities/StudentModal.css'
import cancel from './utilities/cancel_b.svg'
import axios from 'axios'

const StaffModal = ({ isOpen, onClose }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [dept, setDept] = useState('');
    const [staffId, setStaffId] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/view_dept');
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchStaffId = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/staff_id');
                const lastStaffId = res.data.lastStfId || 0;
                const newStaffId = `E${String(lastStaffId + 1).padStart(4, '0')}`;
                setStaffId(newStaffId);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
        fetchStaffId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        onClose();
        window.location.reload();

        const newStaff = {
            firstName,
            lastName,
            age,
            gender,
            dept,
            designation,
            staffId: `${staffId}`,
        };

        try {
            await axios.post('http://localhost:4000/admin/add_staff', newStaff);
            console.log('Staff added successfully!');
        } catch (err) {
            console.log(err);
        }
    };


    if (!isOpen) return null;
    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Add New Staff</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        First Name:
                        <input
                            type="text"
                            placeholder="Enter staff's first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label className='label'>
                        Last Name:
                        <input
                            type="text"
                            placeholder="Enter staff's last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label1'>
                            Age:
                            <input
                                type="number"
                                placeholder="Enter staff's age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </label>
                        <label className='label1'>
                            Gender:
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option>Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label'>
                            Department:
                            <select
                                value={dept}
                                onChange={(e) => setDept(e.target.value)}
                                required
                            >
                                <option>Select</option>
                                {data.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className='label'>
                            Designation:
                            <select
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            >
                                <option>Select</option>
                                <option value="Professor">Professor</option>
                                <option value="Assistant Professor">Assistant Professor</option>
                                <option value="Lecturer">Lecturer</option>
                                <option value="Teaching Assistant">Teaching Assistant</option>
                                <option value="Lab Assistant">Lab Assistant</option>
                                <option value="Lab Incharge">Lab Incharge</option>
                            </select>
                        </label>
                    </div>

                    <label className='label'>
                        Employee ID: <strong>{staffId}</strong>
                    </label>

                    <button type="submit" className='modal-submit'>Submit</button>
                </form>
            </div>

        </div>
    )
}

export default StaffModal