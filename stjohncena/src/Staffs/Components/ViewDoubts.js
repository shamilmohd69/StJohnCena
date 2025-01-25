import React, { useState, useEffect } from 'react'
import axios from 'axios'

import cancel from '../Util/cancel_b.svg'

const ViewDoubts = ({ isOpen, onClose, data }) => {

    const staffId = sessionStorage.getItem('staffid');

    const [comment, setComment] = useState('');

    const commentSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:4000/staff/add_comment', { userId: staffId, data: comment, noteId: data._id });
            setComment('');
            onClose();
        } catch (err) {
            console.log(err);
        }
    }

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data._id && isOpen) {
                    const res = await axios.get(`http://localhost:4000/staff/view_comment?noteId=${data._id}`);
                    setComments(res.data.data);
                    console.log(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [data._id, isOpen]);

    if (!isOpen) return null;
    return (
        <div className="doubts">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>{data.title}</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>
                <p>{data.notes}</p>
                <hr />

                {comments.length === 0 &&
                    <div className='comments'>
                        <p
                            style={{ textAlign: 'center' }}>No comments yet</p>
                    </div>
                }

                {comments.length > 0 && (
                    <div className='comments'>
                        {comments.map((comment, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: comment.userId.type === 'staff' ? 'lightblue' : 'white',
                                }}
                            >
                                <b>{comment.userId.username}</b>
                                <p>{comment.data}</p>
                            </div>
                        ))}
                    </div>
                )}

                <form
                    onSubmit={commentSubmit}>
                    <label className='label'>
                        <h6>Send Reply:</h6>
                        <input
                            type="text"
                            placeholder="Enter here"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                    <button type="submit" className='modal-submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default ViewDoubts