import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Order_items from "./Order_items";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Auth from '../auth'
import {
    Redirect, useHistory
} from "react-router-dom"
  
export default (prop) => {

    let returnUrl = "orders"
    const history = useHistory();
    //Coupon
    const [coupon, setCoupon] = useState(null)
    const [discountMessage, setDiscountMessage] = useState("")


    const [order, setOrder] = useState(null)
    const [user , setUser] = useState(null)
    
    const [editId, setEditId] = useState("")
    const [userId, setUserId] = useState(null)
    const [branchId, setBranchId] = useState(null)
    const [date, setDate] = useState(null)
    const [total, setTotal] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [paid, setPaid] = useState(null)
    const [lastAccess, setLastAccess] = useState(null)
    const [dineIn, setDineIn] = useState(null)
    
    const [home, setHome] = useState(false)

    useEffect(() => {
        handleGetOrder()
        handleGetCouponCode()
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
        
        const user = await db.users.getUser("loggeduser");
        setUser(user)
        const order = await db.orders.getUser(``);
        console.log('order id sent', order.id)
        setOrder(order);

    }

    const handleGetCouponCode = async () => {
        const coupCode = history.location.search.substring(1)
        console.log(coupCode != "")
        if(coupCode != ""){
            const coupon = await db.coupons.getByQueryNoFormat('user',`/code/${coupCode}`)
            console.log(coupon)
            if(coupCode != null){
                setCoupon(coupon)
                setDiscountMessage(coupon.discount + "% Discount being used")
            }
        }
    }


    const userCheckout = async (order) => {
        
        console.log("order paid before set ", order.paid)
        order.paid = 'Y';
        console.log("order paid after set ", order.paid)
        console.log("order total before set ", order.total)
        if(coupon != null){
            order.total = order.total - (order.total * coupon.discount / 100);
        }
        console.log("order total after set ", order.total)

        await db.orders.saveNoFormat('user',
            order
        );
        await handleGetOrder()
        setHome(true)
    }

    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value)
    }

    const handleDineIn = (event) => {
        setDineIn(event.target.value)
    }

    return (
        Auth.isUser() ?
        !home ?
        order &&
        <div className="App">
            <header className="App-header">
                <h1>My Cart {discountMessage}</h1>
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
        : <Redirect to={`/review/${order.id}`} />
        : <Redirect to={`/login?returnUrl=${returnUrl}`} />
    );
}