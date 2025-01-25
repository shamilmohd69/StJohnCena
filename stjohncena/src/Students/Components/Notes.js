import React, { useState, useEffect } from 'react'
import './Comp.css'
import axios from 'axios'

import goto from '../Util/goto.svg'
import AskQuestionModal from './AskQuestionModal'

const Notes = ({ subject }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            if (subject && subject._id) {
                try {
                    const res = await axios.get(`http://localhost:4000/staff/view_notes?id=${subject._id}`);
                    setNotes(res.data.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
    }, [subject]);



    return (
        <div className='notes'>
            <div>
                <h3>{subject.name}</h3>
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div className='cnt' key={note._id}>
                            <h6>{note.title}</h6>
                            <p>{note.notes}</p>
                            <hr />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '5px',
                                    cursor: 'pointer',
                                    paddingTop: '5px',
                                }}
                                onClick={() => {
                                    setIsOpen(!isOpen);
                                    setSelectedNote(note);
                                }}
                            >
                                <h6>Ask Question</h6>
                                <img src={goto} alt="goto" />
                            </div>
                        </div>
                    ))
                ) : (
                    <p
                        style={{
                            textAlign: 'center',
                        }}>No notes available</p>
                )}
            </div>
            <AskQuestionModal isOpen={isOpen} onClose={() => setIsOpen(false)} notes={selectedNote} />
        </div>
    )
}

export default Notes