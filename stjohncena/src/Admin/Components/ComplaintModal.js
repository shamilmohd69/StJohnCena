import React, { useState } from 'react'
import axios from 'axios'

import cancel from '../../Components/utilities/cancel_b.svg'

const ComplaintModal = ({ isOpen, onClose, data }) => {

    const [reply, setReply] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:4000/admin/complaint_reply', { reply, id: data._id, data: data.data, userId: data.userId._id });
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
                    <h5></h5>
                    <img src={cancel} alt="cancel" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>
                    <b><span style={{ fontWeight: 'normal' }}>Complaint From : </span>{data.userId.username}</b>
                    <b><span style={{ fontWeight: 'normal' }}>Complaint : </span>{data.data}</b>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        Reply :
                        {data.reply ? <b> {data.reply} </b> : (
                            <input
                                type="text"
                                placeholder="Enter here"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                            />
                        )}

                    </label>
                    {data.reply ? null : <button type="submit" className='modal-submit'>Submit</button>}
                </form>
            </div>
        </div>
    )
}

export default ComplaintModal