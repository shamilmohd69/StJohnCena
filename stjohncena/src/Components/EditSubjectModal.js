import React, { useState, useEffect } from 'react'
import './utilities/StudentModal.css';
import axios from 'axios';

import cancel from './utilities/cancel_b.svg';

const EditSubjectModal = ({ isOpen, onClose, selectedSubject }) => {

    const [data, setData] = useState([]);

    const [staff, setStaff] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (selectedSubject && selectedSubject.course) {
                try {
                    const res = await axios.get(`http://localhost:4000/admin/view_staffs?course=${selectedSubject.course}`);
                    setData(res.data.data);
                    console.log(res.data.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [selectedSubject, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/admin/assign_sub', {
                id: selectedSubject._id,
                staff: staff
            });
            onClose();

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.get(`http://localhost:4000/admin/delete_subject?id=${selectedSubject._id}`);
            onClose();
        } catch (err) {
            console.log(err);
        }
    };



    if (!isOpen) return null;
    return (
        <div className="divmodal s_modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>{selectedSubject.name}</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        Assigned Staff:
                        <select
                            style={{
                                marginTop: '10px'
                            }}
                            onChange={(e) => setStaff(e.target.value)}
                        >
                            <option value="">Select</option>
                            {data.map((staff) => (
                                <option
                                    value={staff._id}
                                    key={staff._id}
                                >
                                    {staff.firstname} {staff.lastname}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div style={{
                        display: 'flex',
                        gap: '10px',
                    }}>
                        <button
                            type="button"
                            className='modal-delete'
                            style={{
                                width: 'fit-content',
                                padding: '0px 20px'
                            }}
                            onClick={() => {
                                const confirmDelete = window.confirm('Are you sure you want to delete this subject?');
                                if (confirmDelete) {
                                    handleDelete();
                                }
                            }}>
                            Delete
                        </button>
                        <button
                            type="submit"
                            className='modal-submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditSubjectModal