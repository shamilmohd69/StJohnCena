import React, { useState, useEffect } from 'react'
import axios from 'axios'

import cancel from '../Util/cancel_b.svg'
import './AttendanceModal.css';
import leftArrow from '../Util/leftArrow.svg';
import rightArrow from '../Util/rightArrow.svg';


const AttendanceModal = ({ isOpen, onClose, subject }) => {

    const [std, setStd] = useState([]);
    const [currentDate, setCurrentDate] = useState('');


    useEffect(() => {

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);

        const fetchData = async () => {
            if (subject) {
                try {
                    const res = await axios.get(`http://localhost:4000/staff/view_std?id=${subject}`);
                    setStd(res.data.std);
                } catch (err) {
                    console.log(err);
                } 
            }
        }
        fetchData();
    }, [subject, isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/staff/view_attendance?id=${subject}&date=${currentDate}`);
                const attendanceData = res.data.student || [];

                const updatedStd = std.map(student => {
                    const attendance = attendanceData.find(a => a.std === student.login);

                    return {
                        ...student,
                        present: attendance ? attendance.present : false
                    };
                });
                setStd(updatedStd);
                console.log(updatedStd);

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [isOpen, currentDate, subject]); 

    const minusDay = () => {
        const previousDay = new Date(currentDate);
        previousDay.setDate(previousDay.getDate() - 1);
        const formattedDate = previousDay.toISOString().split('T')[0];
        setCurrentDate(formattedDate);
    };

    const plusDay = () => {
        const today = new Date();
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);

        if (nextDay <= today) {
            const formattedDate = nextDay.toISOString().split('T')[0];
            setCurrentDate(formattedDate);
        }
    };

    const saveAttendance = async () => {
        const attendance = std.map((student, index) => ({
            std: student.login,
            present: document.querySelectorAll('input[type="checkbox"]')[index].checked,
        }));


        try {
            await axios.post('http://localhost:4000/staff/save_attendance', {
                date: currentDate,
                subjectId: subject,
                attendance,
            });
            alert('Attendance saved successfully!');
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to save attendance');
        }
    };

    if (!isOpen) return null
    return (
        <div className="divmod">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Take Attendance :
                        <span
                            style={{
                                fontSize: '16px',
                                fontWeight: 'normal'
                            }}>
                            Total students {std.length}
                        </span>
                    </h5>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            onClick={minusDay}
                            style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                            }}>
                            <img src={leftArrow} alt="leftArrow" />
                        </button>
                        <input
                            type="date"
                            style={{
                                border: '2px solid black',
                                borderRadius: '5px',
                                padding: '0px 5px',
                                width: '120px',
                            }}
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                        <button
                            onClick={plusDay}
                            style={{
                                border: 'none',
                                backgroundColor: 'transparent',
                                cursor: 'pointer',
                            }}>
                            <img src={rightArrow} alt="rightArrow" />
                        </button>
                    </div>
                    <img
                        src={cancel}
                        alt="cancel"
                        onClick={onClose}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div>
                    {std.map((std, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #ccc',
                            marginTop: '5px',
                        }}>
                            <h6>{std.firstname} {std.lastname}</h6>
                            <input
                                type="checkbox"
                                style={{
                                    marginBottom: '5px',
                                    height: '15px',
                                    width: '15px'
                                }}
                                defaultChecked={std.present}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={saveAttendance}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: 'rgb(0,0,40)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Save Attendance
                </button>
            </div>

        </div>
    )
}

export default AttendanceModal