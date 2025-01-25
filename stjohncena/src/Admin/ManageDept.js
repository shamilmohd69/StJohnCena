import React, { useState, useEffect } from 'react';
import './Admin.css';
import AdminSidebar from '../Components/AdminSidebar';
import AddDept from '../Components/AddDept';
import AddCourse from '../Components/AddCourse';
import CourseDetailsModal from '../Components/CourseDetailsModal';
import EditDept from '../Components/EditDept';
import axios from 'axios';

import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const ManageDept = () => {

  const sidebarState = sessionStorage.getItem('sidebar') === 'true' || !sessionStorage.getItem('sidebar');

  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCourseDetailsOpen, setIsCourseDetailsOpen] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => {
      const newState = !prevState;
      sessionStorage.setItem('sidebar', newState);
      return newState;
    });
  };

  const toggleDeptModal = () => setIsDeptModalOpen(!isDeptModalOpen);
  const toggleCourseModal = () => setIsCourseModalOpen(!isCourseModalOpen);
  const toggleCourseDetailsModal = () => setIsCourseDetailsOpen(!isCourseDetailsOpen);
  const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);

  const [dept, setDept] = useState([]);
  const [course, setCourse] = useState([]);




  useEffect(() => {
    axios.get('http://localhost:4000/admin/view_dept')
      .then((res) => setDept(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  const handleCourseClick = (courseDetails) => {
    setSelectedCourseDetails(courseDetails);
    setIsCourseDetailsOpen(true);
  };


  const addNewDepartment = (newDept) => {
    if (newDept) {
      setDept((prevDept) => [...prevDept, newDept]);
    } else {
      window.location.reload();
    }
  };

  const fetchCourses = async (departmentId) => {
    try {
      const res = await axios.get('http://localhost:4000/admin/view_course?dept=' + departmentId);
      setCourse(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedDepartment) {
      fetchCourses(selectedDepartment._id);
    }
  }, [selectedDepartment]);

  const handleDltDept = async (id) => {
    try {
      const res = await axios.get('http://localhost:4000/admin/delete_dept?id=' + id);
      if (res.data.status === 'ok') {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='admin addpt'>
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="title">
          <h1>St. John Cena's College Of Science</h1>
        </div>

        <div className='div1'>
          <div className='div0'>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '10px', color: 'antiquewhite' }}>
              <h4>Departments</h4>
              <div style={{ display: 'flex', alignItems: "end" }}>
                <h6>Total Departments: {dept.length}</h6>
                <button className='add' onClick={toggleDeptModal}>Add Department</button>
              </div>
            </div>
            <div className='d1'>
              <ul className='ul1 mt-2'>
                {dept.map((department) => (
                  <li
                    key={department._id}
                    onClick={() => handleDepartmentClick(department)}
                    style={{
                      cursor: 'pointer',
                      color: selectedDepartment && selectedDepartment._id === department._id ? 'lightblue' : 'antiquewhite',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    {department.name}<div>
                      <button style={{
                        color: 'blue',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                        onClick={toggleEditModal}>
                        <RiEditFill />
                      </button>
                      {/* edit */}
                      <button style={{
                        color: 'red',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                      }}
                        onClick={() => {
                          const confirmed = window.confirm('Are you sure you want to delete this department?');
                          if (confirmed) {
                            handleDltDept(department._id);
                          }
                        }}
                      ><MdDelete /></button>
                      {/* delete */}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedDepartment && (
            <div className='div0'>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black', paddingBottom: '10px', color: 'antiquewhite' }}>
                <h4>Course</h4>
                <div style={{ display: 'flex', alignItems: "end" }}>
                  <h6 >Total Courses: {course.length}</h6>
                  <button className='add' onClick={toggleCourseModal}>Add Courses</button>
                </div>
              </div>
              <div className='d1'>
                <ul className='ul1 mt-2'>
                  {course.map((courseDetails) => (
                    <li
                      key={courseDetails._id}
                      onClick={() => handleCourseClick(courseDetails)}
                      style={{ cursor: 'pointer' }}
                    >
                      {courseDetails.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {isDeptModalOpen &&
          <AddDept
            isOpen={isDeptModalOpen}
            onClose={toggleDeptModal}
            onAddDepartment={addNewDepartment}
          />}
        {isCourseModalOpen && (
          <AddCourse
            isOpen={isCourseModalOpen}
            onClose={toggleCourseModal}
            selectedDepartmentId={selectedDepartment?._id}
            onCourseAdded={() => fetchCourses(selectedDepartment._id)}
          />
        )}
        {isCourseDetailsOpen && selectedCourseDetails && (
          <CourseDetailsModal
            isOpen={isCourseDetailsOpen}
            onClose={toggleCourseDetailsModal}
            courseDetails={selectedCourseDetails}
          />
        )}
        {isEditModalOpen && selectedDepartment && (
          <EditDept
            isOpen={isEditModalOpen}
            onClose={toggleEditModal}
            selectedDepartmentId={selectedDepartment._id} />
        )}
      </div>
    </div>
  );
};

export default ManageDept;
