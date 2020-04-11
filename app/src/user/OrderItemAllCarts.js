import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Products from "./Products";
import Button from "react-bootstrap/Button";

export default ({order_id}) => {

    const [order_item, setOrder_items] = useState([])

    useEffect(() => {
        handleGetAll()
    }, [])

    const handleGetAll = async () => {
        const order_items = await db.order_items.getUser(`${order_id}`)
        setOrder_items(order_items)
    }

    return (
        order_item &&
        <>
            {
                order_item.map(order_item =>
                    <tr>
                        <Products key={order_item.id} product_id={order_item.productId}/>
                    </tr>
                )
            }
        </>
    );
}