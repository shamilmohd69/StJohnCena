import React, { useState, useEffect } from 'react';
import axios from 'axios';

import cancel from '../Util/cancel_b.svg';

const AskQuestionModal = ({ isOpen, onClose, notes }) => {

    const stdId = sessionStorage.getItem('studentid');

    const [comment, setComment] = useState('');

    const commentSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:4000/staff/add_comment', { userId: stdId, data: comment, noteId: notes._id });
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
                if (notes._id && isOpen) {
                    const res = await axios.get(`http://localhost:4000/staff/view_comment?noteId=${notes._id}`);
                    setComments(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [notes._id, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="doubts">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>{notes.title}</h5>
                    <img
                        src={cancel}
                        alt="cancel"
                        onClick={onClose}
                        style={{
                            cursor: 'pointer'
                        }} />
                </div>
                <p>{notes.notes}</p>
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
                                    backgroundColor: comment.userId.type === 'staff' ? 'powderblue' : 'white',
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
                        <h6>Ask Doubts:</h6>
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
    );
};

export default AskQuestionModal;
