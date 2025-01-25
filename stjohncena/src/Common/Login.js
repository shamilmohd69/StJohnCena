import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios';


const Login = () => {
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    const [error, setError] = useState('false')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:4000/login_p', { username, pass });
            if (res.data.type === 'admin') {
                window.location = '/admin/home'
                sessionStorage.setItem('adminid', res.data._id)
            }
            else if (res.data.type === 'student') {
                window.location = '/student/home'
                sessionStorage.setItem('studentid', res.data._id)
            }
            else if (res.data.type === 'staff') {
                window.location = '/staff/home'
                sessionStorage.setItem('staffid', res.data._id)
            }
        } catch (err) {
            setError('true')
        }
    }
    return (
        <div className='welcome'>
            <div className='title'>
                <h1>St. John Cena's College Of Science</h1>
            </div>

            <div className='divlog'>
                <Container style={{ maxWidth: "400px" }}>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='inf' style={{ width: "100%", marginBottom: "10px" }}>
                            <label>Username</label>
                            <input type="text" className='input' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='inf' style={{ width: "100%", marginBottom: "20px" }}>
                            <label>Password</label>
                            <input type="password" className='input' name='pass' value={pass} onChange={(e) => setPass(e.target.value)} />
                        </div>
                        <input type="submit" value="Login" className='loginbtn' />
                    </form>
                    {error === 'true' &&
                        <div className='error'>
                            <span>Incorrect Username or Password</span>
                        </div>
                    }
                </Container>
            </div>
        </div>
    )
}

export default Login
