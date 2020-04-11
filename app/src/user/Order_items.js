import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Products from "./Products";
import Button from "react-bootstrap/Button";

export default ({order_id,orderUpdater}) => {

    const [order_item, setOrder_items] = useState([])

    useEffect(() => {
        handleGetAll()
    }, [])

    const handleGetAll = async () => {
        const order_items = await db.order_items.getUser(`${order_id}`)
        let order = await db.orders.getUser('')
        // console.log("order_items", order_items)
        setOrder_items(order_items)
        orderUpdater(order)
        // console.log("order_items after set", order_items)
    }

    const deleteOrderItem = async (order_item) => {
        
        let orderItem = await db.order_items.getUser(`getone/${order_item.id}`)
        await db.order_items.deleteById('user', order_item.id)

        let product = await db.products.getUser(orderItem.productId)
        let order = await db.orders.getUser('')
        console.log('getting order', order)
        if (!product[0].normalId) {
            let custom = await db.customs.getUser(product[0].customId)
            order.total -= custom.total
        }else if(!product[0].customId){
            let normal = await db.normal.getUser(product[0].normalId)
            order.total -= normal.price
        }
        console.log("the order im sending",order)
        await db.orders.saveNoFormat('user',order)

        await handleGetAll()
    }

    return (
        order_item &&
        <>
            {
                order_item.map(order_item =>
                    <tr>
                        <Products key={order_item.id} product_id={order_item.productId}/>
                        <Button onClick={() => deleteOrderItem(order_item)}>Delete</Button>
                    </tr>
                )
            }
        </>
    );
}