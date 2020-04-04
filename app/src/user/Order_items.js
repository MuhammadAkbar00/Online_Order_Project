import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Products from "./Products";

export default ({order_id}) => {

    const [order_item, setOrder_items] = useState([])

    useEffect(() => {
        handleGetAll()
    }, [])


    const handleGetAll = async () => {
        const order_items = await db.order_items.getUser(`${order_id}`)
        // console.log("order_items", order_items)
        setOrder_items(order_items)
        // console.log("order_items after set", order_items)
    }

    return (
        order_item &&
        <table>
                {
                    order_item.map(order_item => <tr> <Products key={order_item.id} product_id={order_item.productId}/> </tr>)
                }
        </table>
    );
}