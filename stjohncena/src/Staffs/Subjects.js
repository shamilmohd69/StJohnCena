import React, { useState, useEffect } from 'react'
import goto from './Util/goto.svg'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import NotesModal from './Components/NotesModal';
import ViewDoubts from './Components/ViewDoubts';
import AttendanceModal from './Components/AttendanceModal';

const Subjects = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [addAttendance, setAddAttendance] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('subject');

  const [data, setData] = useState([]);
  const [selectedNote, setSelectedNote] = useState('');
  const [sub, setSub] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/staff/view_sub?id=${subject}`);
        setSub(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [subject]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/staff/view_notes?id=${subject}`);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [subject]);


  return (
    <div className='staff staffsub'>
      <div className='main-content'>
        <div className='title'>
          <h1>St John Cena's College Of Science</h1>
        </div>
        <div className='subject'>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <h4>{sub.name}</h4>
            <div>
              <button
                className='add2'
                onClick={() => setAddAttendance(!addAttendance)}
              >
                Take Attendance
              </button>
              <button
                className='add'
                onClick={() => setAddNote(!addNote)}
              >Add Notes</button>
            </div>
          </div>
          <hr />
          {data.map((item, index) => (
            <div className='cnt' key={item._id || index}>
              <h6>{item.title}</h6>
              <p>{item.notes}</p>
              <hr
                style={{
                  marginBottom: '0px'
                }} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  paddingBottom: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setIsOpen(!isOpen)
                  setSelectedNote(item)
                }}
              >
                <h6>View Doubts</h6>
                <img src={goto} alt="goto" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <NotesModal
        isOpen={addNote}
        onClose={() => setAddNote(false)}
        subject={sub._id}
      />
      <ViewDoubts
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        data={selectedNote}
      />
      <AttendanceModal
        isOpen={addAttendance}
        onClose={() => setAddAttendance(false)}
        subject={sub._id}
      />
    </div>
  )
}

export default Subjects