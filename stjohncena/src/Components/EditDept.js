import React, { useState, useEffect } from 'react';
import './utilities/StudentModal.css';
import cancel from './utilities/cancel_b.svg';
import axios from 'axios';

const AddDept = ({ isOpen, onClose, selectedDepartmentId }) => {
    const [data, setData] = useState('');
    const [newName, setNewName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/edit_dept?id=' + selectedDepartmentId);
                setData(res.data.data);
                setNewName(res.data.data.name);
                console.log(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [selectedDepartmentId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/admin/edit_dept_post', {
                id: selectedDepartmentId,
                name: newName
            });
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Edit {data.name}</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        Edit Name:
                        <input
                            type="text"
                            placeholder="Enter department's new name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className='modal-submit'>Edit</button>
                </form>
            </div>
        </div>
    );
};

export default AddDept;
