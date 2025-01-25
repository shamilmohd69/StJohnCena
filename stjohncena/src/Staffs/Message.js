import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import MsgFrnd from '../Students/Components/MsgFrnd';

const Message = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const deptId = queryParams.get('dept');

    const [course, setCourse] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [selectedFrnd, setSelectedFrnd] = useState('');

    console.log(selectedFrnd);



    const [std, setStd] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/admin/view_course?dept=${deptId}`);
                setCourse(res.data.data);
                setSelectedCourse(res.data.data[0]._id);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (selectedCourse) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/student/myfriends?cId=${selectedCourse}`);
                    setStd(res.data.data);
                } catch (err) {
                    console.log(err);
                }
            }
            fetchData();
        }
    }, [selectedCourse])

    return (
        <div className='staff stfmsg'>
            <div className='main-content'>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className='friends'>
                        <div className='title'>
                            <h1>St John Cena's College Of Science</h1>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '25px' }}>
                            {course.map((item) => (
                                <h6
                                    key={item._id}
                                    onClick={() => {
                                        setSelectedCourse(item._id);
                                        setIsChatOpen(false);
                                    }}
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: selectedCourse === item._id ? 'underline' : 'none',
                                        color: selectedCourse === item._id ? 'black' : '#333',
                                        textUnderlineOffset: selectedCourse === item._id ? '4px' : 'none',
                                    }}>
                                    {item.name}
                                </h6>
                            ))}
                        </div>
                        {std.length > 0 ? (
                            std.map((item) => (
                                <div
                                    className='chat'
                                    key={item._id}
                                    onClick={() => {
                                        setSelectedFrnd(item);
                                        setIsChatOpen(true);
                                    }}>
                                    <img
                                        src={
                                            (item.img ? `http://localhost:4000/img/${item.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                                        } alt="user"
                                        style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                                    />
                                    <div style={{ marginLeft: "20px" }}>
                                        <h6>
                                            {item.firstname || "Student Name"} {item.lastname || ""} •
                                            <span style={{ fontWeight: "normal", fontSize: "12px", marginLeft: "5px" }}>
                                                Semester {item.semester || ""}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No Students yet</p>
                        )}
                    </div>
                    {isChatOpen && <MsgFrnd friendId={selectedFrnd} userId={sessionStorage.getItem('staffid')} />}
                </div>
            </div>
        </div>
    )
}

export default Message