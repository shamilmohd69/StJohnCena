import React, { useState } from 'react';
import { Carousel, Container } from 'react-bootstrap';

import './utilities/Welc_caro.css'

import caro1 from './utilities/caro1.jpg'
import caro2 from './utilities/caro2.jpg'
import caro3 from './utilities/caro3.jpg'
import caro4 from './utilities/caro4.jpg'
import caro5 from './utilities/caro5.jpg'


const WelcCaro = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <Container style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img src={caro1} alt="" className='caro' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={caro2} alt="" className='caro' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={caro3} alt="" className='caro' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={caro4} alt="" className='caro' />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={caro5} alt="" className='caro' />
                </Carousel.Item>
            </Carousel>

        </Container>
    )
}

export default WelcCaro