import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import Auth from "../../auth";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

export default () => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return (
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
            {
                rating <= 0
                    ?
                    <div>
                        <p>0 star rating.</p>
                    </div>
                    :
                    <div>
                        <p>{rating} star rating.</p>
                    </div>
            }
        </div>
    );
}