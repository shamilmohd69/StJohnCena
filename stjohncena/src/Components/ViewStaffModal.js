import React, { useState, useEffect } from 'react'
import './utilities/StudentModal.css'
import cancel from './utilities/cancel_b.svg'
import axios from 'axios'

const ViewStaffModal = ({ isOpen, onClose, stfId }) => {
    const [isEditable, setIsEditable] = useState(false);



    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        dept: '',
        subject: '',
        designation: '',
    });

    const [editData, setEditData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        dept: '',
        subject: '',
        designation: '',
    });

    const [originalData, setOriginalData] = useState(null);


    const [allSubjects, setAllSubjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!stfId) return;

            try {

                const staffRes = await axios.get(`http://localhost:4000/admin/stf_profile?id=${stfId}`);
                const staff = staffRes.data.data;
                setData(staff);
                setOriginalData(staff);
                setEditData(staff);


                const subsRes = await axios.get(`http://localhost:4000/admin/view_my_subs?id=${stfId}`);
                const subjects = subsRes.data.data;
                setAllSubjects(subjects);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [stfId]);




    const handleEditClick = () => {
        if (!isEditable) {
            setOriginalData({ ...data });

        }
        setIsEditable(!isEditable);

    };

    const handleEditCancel = () => {
        setEditData({ ...originalData });
        setIsEditable(false);
    };

    const handleClose = () => {
        setIsEditable(false);
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:4000/admin/edit_staff?id=${stfId}`, editData);

            if (res.data.status === 'ok') {
                console.log('Edited Staff successfully!');
                window.location.reload();
            } else {
                console.error('Error editing staff:', res.data.message);
            }
        } catch (err) {
            console.log('Error editing staff:', err);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/admin/delete_staff?id=${stfId}&id2=${data.login}`);
            if (res.data.status === 'ok') {
                console.log('Deleted Staff successfully!');
                window.location.reload();
            } else {
                console.error("Failed to delete staff.");
            }
        } catch (err) {
            console.error("Error deleting staff:", err);
        }
    };

    return isOpen ? (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>{isEditable ? 'Edit Staff' : 'View Staff'}</h5>
                    <img src={cancel} alt="cancel" onClick={handleClose} style={{ cursor: 'pointer' }} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label'>
                            First Name:
                            <input
                                type="text"
                                placeholder="Enter staff's first name"
                                value={isEditable ? editData.firstname : data.firstname}
                                readOnly={!isEditable}
                                onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
                            />
                        </label>
                        <label className='label'>
                            Last Name:
                            <input
                                type="text"
                                placeholder="Enter staff's last name"
                                value={isEditable ? editData.lastname : data.lastname}
                                readOnly={!isEditable}
                                onChange={(e) => setEditData({ ...editData, lastname: e.target.value })}
                            />
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label1'>
                            Age:
                            <input
                                type="number"
                                placeholder="Enter staff's age"
                                value={isEditable ? editData.age : data.age}
                                readOnly={!isEditable}
                                onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                            />
                        </label>
                        <label className='label1'>
                            Gender:
                            {isEditable ? (
                                <select
                                    value={isEditable ? editData.gender : data.gender}
                                    disabled={!isEditable}
                                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={data.gender || ''}
                                    readOnly={!isEditable}
                                />

                            )}
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label'>
                            Department:
                            <input
                                value={data.dept ? data.dept.name : 'N/A'}
                                readOnly
                                style={{ cursor: 'not-allowed' }}
                            />
                        </label>
                        <label className='label'>
                            Designation:
                            {isEditable ? (
                                <select
                                    value={isEditable ? editData.designation : data.designation}
                                    onChange={(e) => setEditData({ ...editData, designation: e.target.value })}
                                >
                                    <option value="Professor">Professor</option>
                                    <option value="Assistant Professor">Assistant Professor</option>
                                    <option value="Lecturer">Lecturer</option>
                                    <option value="Teaching Assistant">Teaching Assistant</option>
                                    <option value="Lab Assistant">Lab Assistant</option>
                                    <option value="Lab Incharge">Lab Incharge</option>
                                </select>

                            ) : (
                                <input
                                    type="text"
                                    value={data.designation || ''}
                                    readOnly={!isEditable}
                                />
                            )}
                        </label>
                    </div>
                    <div>
                        {allSubjects.length > 0 ? (
                            <div>
                                <h6>Subjects:</h6>
                                <ul>
                                    {allSubjects.map((subject) => (
                                        <li key={subject._id}>{subject.name}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>No subjects found for this staff.</p>
                        )}
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        {isEditable ? (
                            <button
                                type='button'
                                className='modal-action'
                                onClick={handleEditCancel}>
                                Cancel
                            </button>
                        ) : (
                            <button
                                type='button'
                                className='modal-delete'
                                onClick={() => {
                                    const confirmDelete = window.confirm('Are you sure you want to delete this staff?');
                                    if (confirmDelete) {
                                        handleDelete();
                                    }
                                }}>
                                Delete
                            </button>
                        )}
                        <button
                            type='button'
                            className='modal-submit'
                            onClick={isEditable ? handleSubmit : handleEditClick}
                        >
                            {isEditable ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null
}

export default ViewStaffModal