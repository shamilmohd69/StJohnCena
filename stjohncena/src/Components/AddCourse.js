import React, { useState } from 'react';
import './utilities/StudentModal.css';
import cancel from './utilities/cancel_b.svg';
import axios from 'axios';

const AddCourse = ({ isOpen, onClose, selectedDepartmentId, onCourseAdded }) => {


    const [name, setName] = useState('');
    const [fees, setFees] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            fees,
            dept: selectedDepartmentId,
        }

        try {
            axios.post('http://localhost:4000/admin/add_course', data)
            onClose()
        }
        catch (err) {
            console.log(err)
        }
        onCourseAdded();
    }

    if (!isOpen) return null;
    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Add New Course</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        Course Name:
                        <input
                            type="text"
                            placeholder="Enter course name"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label className='label'>
                        Fees:
                        <input
                            type="number"
                            placeholder="Enter fees"
                            value={fees} onChange={(e) => setFees(e.target.value)}
                        />
                    </label>
                    <button type="submit" className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;
