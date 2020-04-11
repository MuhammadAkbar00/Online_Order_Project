import React, {useEffect, useState} from 'react';
import { FaStar } from 'react-icons/fa'
import Auth from "../../auth";
import Nav from "react-bootstrap/Nav";
import {Link, useHistory, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import db from "../../db";
import auth from "../../auth";

export default (props) => {
    // const { id } = useParams();
    const history = useHistory();

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [id, setId] = useState(null)

    useEffect(() => {
        handleGetId()
    }, [])
    
    // const checkIfSaved = async(id) => {
    //     const check = await db.review.getByQueryNoFormat('user', id)
    //     console.log(check)
    //     if(check.length > 0) {
    //         return history.push(`/menu`)
    //     }
    // }

    const handleGetId = () => {
        const id = history.location.pathname.split("/")[2]
        console.log(id)
        setId(id)
        // checkIfSaved(id)
    }
    const saveReview = async (saveId) => {
        let ids = parseInt(saveId)
        let rate = {
            orderId:ids,
            stars:rating
        }
        console.log(rate)
        await db.review.saveNoFormat('user',rate);
        return history.push(`/menu`)
    }

    return (
        auth.isLoggedIn() ?
        <div className={"review"}>
            <h2 style={{textAlign:"center", color:"lightskyblue"}}>Leave a review</h2>
        <div className={"rating"}>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1


                return <label>
                    <input
                        type={"radio"}
                        name={"rating"}
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                        className={"star"}
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        size={100}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                    />
                </label>
            })
            }
        </div>
            {
                rating <= 0
                    ?
                    <div>
                        <p style={{textAlign:"center"}}>0 star rating</p>
                    </div>
                    :
                    <div>
                        <p style={{textAlign:"center"}}>{rating} star rating.</p>
                    </div>
            }
            <Button variant="outline-primary" onClick={() => saveReview(id)}>Submit</Button>
        </div>
            :
            <h2 style={{textAlign:"center"}}>You are unauthorized to reach this page</h2>
    );
}