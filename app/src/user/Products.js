import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Normal from "./Normal";
import Custom from "./Custom";

export default ({product_id}) => {
    const [product, setProducts] = useState([]);

    useEffect(() => {
        handleGetAll()
    }, []);

    const handleGetAll = async () => {
        const products = await db.products.getUser(`${product_id}`);
        // console.log("products", products);
        setProducts(products);
        // console.log("products after set", products)
    };

    return (
        product &&
            <div>
                {
                    product.map(product =>
                        product.customId === null ? <Normal key={product.id} normalid={product.normalId}/>
                        : product.normalId === null ? <Custom key={product.id} customid={product.customId}/> :null
                    )
                }
            </div>
    );
}