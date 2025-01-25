import React, { useState, useEffect } from 'react';
import axios from 'axios';

import rightArrow from '../Staffs/Util/rightArrow.svg';
import leftArrow from '../Staffs/Util/leftArrow.svg';

const Attendence = () => {
    const studentid = sessionStorage.getItem('studentid');

    const [currentDate, setCurrentDate] = useState('');
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setCurrentDate(formattedDate);

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/student/view_attendance?id=${studentid}`);

                // Sort the data by date in descending order
                const sortedData = res.data.attendanceDetails.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateA - dateB; // Ascending order
                });

                setAllData(sortedData); // Save the sorted data
                setFilteredData(filterByDate(sortedData, formattedDate)); // Filter by the current date
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [studentid]);

    const filterByDate = (data, date) => {
        return data.filter((item) => item.date === date);
    };

    useEffect(() => {
        // Filter data whenever the date changes
        setFilteredData(filterByDate(allData, currentDate));
    }, [currentDate, allData]);

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

    return (
        <div className='student stdhome' style={{ height: '100vh' }}>
            <div className='main-content'>
                <div className='title'>
                    <h1>St John Cena's College Of Science</h1>
                </div>
                <div className='events'>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <h5>Attendance</h5>
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
                                    width: '130px',
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
                    </div>
                    {filteredData.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.subject.name}</td>
                                        <td>{item.present ? "Present" : "Absent"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No attendance records for the selected date.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendence;
