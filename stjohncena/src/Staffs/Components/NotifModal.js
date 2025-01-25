import React, { useState, useEffect } from 'react'
import axios from 'axios'

import cancel from '../Util/cancel_b.svg'

const NotifModal = ({ isOpen, onClose, userId }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId && isOpen) {
                    const res = await axios.get(`http://localhost:4000/staff/view_notif?userId=${userId}`);
                    setData(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [userId, isOpen]);

    if (!isOpen) return null;
    return (
        <div className='divmodal '>
            <div className="modal-content2" >
                <div className="modal-header">
                    <h5>Notifications</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ overflowY: 'scroll', maxHeight: '500px', scrollbarWidth: 'none' }}>
                    
                {data.map((item) => (
                    <div key={item._id} style={{
                        backgroundColor: '#D9D9D9',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}>
                        <p style={{ marginBottom: '0px' }}>{item.data}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default NotifModal