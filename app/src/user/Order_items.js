import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Products from "./Products";
import Button from "react-bootstrap/Button";

// takes a an order ID parameter to get all the information for that specific order
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

    const deleteOrderItem = async (order_item) => {
        await db.order_items.deleteById('user', order_item.id)
        handleGetAll()
    }

    return (
        order_item &&
        <table key={order_item.id}>
            {
                order_item.map(order_item =>
                    <tr>
                        <Products key={order_item.id} product_id={order_item.productId}/>
                        <Button onClick={() => deleteOrderItem(order_item)}>Delete</Button>
                    </tr>
                )
            }
        </table>
    );
}