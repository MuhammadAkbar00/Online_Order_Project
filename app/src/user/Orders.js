import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Order_items from "./Order_items";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

export default () => {

    const [order, setOrder] = useState(null)
    const [editId, setEditId] = useState("")
    const [userId, setUserId] = useState(null)
    const [branchId, setBranchId] = useState(null)
    const [date, setDate] = useState(null)
    const [total, setTotal] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [paid, setPaid] = useState(null)
    const [lastAccess, setLastAccess] = useState(null)
    const [dineIn, setDineIn] = useState(null)


    useEffect(() => {
        handleGetOrder()
    }, [])

    // const zeroPad = (num, places) => String(num).padStart(places, '0')
    // const getDateFormatted = () => {
    //     const today = new Date();
    //     let month=0;
    //     let day=0;
    //     if(today.getMonth() < 10){
    //         month = zeroPad(today.getMonth(),2);
    //     }else{
    //         month = today.getMonth() + 1;
    //     }
    //     if(today.getDate() < 10){
    //         day = zeroPad(today.getDate(),2);
    //     }else{
    //         day = today.getDate();
    //     }
    //     return today.getFullYear() + '-' + month + '-' + day;
    // }

    const handleGetOrder = async () => {
        // const branch = await db.branches.getPublic("")
        const user = await db.users.getUser("loggeduser");
        const order = await db.orders.getUser(`${user.id}`);

        /////////////////////////////////////////////////////////////////////
        //              CREATING NEW CART THROUGH FRONT-END
        // const date = getDateFormatted();
        // let myOrder = await order.text();
        // console.log("order",myOrder)
        // if (!myOrder) {
        //         await db.orders.saveNoFormat('user',
        //             {
        //                 userId: user.id,
        //                 branchId: 1,
        //                 date: date,
        //                 total: 0,
        //                 paymentMethod: 'C',
        //                 paid: 'N',
        //                 lastAccess: date,
        //                 dinein: 'Y'
        //             }
        //         );
        //     // console.log("after save")
        // }
        // console.log("user", user)
        // console.log("orders", order)
        // order = await db.orders.getByQueryRaw('user',`${user.id}`);
        // order = await order.json();
        setOrder(order);
        // console.log("user after set", user)
        // console.log("orders after set", order)
    }

    const userCheckout = async (order) => {
        // try if paid is y "create new order" button which register user again
        const user = await db.users.getUser("loggeduser");
        // const order = await db.orders.getUser(`${user.id}`);
        console.log("order paid before set ", order.paid)
        order.paid = 'Y';
        console.log("order paid after set ", order.paid)
        await db.orders.saveNoFormat('user',
            {
                order
            }
        );
        await handleGetOrder()
    }

    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value)
    }

    const handleDineIn = (event) => {
        setDineIn(event.target.value)
    }

    return (
        order &&
        <div className="App">
            <header className="App-header">
                <h1>My Cart</h1>
                <dl>
                    <dt>Date</dt>
                    <dd>{order.date}</dd>
                    <dt>Total</dt>
                    <dd>{order.total}</dd>
                    <dt>Payment Method</dt>
                    <dd>{order.paymentMethod}</dd>
                    {/*<Form.Control type={onselect} placeholder="paymentMethod" onChange={handlePaymentMethod} >*/}
                    {/*    <option value={'C'}>C</option>*/}
                    {/*    <option value={'K'}>K</option>*/}
                    {/*</Form.Control>*/}
                    <dt>Paid</dt>
                    <dd>{order.paid}</dd>
                    <dt>Last Access Date</dt>
                    <dd>{order.lastAccess}</dd>
                    <dt>Dine in</dt>
                    <dd>{order.dinein}</dd>
                    {/*<Form.Control type={onselect} placeholder="paymentMethod" onChange={handleDineIn}>*/}
                    {/*    <option value={'N'}>N</option>*/}
                    {/*    <option value={'Y'}>Y</option>*/}
                    {/*</Form.Control>*/}
                </dl>
                <Order_items order_id={order.id}/>

                {/*Add if statement to check if there is orders for this user if not dont show check out button*/}
                <Button onClick={() => userCheckout(order)}>Check Out!</Button>
            </header>
        </div>
    );
}