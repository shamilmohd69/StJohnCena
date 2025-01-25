import React, { useState, useEffect } from 'react'
import axios from 'axios'

import cancel from './utilities/cancel_b.svg';

const LeaveReqsModal = ({ isOpen, onClose }) => {

    const [data, setData] = useState([]);

    const handleStatus = async ({ id, status, userId, date }) => {
        try {
            const res = await axios.post('http://localhost:4000/admin/leave_req_status', { id, status, userId, date });
            console.log(res.data);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                try {
                    const res = await axios.get('http://localhost:4000/admin/view_leavereq');
                    setData(res.data.data);
                    console.log(res.data.data);

                } catch (err) {
                    console.log(err);
                }
            };
            fetchData();
        }
    }, [isOpen, {handleStatus}]);



    if (!isOpen) return null;
    return (
        <div className='divmodal '>
            <div className="modal-content2">
                <div className="modal-header">
                    <h5>Leave Requests</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ overflowY: 'scroll', maxHeight: '500px', scrollbarWidth: 'none' }} >

                {[...data].reverse().map((item) => (
                    <div key={item._id} style={{
                        backgroundColor: '#D9D9D9',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}>
                        <div>
                            <h6>{item.userId.username}</h6>
                            <p>{item.data}</p>
                            <p>{item.date}</p>
                        </div>
                        {item.status === 'pending' ?
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className='btn-approve' onClick={() => handleStatus({ id: item._id, date: item.date, userId: item.userId, status: 'approved' })}>Approve</button>
                                <button className='btn-reject' onClick={() => handleStatus({ id: item._id, date: item.date, userId: item.userId, status: 'rejected' })}>Reject</button>
                            </div>
                            :
                            <span style={{ color: item.status === 'approved' ? 'green' : 'red' }}>{item.status}</span>
                        }
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default LeaveReqsModal