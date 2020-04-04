import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Normal from "./Normal";

export default ({product_id}) => {
    const [product, setProducts] = useState([])

    useEffect(() => {
        handleGetAll()
    }, [])

    const handleGetAll = async (event) => {
        const products = await db.products.getUser(`${product_id}`)
        console.log("products", products)
        setProducts(products)
        console.log("products after set", products)
    }

    return (
        product &&
            <div>
                {
                    product.map(product =><Normal key={product.id} normalid={product.normal.id}/>)
                }
            </div>
    );
}