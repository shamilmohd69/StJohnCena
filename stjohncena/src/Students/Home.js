import React, { useState, useEffect } from 'react';
import './Student.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import goto from './Util/goto.svg';
import notification from './Util/notification.svg';
import friends from './Util/friends.svg';
import complaint from './Util/complaint.svg';
import money from './Util/money.svg';

import ComplaintModal from '../Staffs/Components/ComplaintModal';
import NotifModal from '../Staffs/Components/NotifModal';
import PaymentModal from './Components/PaymentModal';

const Home = () => {
    const studentId = sessionStorage.getItem('studentid');
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [attendance, setAttendance] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);


    const [clanData, setClanData] = useState(null);
    const [loading, setLoading] = useState(true);
    const clanTag = "#ucr2gj9g";


    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                if (studentId) {
                    const res = await axios.get(`http://localhost:4000/student/view_std?id=${studentId}`);
                    setStudentData(res.data.data);
                } else {
                    console.error('Student ID is not available in sessionStorage.');
                }
            } catch (err) {
                console.error(err);
            }
        };

        const fetchAttendance = async () => {
            try {
                if (studentId) {
                    const res = await axios.get(`http://localhost:4000/student/view_attendance?id=${studentId}`);
                    setAttendance(res.data.presentPercentage);
                } else {
                    console.error('Student ID is not available in sessionStorage.');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchStudentData();
        fetchAttendance();
    }, [studentId]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                if (studentData.course && studentData.course._id) {
                    const res = await axios.get(`http://localhost:4000/admin/view_subject?course=${studentData.course._id}`);
                    setSubjects(res.data.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchSubjects();
    }, [studentData.course]);

    const filteredSubjects = subjects.filter((subject) => subject.semester === studentData.semester);



    return (
        <div className='student stdhome'>
            <div className='main-content'>
                <div className='title'>
                    <h1>St John Cena's College Of Science</h1>
                    <div style={{ display: 'flex', gap: '20px', marginRight: '20px' }}>
                        <img
                            src={friends}
                            alt="friends"
                            onClick={() => {
                                if (studentData.course && studentData.course._id) {
                                    navigate(`/student/friends?cId=${studentData.course._id}`);
                                } else {
                                    console.error('Course ID is not available.');
                                }
                            }}
                        />
                        <img src={money} alt="money" onClick={() => setIsOpen3(true)} />
                        <img src={notification} alt="notification" onClick={() => setIsOpen2(true)} />
                        <img src={complaint} alt="complaint" style={{ marginBottom: '7px' }} onClick={() => setIsOpen(true)} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className='div1' onClick={() => navigate('/student/profile')}>
                        <img
                            src={
                                (studentData.img ? `http://localhost:4000/img/${studentData.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                            }
                            alt="user"
                            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div className='d1'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h5>{studentData.firstname || ''} {studentData.lastname || ''}</h5>
                                <img src={goto} alt="goto" />
                            </div>
                            <span>Student ID: <b>{studentData.stdId || ''}</b> • Semester: <b>{studentData.semester || ''}</b></span>
                        </div>
                    </div>

                    <div className='academic-progress' onClick={() => navigate('/student/attendance')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5>Attendance: {attendance}%</h5>
                            <img src={goto} alt="goto" />
                        </div>
                        <div className='progress-bar'>
                            <div className='progress' style={{ width: `${attendance}%` }}></div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div
                        className='subjects'
                        onClick={() => navigate('/student/subjects', { state: { filteredSubjects } })}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5>Subjects</h5>
                            <img src={goto} alt="goto" />
                        </div>
                        <ul>
                            {filteredSubjects.map((subject, index) => (
                                <li key={index}>{subject.name || subject.title}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='events'>
                        <h5>Upcoming Deadlines</h5>
                        <ul>
                            <li>Math Exam: 12th December</li>
                            <li>Project Submission: 20th December</li>
                        </ul>
                    </div>
                </div>
            </div>
            <ComplaintModal isOpen={isOpen} onClose={() => setIsOpen(false)} userId={studentId} />
            <NotifModal isOpen={isOpen2} onClose={() => setIsOpen2(false)} userId={studentId} />
            <PaymentModal isOpen={isOpen3} onClose={() => setIsOpen3(false)} course={studentData.course} data={studentData} />
        </div>
    );
};

export default Home;
