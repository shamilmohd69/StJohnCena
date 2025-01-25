import React, { useState, useEffect } from 'react'
import AdminSidebar from '../Components/AdminSidebar';

import ComplaintModal from './Components/ComplaintModal';

const Complaint = () => {
    const sidebarState = sessionStorage.getItem('sidebar') === 'true' || !sessionStorage.getItem('sidebar');

    const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => {
            const newState = !prevState;
            sessionStorage.setItem('sidebar', newState);
            return newState;
        });
    };

    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [isReplyOpen, setIsReplyOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:4000/admin/view_complaint');
                const data = await res.json();
                setComplaints(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className='admin complaint'>
            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                <div className="title">
                    <h1>St. John Cena's College Of Science</h1>
                </div>
                <div className="div1">
                    {complaints.map((complaint) => (
                        <div
                            key={complaint._id}
                            className="div0"
                            onClick={() => {
                                setSelectedComplaint(complaint);
                                isReplyOpen ? setIsReplyOpen(false) : setIsReplyOpen(true)
                            }}
                            style={{
                                cursor: 'pointer',
                            }}>
                            <p><b>UserID :</b> {complaint.userId.username}</p>
                            <p><b>Complaint :</b> {complaint.data}</p>
                            <p><b>Reply :</b> {complaint?.reply || 'N/A'}</p>
                        </div>
                    ))}

                </div>
            </div>
            <ComplaintModal 
                isOpen={isReplyOpen}
                onClose={() => setIsReplyOpen(false)}
                data={selectedComplaint}
                />
        </div>
    )
}

export default Complaint