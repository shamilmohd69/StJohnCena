import React, { useState } from 'react'
import axios from 'axios'

import cancel from '../Util/cancel_b.svg'

const ComplaintModal = ({ isOpen, onClose, userId }) => {

    const [complaint, setComplaint] = useState('')



    const handleSubmit = () => {
        try {
            axios.post('http://localhost:4000/staff/complaint', { complaint, userId });

            alert('Complaint added successfully!');

        } catch (err) {
            console.log(err);
        }
    }


    if (!isOpen) return null;

    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Complaint</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        <textarea
                            type="text"
                            placeholder="Write your complaint:"
                            onChange={(e) => setComplaint(e.target.value)}
                            value={complaint}
                            style={{
                                width: '100%',
                                height: '150px'
                            }}
                        />
                    </label>
                    <button className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ComplaintModal