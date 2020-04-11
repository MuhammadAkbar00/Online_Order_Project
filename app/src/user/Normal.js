import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Button from "react-bootstrap/Button";

export default ({normalid}) => {

    const [normal, setNormal] = useState("")

    useEffect(() => {
        handleGetAll()
    }, [])

    const handleGetAll = async () => {
        const normal = await db.normal.getUser(`${normalid}`)
        // console.log("normal", normal)
        setNormal(normal)
        // console.log("normal after set", normal)
    }

    return (
        normal &&
        <div className="App">
            <header className="App-header">
                <img style={{width:"100px", height:"100px", float:"left",display:"block"}} src={ require(`../images/${normal.image}`) } />
                {normal.price} QAR <br/>
                {normal.name}
            </header>
        </div>
    );
}