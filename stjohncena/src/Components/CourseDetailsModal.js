import React, { useState, useEffect } from 'react';
import './utilities/CourseModal.css';
import cancel from './utilities/cancel_b.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './utilities/CourseDetailsModal.css';
import axios from 'axios'

import add from './utilities/add.svg';
import cancel_b from './utilities/cancel_b.svg';
import { RiEditFill } from "react-icons/ri";

import EditSubjectModal from './EditSubjectModal';

const CourseDetailsModal = ({ isOpen, onClose, courseDetails }) => {

    const [activeSem, setActiveSem] = useState('1');
    const [addSubject, setAddSubject] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [data, setData] = useState([]);
    const [editSubject, setEditSubject] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState([]);


    const handleAddSubject = () => {
        setAddSubject(!addSubject);
        setSubjectName('');
    }

    const handleSemClick = (sem) => {
        setActiveSem(sem);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:4000/admin/add_subject', { name: subjectName, course: courseDetails._id, sem: activeSem });
            window.alert('Subject added successfully!');
            handleAddSubject();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/view_subject?course=' + courseDetails._id);
                setData(res.data.data);

            } catch (err) {
                console.log(err);
            }
        };

        if (courseDetails._id) {
            fetchData();
        }
    }, [addSubject, courseDetails._id]);

    const filteredSubjects = data.filter((subject) => subject.semester === activeSem);


    if (!isOpen) return null;
    return (
        <div className="divmod c_modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>{courseDetails.name}</h5>
                    <img
                        src={cancel}
                        alt="cancel"
                        onClick={onClose}
                        style={{
                            cursor: 'pointer'
                        }} />
                </div>

                <div style={{ display: 'flex', gap: '25px' }}>
                    {['1', '2', '3'].map((sem) => (
                        <p
                            key={sem}
                            onClick={() => handleSemClick(sem)}
                            style={{
                                cursor: 'pointer',
                                marginRight: '10px',
                                textDecoration: activeSem === sem ? 'underline' : 'none',
                                textUnderlineOffset: activeSem === sem ? '4px' : '0',
                                fontWeight: activeSem === sem ? '600' : 'normal',
                                textDecorationThickness: activeSem === sem ? '0.1px' : 'initial',
                                color: activeSem === sem ? 'black' : '#333',
                            }}>
                            Semester {sem}
                        </p>
                    ))}
                </div>
                {filteredSubjects.map((subject, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <div>
                            <b>Subject {index + 1} :</b> {subject.name} •
                            <b> Assigned Staff : </b>{subject.staff ? subject.staff.firstname + ' ' + subject.staff.lastname : 'N/A'}
                        </div>
                        <button
                            onClick={() => {
                                setEditSubject(true);
                                setSelectedSubject(subject)
                            }}
                            style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer'
                            }}>
                            <RiEditFill />
                        </button>
                    </div>
                ))}


                {addSubject ? (
                    <div className='sem'>
                        <div className='input-container'>
                            <input
                                type="text"
                                placeholder="Enter subject name"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className='submit-button'
                            >
                                Submit
                            </button>
                        </div>
                        <img
                            src={cancel_b}
                            alt="cancel"
                            onClick={handleAddSubject}
                            style={{
                                cursor: 'pointer'
                            }} />
                    </div>
                ) : (
                    <p
                        onClick={handleAddSubject}
                        style={{
                            marginTop: '10px',
                            cursor: 'pointer',

                        }}>
                        <img src={add} alt="add" className='mb-1' /> Add Subject
                    </p>
                )
                }
            </div>
            <EditSubjectModal
                isOpen={editSubject}
                onClose={() => setEditSubject(false)}
                selectedSubject={selectedSubject}
            />
        </div>
    );
};

export default CourseDetailsModal;