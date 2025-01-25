import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

import Notes from './Components/Notes';


const Subjects = () => {

  const location = useLocation();
  const subjects = location.state?.filteredSubjects || [];

  const [isSubjectSelected, setIsSubjectSelected] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('')
  

  return (
    <div className='student stdsub'>
      <div className='main-content'>
        <div className='title'>
          <h1>St John Cena's College Of Science</h1>
        </div>
        <h4>Subjects and Notes</h4>
        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}>
          <div className='subjects'>
            {subjects.map((subject, index) => (
              <p
                key={index}
                onClick={() => {
                  setIsSubjectSelected(true)
                  setSelectedSubject(subject)
                }}
                style={{
                  cursor: 'pointer'
                }}>
                {subject.name}</p>
            ))}
          </div>
          {isSubjectSelected &&
            <Notes subject={selectedSubject} />
          }
        </div>
      </div>
    </div>
  )
}

export default Subjects