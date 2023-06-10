import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import carousel1 from '../assets/carousel1.png'
import carousel2 from '../assets/carousel2.png'
import carousel3 from '../assets/carousel3.png'


const Carousels = () => {
    return (
        <Carousel fade>
            <Carousel.Item interval={3000} style={{ maxHeight: "800px" }}>
                <img
                    style={{ filter: "brightness(40%)" }}
                    className="d-block w-100"
                    src={carousel1}
                    alt="First slide"
                />
                <Carousel.Caption style={{ top: "240px" }}>
                    <h1>Хочешь так же?</h1>
                    <h4>Тогда приходи к нам на обучение</h4>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000} style={{ maxHeight: "800px" }}>
                <img
                    style={{ filter: "brightness(40%)" }}
                    className="d-block w-100"
                    src={carousel2}
                    alt="Second slide"
                />
                <Carousel.Caption style={{ top: "240px" }}>
                    <h1>Хочешь так же?</h1>
                    <h4>Тогда приходи к нам на обучение</h4>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={3000} style={{ maxHeight: "800px" }}>
                <img
                    style={{ filter: "brightness(40%)" }}
                    className="d-block w-100"
                    src={carousel3}
                    alt="Third slide"
                />
                <Carousel.Caption style={{ top: "240px" }}>
                    <h1>Хочешь так же?</h1>
                    <h4>Тогда приходи к нам на обучение</h4>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Carousels;