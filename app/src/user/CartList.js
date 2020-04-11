import React, {useState, useEffect} from 'react';
import db from '../db.js';
import OrderItemAllCarts from "./OrderItemAllCarts";
import auth from "../auth";
  
export default () => {
    const [carts, setCarts] = useState([])

    useEffect(() => {
        handleGetCarts()
    }, [])

    const handleGetCarts = async () => {
        const cartlist = await db.orders.getByQueryNoFormat('user','getuser')
        console.log(cartlist)
        setCarts(cartlist)
    }

    return(
        auth.isLoggedIn() ?
        <div>
            <h1>Previous Carts</h1>
            {carts.map((item) =>
                <table key={item.id} style={{border:"1px solid white", marginBottom:"50px", width:"60vw"}}>
                    <h2>Order Number: {item.id}</h2>
                    <OrderItemAllCarts order_id={item.id}/>
                    <h4>Paid: {item.paid}</h4>
                    <h4>Total: </h4>
                </table>

            )}
        </div>
            :
            <h2 style={{textAlign:"center"}}>You are not logged in</h2>
    );
}