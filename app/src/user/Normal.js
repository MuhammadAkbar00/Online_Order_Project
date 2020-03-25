import React, {useState, useEffect} from 'react';
import db from '../db.js';

export default ({normalid}) => {

    const [normal, setNormal] = useState("")

    useEffect(() => {
        handleGetAll()
    }, [])

    const handleGetAll = async (event) => {
        const normal = await db.normal.getUser(`${normalid}`)
        console.log("normal", normal)
        setNormal(normal)
        console.log("normal after set", normal)
        // handleType(products)
    }


    return (
        normal &&
        <div className="App">
            <header className="App-header">
                name:
                {normal.name}
            </header>
        </div>
    );
}