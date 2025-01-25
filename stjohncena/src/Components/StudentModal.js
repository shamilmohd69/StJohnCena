import React, { useState, useEffect } from 'react';
import './utilities/StudentModal.css';
import cancel from './utilities/cancel_b.svg';
import axios from 'axios';

const StudentModal = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');
    const [stdId, setStdId] = useState(null);

    const [data, setData] = useState([]);
    const [dept, setDept] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/view_dept');
                setData(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchStdId = async () => {
            try {
                const res = await axios.get('http://localhost:4000/admin/student_id');
                const lastStdId = res.data.lastStdId || 0;
                
                const newStdId = `S${String(lastStdId + 1).padStart(4, '0')}`;
                setStdId(newStdId);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
        fetchStdId();
    }, []);

    useEffect(() => {
        if (dept) {
            const fetchCourse = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/admin/view_course?dept=${dept}`);
                    setCourses(res.data.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchCourse();
        }
    }, [dept]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        onClose();
        window.location.reload();

        const newStudent = {
            firstName,
            lastName,
            age,
            gender,
            dept,
            course,
            semester,
            stdId: `${stdId}`,
        };

        try {
            await axios.post('http://localhost:4000/admin/add_std', newStudent);
            console.log('Student added successfully!');
        } catch (err) {
            console.log('Error adding student:', err);
        }
    };

    return (
        <div className="divmodal">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Add New Student</h5>
                    <img src={cancel} alt="cancel" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit}>
                    <label className='label'>
                        First Name:
                        <input
                            type="text"
                            placeholder="Enter student's first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </label>
                    <label className='label'>
                        Last Name:
                        <input
                            type="text"
                            placeholder="Enter student's last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label1'>
                            Age:
                            <input
                                type="number"
                                placeholder="Enter student's age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </label>
                        <label className='label1'>
                            Gender:
                            <select
                                value={gender || ""}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                        <label className='label1'>
                            Semester:
                            <select
                                value={semester || ""}
                                onChange={(e) => setSemester(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <label className='label1'>
                            Department:
                            <select
                                value={dept || ""}
                                onChange={(e) => setDept(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                {data.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className='label1'>
                            Course:
                            <select
                                value={course || ""}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                {courses.map((item) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <label className='label'>
                        Student ID : <strong>{stdId}</strong>
                    </label>

                    <button type="submit" className='modal-submit'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default StudentModal;
