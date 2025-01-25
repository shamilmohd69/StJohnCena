import React, { useState, useEffect } from 'react';
import './utilities/StudentModal.css';
import cancel from './utilities/cancel_b.svg';
import axios from 'axios';

const StudentModal = ({ isOpen, onClose, studentId }) => {
    const [isEditable, setIsEditable] = useState(false);

    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        semester: '',
        course: { name: '' }
    });

    const [editedData, setEditedData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        gender: '',
        semester: '',
        course: { name: '' }
    });

    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (studentId) {
                try {
                    const res = await axios.get(`http://localhost:4000/admin/std_profile?id=${studentId}`);
                    const std = res.data.data;
                    setData(std);
                    setOriginalData(std);
                    setEditedData(std);
                } catch (err) {
                    console.error("Error fetching student data:", err);
                }
            }
        };
        fetchData();
    }, [studentId]);

    const handleEditClick = () => {
        if (!isEditable) {
            setOriginalData({ ...data });
        }
        setIsEditable(!isEditable);
    };

    const handleEditCancel = () => {
        setEditedData({ ...originalData });
        setIsEditable(false);
    };

    const handleClose = () => {
        setIsEditable(false);
        onClose();
    };

    const handleDelete = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/admin/delete_std?id=${studentId}&id2=${data.login}`);
            if (res.data.status === 'ok') {
                console.log('Deleted Student successfully!');
                window.location.reload();
            } else {
                console.error("Failed to delete student.");
            }
        } catch (err) {
            console.error("Error deleting student:", err);
        }
    };


    const handleSubmit = async () => {
        try {

            const res = await axios.post(`http://localhost:4000/admin/edit_std?id=${studentId}`, editedData);

            if (res.data.status === 'ok') {
                console.log('Edited Student successfully!');
                window.location.reload();
            } else {
                console.error("Failed to edit student.");
            }
        } catch (err) {
            console.error("Error editing student:", err);
        }
        console.log(editedData);
    };



    return isOpen ? (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Student Profile</h5>
                    <img src={cancel} alt="cancel" onClick={handleClose} style={{ cursor: 'pointer' }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="label">
                        First Name:
                        <input
                            type="text"
                            placeholder="Enter student's first name"
                            value={isEditable ? editedData.firstname : data.firstname}
                            readOnly={!isEditable}
                            onChange={(e) => setEditedData({ ...editedData, firstname: e.target.value })}
                        />

                    </label>

                    <label className="label">
                        Last Name:
                        <input
                            type="text"
                            placeholder="Enter student's last name"
                            value={isEditable ? editedData.lastname : data.lastname}
                            readOnly={!isEditable}
                            onChange={(e) => setEditedData({ ...editedData, lastname: e.target.value })}
                        />
                    </label>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className="label1">
                            Age:
                            <input
                                type="number"
                                placeholder="Enter student's age"
                                value={isEditable ? editedData.age : data.age}
                                readOnly={!isEditable}
                                onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
                            />
                        </label>
                        <label className="label1">
                            Gender:
                            {isEditable ? (
                                <select
                                    value={isEditable ? editedData.gender : data.gender}
                                    onChange={(e) => setEditedData({ ...editedData, gender: e.target.value })}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={data.gender || ''}
                                    readOnly
                                />
                            )}
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className="label">
                            Course:
                            <input
                                type="text"
                                value={data.course ? data.course.name : 'N/A'}
                                readOnly
                                style={{ cursor: 'not-allowed' }}
                            />
                        </label>
                        <label className="label">
                            Semester:
                            <input
                                type="text"
                                value={isEditable ? editedData.semester : data.semester}
                                readOnly={!isEditable}
                                onChange={(e) => setEditedData({ ...editedData, semester: e.target.value })}
                            />
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '5px' }}>
                        {isEditable ?
                            <button
                                type="button"
                                className="modal-action"
                                onClick={handleEditCancel}
                            >Cancel
                            </button> : (
                                <button
                                    type="button"
                                    className="modal-delete"

                                    onClick={() => {
                                        const confirmDelete = window.confirm('Are you sure you want to delete this student?');
                                        if (confirmDelete) {
                                            handleDelete();
                                        }
                                    }}>
                                    Delete
                                </button>

                            )}
                        <button
                            type="button"
                            className="modal-submit"
                            onClick={isEditable ? handleSubmit : handleEditClick}
                        >
                            {isEditable ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default StudentModal;
