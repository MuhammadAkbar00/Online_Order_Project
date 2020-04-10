import React, { useEffect, useState } from 'react'
import Carousel from "react-bootstrap/Carousel"
import db from '../db.js'

export default () => {

    const [images, setImages] = useState([])

    useEffect(()=>{
        getImages()
    },[])
    
    const getImages = async() => {
        let images = await db.normal.getPublic('images');
        setImages(images)
    }


    return  (
        <Carousel>
            {images &&
                images.map(item=>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={require(`../images/${item}`)}
                            width={"850px"}
                            height={"450px"}
                            alt=""
                        />
                    </Carousel.Item>
                )
            }
        </Carousel>
    )
}