import React, { useState, useEffect } from 'react'
import './Admin.css'
import AdminSidebar from '../Components/AdminSidebar'
import SearchBar from '../Components/Searchbar'
import StaffModal from '../Components/StaffModal'
import StaffTable from '../Components/StaffTable'
import axios from 'axios'
import LeaveReqsModal from '../Components/LeaveReqsModal'

import mail from '../Components/utilities/mail.svg'

const ManageStaff = () => {

  const sidebarState = sessionStorage.getItem('sidebar') === 'true' || !sessionStorage.getItem('sidebar');

  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isReqOpen, setIsReqOpen] = useState(false);

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
        const res = await axios.get('http://localhost:4000/admin/view_staff');
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
            <h4>Total Staff : {data.length}</h4>
            <div style={{ display: 'flex' }}>
              <img src={mail} alt="mail" style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => setIsReqOpen(true)} />
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <button className='add' onClick={toggleModal}>Add Staff</button>
            </div>
          </div>
        </div>
        <StaffModal isOpen={isModalOpen} onClose={toggleModal} />

        <StaffTable data={data} searchQuery={searchQuery} />

        <LeaveReqsModal isOpen={isReqOpen} onClose={() => setIsReqOpen(false)} />
      </div>
    </div>
  )
}

export default ManageStaff