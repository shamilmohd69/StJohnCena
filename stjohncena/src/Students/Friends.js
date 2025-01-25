import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import MsgFrnd from './Components/MsgFrnd';

const Friends = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get('cId');

    const [friends, setFriends] = useState([]);
    const [friendId, setFriendId] = useState([]);
    const [staffs, setStaffs] = useState([]);


    const [activeType, setActiveType] = useState('friends');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const stdId = sessionStorage.getItem('studentid');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/student/myfriends?cId=${courseId}`);
                const filteredFriends = res.data.data.filter(friend => friend.login !== stdId);
                setFriends(filteredFriends);
                setStaffs(res.data.data2);
            } catch (err) {
                console.error("Error fetching friends:", err);
            }
        };

        if (courseId) {
            fetchFriends();
        }
    }, [courseId, stdId]);

    return (
        <div className='student stdmsg'>
            <div className='main-content'>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className='friends'>
                        <div className='title'>
                            <h1>St John Cena's College Of Science</h1>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <h6
                                onClick={() => {
                                    setActiveType('friends');
                                    setIsChatOpen(false);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: activeType === 'friends' ? 'underline' : 'none',
                                    textUnderlineOffset: activeType === 'friends' ? '4px' : 'none',
                                    color: activeType === 'friends' ? 'black' : '#333',
                                }}
                            >
                                Friends
                            </h6>
                            <h6
                                onClick={() => {
                                    setActiveType('staffs');
                                    setIsChatOpen(false);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    textDecoration: activeType === 'staffs' ? 'underline' : 'none',
                                    textUnderlineOffset: activeType === 'staffs' ? '4px' : 'none',
                                    color: activeType === 'staffs' ? 'black' : '#333',
                                }}

                            >
                                Staffs
                            </h6>
                        </div>
                        {activeType === 'friends' ? (
                            friends.length > 0 ? (
                                friends.map((friend, index) => (
                                    <div
                                        className='friend'
                                        key={friend._id || index}
                                        onClick={() => {
                                            setFriendId(friend);
                                            setIsChatOpen(true);
                                        }}
                                    >
                                        <img
                                            src={
                                                (friend.img ? `http://localhost:4000/img/${friend.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                                            }
                                            alt="user"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}

                                        />
                                        <div style={{ marginLeft: "20px" }}>
                                            <h6>
                                                {friend.firstname || "Friend Name"} {friend.lastname || ""} •
                                                <span style={{ fontWeight: "normal", fontSize: "12px", marginLeft: "5px" }}>
                                                    Semester {friend.semester || ""}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No friends found</p>
                            )
                        ) : (
                            staffs.length > 0 ? (
                                staffs.map((staff, index) => (
                                    <div
                                        className='friend'
                                        key={staff._id || index}
                                        onClick={() => {
                                            setFriendId(staff);
                                            setIsChatOpen(true);
                                        }}
                                    >
                                        <img
                                            src={
                                                (staff.img ? `http://localhost:4000/img/${staff.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                                            }
                                            alt="user"
                                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                        <div style={{ marginLeft: "20px" }}>
                                            <h6>
                                                {staff.firstname || "Staff Name"} {staff.lastname || ""} •
                                                <span style={{ fontWeight: "normal", fontSize: "12px", marginLeft: "5px" }}>
                                                    {staff.designation || ""}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No staffs found</p>
                            )
                        )}
                    </div>
                    {isChatOpen && <MsgFrnd friendId={friendId} userId={stdId} />}
                </div>
            </div>
        </div>
    );
};

export default Friends;
