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
                name:
                {normal.name}
                desc:
                {normal.desc}
                type:
                {normal.type}
                price:
                {normal.price}

                {/*/!*Table Edition*!/*/}
                {/*<table>*/}
                {/*    <tr>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>desc</th>*/}
                {/*        <th>image</th>*/}
                {/*        <th>type</th>*/}
                {/*        <th>price</th>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td>{normal.name}</td>*/}
                {/*        <td>{normal.desc}</td>*/}
                {/*        <td>{normal.image}</td>*/}
                {/*        <td>{normal.type}</td>*/}
                {/*        <td>{normal.price}</td>*/}
                {/*    </tr>*/}
                {/*</table>*/}
            </header>
        </div>
    );
}