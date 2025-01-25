import React, { useState, useEffect } from 'react'
import './Student.css';
import axios from 'axios';

import key from './Util/chngpass.svg';

import ChangePassModal from './Components/ChangePassModal';

const Profile = () => {

    const studentId = sessionStorage.getItem('studentid');

    const [isOpen, setIsOpen] = useState(false);

    const [studentData, setStudentData] = useState({
        stdId: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        img: ""
    });
    const [editedData, setEditedData] = useState({
        stdId: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        img: ""
    });
    const [originalData, setOriginalData] = useState({
        stdId: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        img: ""
    });

    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (studentId) {
                    const res = await axios.get(`http://localhost:4000/student/view_std?id=${studentId}`);
                    setStudentData(res.data.data);
                    setEditedData(res.data.data);
                    setOriginalData(res.data.data);

                } else {
                    console.log("Student ID is not available in sessionStorage.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [studentId]);

    const handleEdit = () => {
        if (!isEditable) {
            setOriginalData({ ...studentData });
        }
        setIsEditable(!isEditable);
    }

    const handleCancel = () => {
        setIsEditable(false);
        setEditedData({ ...originalData });
    }

    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("firstname", editedData.firstname);
            formData.append("lastname", editedData.lastname);
            formData.append("age", editedData.age);

            if (editedData.img) {
                formData.append("image", editedData.img);
            }

            const res = await axios.post(
                `http://localhost:4000/student/edit_std?id=${studentId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.status === 'ok') {
                setIsEditable(false);
                console.log(res.data.data);
                window.location.reload();
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedData({ ...editedData, img: file });

            const reader = new FileReader();
            reader.onload = () => setSelectedImage(reader.result);
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className='student stdprof'>
            <div className='main-content'>
                <div className='title'>
                    <h1>St John Cena's College Of Science</h1>
                    <img src={key} alt="" onClick={() => setIsOpen(true)} />
                </div>
                <div className='profile'>
                    <div className='profile-content'>
                        <form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                            onSubmit={handleSubmit}
                        >

                            <div>
                                <label htmlFor="file-input">
                                    <img
                                        src={
                                            selectedImage ||
                                            (studentData.img ? `http://localhost:4000/img/${studentData.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                                        } alt="profile"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            cursor: isEditable ? 'pointer' : 'default',
                                        }}
                                    />
                                </label>
                                {isEditable && (
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                )}
                            </div>
                            <div style={{
                                width: '100%',
                                marginTop: '20px'
                            }}>
                                <div className='form-group'>
                                    <label>Student ID :</label>
                                    <input type='text' className='form-control' value={studentData.stdId} readOnly style={{
                                        cursor: 'default'
                                    }} />
                                </div>
                                <div className='form-group'>
                                    <label>First Name :</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={isEditable ? editedData.firstname ?? '' : studentData.firstname ?? ''}
                                        readOnly={!isEditable}
                                        onChange={(e) => setEditedData({ ...editedData, firstname: e.target.value })}
                                        style={!isEditable ? { cursor: 'default' } : { cursor: 'text' }}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Last Name :</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={isEditable ? editedData.lastname ?? '' : studentData.lastname ?? ''}
                                        readOnly={!isEditable}
                                        onChange={(e) => setEditedData({ ...editedData, lastname: e.target.value })}
                                        style={!isEditable ? { cursor: 'default' } : { cursor: 'text' }}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Age :</label>
                                    <input
                                        type='number'
                                        className='form-control'
                                        value={isEditable ? editedData.age ?? '' : studentData.age ?? ''}
                                        onChange={(e) => setEditedData({ ...editedData, age: e.target.value })}
                                        readOnly={!isEditable}
                                        style={!isEditable ? { cursor: 'default' } : { cursor: 'text' }}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Gender :</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={studentData.gender}
                                        readOnly style={{
                                            cursor: 'default'
                                        }} />
                                </div>
                            </div>
                            {isEditable ? (
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',

                                }}>

                                    <button type='button' className='button' onClick={handleCancel}>Cancel</button>
                                    <button type='submit' className='button2' onClick={handleSubmit}>Save</button>
                                </div>
                            ) : (
                                <button type='button' className='button2' onClick={handleEdit}>Edit</button>
                            )}


                        </form>
                    </div>
                </div>

            </div>
            {isOpen && <ChangePassModal isOpen={isOpen} onClose={() => setIsOpen(false)} id={studentId} />}
        </div>
    )
}

export default Profile