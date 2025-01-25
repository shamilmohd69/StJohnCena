import React, { useState } from 'react'
import axios from 'axios'

import cancel from '../Util/cancel_b.svg'

const LeaveReqModal = ({ isOpen, onClose }) => {

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split('T')[0];

    const [reason, setReason] = useState('');
    const [date, setDate] = useState(tomorrowDate);

    const staffId = sessionStorage.getItem('staffid');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:4000/staff/leave_req', { reason, userId: staffId, date: date });
            onClose();
            setReason('');
        } catch (err) {
            console.log(err);
        }
    }

    if (!isOpen) return null;
    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Leave Request</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type='date'
                        className='modal-input'
                        style={{
                            width: '100%',
                            height: '40px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            marginBottom: '10px',
                            padding: '5px',
                        }}
                        min={tomorrowDate}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label className='label'>
                        <textarea
                            type="text"
                            placeholder="Write your Reason:"
                            style={{
                                width: '100%',
                                height: '150px',
                                border: '1px solid #ccc',
                            }}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </label>
                    <button className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default LeaveReqModal