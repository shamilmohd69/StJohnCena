import React, { useState, useEffect } from 'react';
import './Admin.css';
import AdminSidebar from '../Components/AdminSidebar';

import { Chart } from "react-google-charts";

const Home = () => {
  const sidebarState = sessionStorage.getItem('sidebar') === 'true' || !sessionStorage.getItem('sidebar');
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);

  const [studentCount, setStudentCount] = useState(0);
  const [totalBoys, setTotalBoys] = useState(0);
  const [totalGirls, setTotalGirls] = useState(0);
  const [staff, setStaff] = useState([]);
  const [malestaff, setMalestaff] = useState(0);
  const [femalestaff, setFemalestaff] = useState(0);
  const [complaint, setComplaint] = useState([]);
  const [dept, setDept] = useState([]);
  const [course, setCourse] = useState([]);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    sessionStorage.setItem('sidebar', newState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch Student Data
        const studentRes = await fetch('http://localhost:4000/admin/view_std');
        const studentData = await studentRes.json();
        setStudentCount(studentData.data.length);
        setTotalBoys(studentData.data.filter(student => student.gender.toLowerCase() === 'male').length);
        setTotalGirls(studentData.data.filter(student => student.gender.toLowerCase() === 'female').length);

        //fetch Complaint

        const complaint = await fetch('http://localhost:4000/admin/view_complaint');
        const cmpno = await complaint.json();
        setComplaint(cmpno.data);


        // Fetch Staff Data
        const staffRes = await fetch('http://localhost:4000/admin/view_staff');
        const staffData = await staffRes.json();
        setStaff(staffData.data);
        setMalestaff(staffData.data.filter(staffMember => staffMember.gender.toLowerCase() === 'male').length);
        setFemalestaff(staffData.data.filter(staffMember => staffMember.gender.toLowerCase() === 'female').length);

        // Fetch Department Data
        const deptRes = await fetch('http://localhost:4000/admin/view_dept');
        const deptData = await deptRes.json();
        setDept(deptData.data);

        // Fetch Course Data
        const courseRes = await fetch('http://localhost:4000/admin/viewall_course');
        const courseData = await courseRes.json();
        setCourse(courseData.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const bgPercent = studentCount > 0 ? (totalBoys / studentCount) * 100 : 0;
  const staffPercent = staff.length > 0 ? (malestaff / staff.length) * 100 : 0;

  const unsolved = complaint.filter(complaint => complaint.reply === null).length;



  const staffCount = [
    ['Designation', 'Count'],
    ['Professor', staff.filter(staffMember => staffMember.designation === 'Professor').length],
    ['Assistant Professor', staff.filter(staffMember => staffMember.designation === 'Assistant Professor').length],
    ['Lecturer', staff.filter(staffMember => staffMember.designation === 'Lecturer').length],
    ['Teaching Assistant', staff.filter(staffMember => staffMember.designation === 'Teaching Assistant').length],
    ['Lab Assistant', staff.filter(staffMember => staffMember.designation === 'Lab Assistant').length],
    ['Lab Incharge', staff.filter(staffMember => staffMember.designation === 'Lab Incharge').length],
  ]

  return (
    <div className="adhome admin">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="title">
          <h1>St. John Cena's College Of Science</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className='std'>
            <div className='stdleft'>
              <div style={{ width: '100%' }}>
                <h5>Students Overview</h5>
                <div className='std1'>
                  <h6>Total Students</h6>
                  <h1>{studentCount}</h1>
                </div>
              </div>
            </div>
            <div className='stdright'>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <h6>Boys</h6>
                  <h1>{totalBoys}</h1>
                </div>
                <div>
                  <h6>Girls</h6>
                  <h1>{totalGirls}</h1>
                </div>
              </div>
              <progress max="100" value={bgPercent} />
            </div>
          </div>
          <div className='dept'>
            <div className='deptleft'>
              <h5>Departments</h5>
              <div className='dept1'>
                <div className='d1'>
                  <h6>Total Departments</h6>
                  <h1>{dept.length}</h1>
                </div>
                <div className='d2'>
                  <h6>Total Courses</h6>
                  <h1>{course.length}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', height: '100%' }}>
          <div className="staff1" style={{ flex: 1, maxHeight: '350px' }}>
            <h5>Staff Overview</h5>
            <Chart
              chartType="PieChart"
              data={staffCount}
              options={{
                backgroundColor: 'none',
                titleTextStyle: {
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: 'Arial, sans-serif',
                },
                legend: {
                  alignment: 'center',
                  textStyle: {
                    color: 'white',
                    fontSize: 12,
                  },
                },
                colors: ["#ff6500", "#2964d6", "#280051", "#222222", "#ff0081", "rgb(70,0,0)", "#5000a0"],
              }}
              width="100%"
              height="100%"
            />
          </div>
          <div style={{ width: '50%' }}>
            <div className='staff2'>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className='staffleft'>
                  <h5>Staff Details</h5>
                  <div className='s1'>
                    <h6>Total Staff</h6>
                    <h1>{staff.length}</h1>
                  </div>
                </div>
                <div className='staffright'>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', textAlign: 'center' }}>
                    <div>
                      <h6>Male</h6>
                      <h1>{malestaff}</h1>
                    </div>
                    <div>
                      <h6>Female</h6>
                      <h1>{femalestaff}</h1>
                    </div>
                  </div>
                  <progress max="100" value={staffPercent} />
                </div>
              </div>
            </div>
            <div style={{ width: '100%' }}>
              <div className='comp mt-2'>
                <h5>Complaints</h5>
                <div className='cmp'>
                  <div className='c1'>
                    <h6>Total Complaints</h6>
                    <h1>{complaint.length}</h1>
                  </div>
                  <div className='c2'>
                    <h6>Resolved Complaints</h6>
                    <h1>{complaint.length - unsolved}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
