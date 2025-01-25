import React, { useState } from 'react'
import axios from 'axios';

import cancel from '../Util/cancel_b.svg'

const NotesModal = ({ isOpen, onClose, subject }) => {

    const [notes, setNotes] = useState('');
    const [title, setTitle] = useState('');

    const staffId = sessionStorage.getItem('staffId');
    
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/staff/add_notes', { notes, title, subject, staffId });
            if (res.data.status === 'ok') {
                console.log('Note added successfully!');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    if (!isOpen) return null;
    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Add Note</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form
                    onSubmit={handleSubmit}>
                    <label className='label'>
                        Title:
                        <input
                            type="text"
                            placeholder="Enter the title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>

                    <label className='label'>
                        Note:
                        <textarea
                            type="text"
                            placeholder="Enter the note"
                            onChange={(e) => setNotes(e.target.value)}
                            value={notes}
                        />
                    </label>
                    <button type="submit" className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default NotesModal