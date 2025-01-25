import React from 'react'
import './Student.css'

const Notification = () => {
    return (
        <div className='student stdnotif'>
            <div className='main-content'>
                <div className='title'>
                    <h1>St John Cena's College Of Science</h1>
                </div>
                <div
                    style={{ display: 'flex', gap: '20px' }}
                >
                    <div className='cnt'>
                        <h5>Upcoming Events</h5>
                        <hr />
                    </div>
                    <div className='cnt'>
                        <h5>Announcements / Notifications</h5>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification