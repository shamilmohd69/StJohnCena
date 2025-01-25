import React, { useState, useEffect } from 'react'
import './Staff.css'
import axios from 'axios'

import key from './Util/chngpass.svg';

import ChangePassModal from '../Students/Components/ChangePassModal';

const Profile = () => {

    const staffId = sessionStorage.getItem('staffid');

    const [isOpen, setIsOpen] = useState(false);

    const [staffData, setStaffData] = useState({
        empId: "",
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        course: "",
        img: "",
    });

    const [editedData, setEditedData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        img: "",
    });

    const [originalData, setOriginalData] = useState({
        empId: "",
        email: "",
        firstname: "",
        lastname: "",
        age: "",
        gender: "",
        img: "",
    });

    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (staffId) {
                try {
                    const res = await axios.get(`http://localhost:4000/staff/view_staff?id=${staffId}`);
                    const stf = res.data.data;

                    setStaffData(stf);
                    setEditedData(stf);
                    setOriginalData(stf);
                } catch (err) {
                    console.error("Error fetching staff data:", err);
                }
            }
        };

        fetchData();
    }, [staffId]);

    const handleEdit = () => {
        if (!isEditable) {
            setOriginalData({ ...staffData });
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
                `http://localhost:4000/staff/edit_staff?id=${staffId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.status === "ok") {
                setIsEditable(false);
                console.log("Updated staff data:", res.data.staff);
                window.location.reload();
            } else {
                console.error("Error updating staff:", res.data.error);
            }
        } catch (err) {
            console.error("Error submitting data:", err);
        }
    };

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
        <div className='staff staffprof'>
            <div className='main-content'>
                <div className='title'>
                    <h1>St John Cena's College Of Science</h1>
                    <img src={key} alt="" onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }} />
                </div>
                <div className='profile'>
                    <div className='profile-content'>
                        <form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <div>
                                <label htmlFor="file-input">
                                    <img
                                        src={
                                            selectedImage ||
                                            (staffData.img ? `http://localhost:4000/img/${staffData.img}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png')
                                        }
                                        alt="profile"
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
                                marginTop: '20px',
                            }}>
                                <div className='form-group'>
                                    <label>Employee ID :</label>
                                    <input type='text' className='form-control' value={staffData.empId} readOnly style={{
                                        cursor: 'default'
                                    }} />
                                </div>
                                <div className='form-group'>
                                    <label>Email :</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        value={isEditable ? editedData.email ?? '' : staffData.email ?? ''}
                                        readOnly={!isEditable}
                                        onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                        style={!isEditable ? { cursor: 'default' } : { cursor: 'text' }}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>First Name :</label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={isEditable ? editedData.firstname ?? '' : staffData.firstname ?? ''}
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
                                        value={isEditable ? editedData.lastname ?? '' : staffData.lastname ?? ''}
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
                                        value={isEditable ? editedData.age ?? '' : staffData.age ?? ''}
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
                                        value={staffData.gender}
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
            {isOpen && <ChangePassModal isOpen={isOpen} onClose={() => setIsOpen(false)} id={staffId} />}
        </div>
    )
}

export default Profile