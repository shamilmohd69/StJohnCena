import React, { useState } from 'react';
import './utilities/StudentModal.css';
import cancel from './utilities/cancel_b.svg';
import axios from 'axios';

const AddDept = ({ isOpen, onClose, onAddDepartment }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/admin/add_dept', { name });
            onAddDepartment(res.data.data);
            onClose();
        } catch (err) {
            console.log(err);
        }
    }
    

    if (!isOpen) return null;

    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Add New Department</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        Department Name:
                        <input
                            type="text"
                            placeholder="Enter department name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddDept;
