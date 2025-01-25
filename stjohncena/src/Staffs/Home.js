import React, { useState, useEffect } from 'react'
import './Staff.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import ComplaintModal from './Components/ComplaintModal'
import LeaveReqModal from './Components/LeaveReqModal'
import NotifModal from './Components/NotifModal'

import goto from './Util/goto.svg'
import complaint from './Util/complaint.svg'
import mail from './Util/mail2.svg'
import notification from './Util/notification.svg'
import message from './Util/message.svg';


const Home = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false)

    const staffId = sessionStorage.getItem('staffid');
    const navigate = useNavigate();

    const [staffData, setStaffData] = useState([]);
    const [subjects, setSubjects] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffRes = await axios.get(`http://localhost:4000/staff/view_staff?id=${staffId}`);
                const staff = staffRes.data.data;
                setStaffData(staff);

                const subjectRes = await axios.get(`http://localhost:4000/staff/view_subs?id=${staff._id}`);
                setSubjects(subjectRes.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        if (staffId) fetchData();

    }, [staffId]);

    return (
        <div className='staff staffhome'>
            <div className='main-content'>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <div className='title'>
                        <h1>St John Cena's College Of Science</h1>
                    </div>
                    <div>
                        <img
                            src={message}
                            alt="user"
                            style={{
                                marginRight: '20px',
                                marginBottom: '3px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                if (staffData.dept && staffData.dept._id) {
                                    navigate(`/staff/message?dept=${staffData.dept._id}`);
                                } else {
                                    console.error('No department found');

                                }
                            }}
                        />
                        <img
                            src={mail}
                            alt="user"
                            onClick={() => setIsOpen2(true)}
                            style={{
                                marginRight: '20px',
                                marginBottom: '3px',
                                cursor: 'pointer'
                            }}
                        />

                        <img
                            src={notification}
                            alt="user"
                            onClick={() => setIsOpen3(true)}
                            style={{
                                marginRight: '20px',
                                marginBottom: '3px',
                                cursor: 'pointer'
                            }}
                        />

                        <img
                            src={complaint}
                            alt="user"
                            onClick={() => setIsOpen(true)}
                            style={{
                                marginRight: '20px',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                </div>
                <div
                    className='div1'
                    onClick={() => { window.location.href = '/staff/profile' }}
                >
                    <img
                        src={
                            (staffData.img ? `http://localhost:4000/img/${staffData.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                        }
                        alt="user"
                        style={{
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} />
                    <div className='d1'>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}>
                            <h5>{staffData.firstname} {staffData.lastname}</h5>
                            <img src={goto} alt="goto" />
                        </div>
                        <span>Employee ID: {staffData.empId}</span>
                    </div>
                </div>
                <div className='divflex'>
                    <div className='div2'>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                            <h5>My Subjects</h5>
                            <img src={goto} alt="goto" />
                        </div>
                        {
                            subjects.map((subject) => (
                                <li
                                    key={subject._id}
                                    onClick={() => { window.location.href = `/staff/subject?subject=${subject._id}` }}
                                >
                                    <b>{subject.name}</b> • Semester {subject.semester}
                                </li>
                            ))
                        }
                    </div>
                </div>

            </div>
            <ComplaintModal isOpen={isOpen} onClose={() => setIsOpen(false)} userId={staffId} />
            <LeaveReqModal isOpen={isOpen2} onClose={() => setIsOpen2(false)} />
            <NotifModal isOpen={isOpen3} onClose={() => setIsOpen3(false)} userId={staffId} />
        </div>
    )
}

export default Home