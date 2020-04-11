import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Button from "react-bootstrap/Button";

export default ({customid}) => {

    const [custom, setCustom] = useState("")

    useEffect(() => {
        handleGetAll()
    }, [])

    const handleGetAll = async () => {
        const custom = await db.customs.getUser(`${customid}`)
        setCustom(custom)
    }

    return (
        custom &&
        <div className="App">
            <header className="App-header">
                {custom.total} QAR <br />
                {custom.desc}
            </header>
        </div>
    );
}