import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Normal from "./Normal";

export default ({product_id}) => {

    const [product, setProducts] = useState([])
    // const [result, setResult] = useState("")

    useEffect(() => {
        handleGetAll()
    }, [])


    const handleGetAll = async (event) => {
        const products = await db.products.getUser(`${product_id}`)
        console.log("products", products)
        setProducts(products)
        console.log("products after set", products)
        // handleType(products)
    }

    // const handleType = async (event) => {
    //
    //     if (event.custom_id != null) {
    //         console.log("custom is not null");
    //         //do custom stuff here
    //     } else {
    //         console.log("custom is null");
    //         console.log("##########products.normal_id",event.);
    //         //do normal stuff here
    //         // const result = await db.normal.getUser(`${products.normal_id}`)
    //         // const result = event.forEach(event => db.normal.getUser(`${event.normal_id}`))
    //         // setResult(result)
    //     }
    // }


    return (
        product &&
        <div className="App">
            <header className="App-header">
                {
                    product.map(product => <Normal key={product.id} normalid={product.normal.id}/> )
                }
            </header>
        </div>
    );
}