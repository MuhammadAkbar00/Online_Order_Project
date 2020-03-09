import React from 'react';
import Carousel from "react-bootstrap/Carousel";

export default () => {
    return  (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/random"
                    width={"800px"}
                    height={"450px"}
                    alt="First slide"
                />
            {/*    <Carousel.Caption>*/}
            {/*        <h3>First slide label</h3>*/}
            {/*        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
            {/*    </Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://source.unsplash.com/random"
                    width={"1600px"}
                    height={"900px"}
                    alt="Third slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block mw-100"
                    src="https://source.unsplash.com/random"

                    alt="Third slide"
                />

            {/*    <Carousel.Caption>*/}
            {/*        <h3>Third slide label</h3>*/}
            {/*        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
            {/*    </Carousel.Caption>*/}
            </Carousel.Item>
        </Carousel>
    )
}