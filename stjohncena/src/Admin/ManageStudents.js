import React, { useState, useEffect } from 'react';
import './Admin.css';
import AdminSidebar from '../Components/AdminSidebar';
import StudentsTableAll from '../Components/StudentsTableAll';
import SearchBar from '../Components/Searchbar';
import StudentModal from '../Components/StudentModal';
import axios from 'axios';

const ManageStudents = () => {

  const sidebarState = sessionStorage.getItem('sidebar') === 'true' || !sessionStorage.getItem('sidebar');

  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState([]);


  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      sessionStorage.setItem('sidebar', newState);
      return newState;
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/admin/view_std');
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };
    fetchData();
}, []);


  return (
    <div className='admin adstd'>
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="title">
          <h1>St. John Cena's College Of Science</h1>
        </div>

        <div className='div0'>
          <div className='d1'>
            <h4>Total Students : {data.length}</h4>
            <div style={{ display: 'flex' }}>
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <button className='add' onClick={toggleModal}>Add Student</button>
            </div>
          </div>
        </div>

        <StudentsTableAll searchQuery={searchQuery} data={data} />

        <StudentModal isOpen={isModalOpen} onClose={toggleModal} />
      </div>
    </div>
  );
};

export default ManageStudents;
