import React, { useState, useEffect } from 'react'
import './Welcome.css'
import WelcCaro from '../Components/Welc_caro'
import { Container } from 'react-bootstrap'
import axios from 'axios'

const Welcome = () => {

    const [dept, setDept] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/admin/view_dept')
            .then((res) => setDept(res.data.data))
            .catch((err) => console.log(err));
    }, []);
    

    return (
        <div className='welcome'>
            <div className='title'>
                <h1>St. John Cena's College Of Science</h1>

                <a href='/login'>Login</a>
            </div>
            <div>
                <WelcCaro />
            </div>
            <Container>
                <div style={{ paddingBottom: "20px" }}>
                    <h4 style={{ marginTop: "30px" }}>
                        Departments
                    </h4>
                    {dept.map((item) => (
                        <ul style={{ textAlign: "justify", fontSize: "16px",  }} key={item._id}>
                            {item.name}
                        </ul>
                    ))}
                </div>
                <div style={{ paddingBottom: "20px" }}>
                    <h4 style={{ marginTop: "10px" }}>
                        About Us
                    </h4>
                    <p style={{ textAlign: "justify", fontSize: "16px" }}>
                        Welcome to St. John Cena's, a school built on a foundation of excellence, innovation, and dedication. We are committed to providing a well-rounded education that nurtures the mind, body, and spirit of each student. <br />
                        At St. John Cena's, we believe in fostering a safe, inclusive, and inspiring environment where students can explore their unique strengths and interests. Our curriculum emphasizes academic rigor balanced with creative arts, physical education, and character-building activities, allowing each child to grow holistically. <br />
                        Our faculty consists of experienced and passionate educators who are dedicated to guiding students on their educational journeys. We utilize modern teaching techniques, technology, and collaborative learning approaches to ensure that our students are well-prepared for future academic pursuits and personal growth. <br />
                        St. John Cena's is more than just a school—it's a community that values respect, integrity, and kindness. We pride ourselves on supporting every student in becoming a lifelong learner, critical thinker, and responsible global citizen. <br />
                        Thank you for being part of the St. John Cena's journey, where every student’s potential is encouraged, and every success is celebrated. <br />

                    </p>
                </div>
            </Container>
        </div>
    )
}

export default Welcome