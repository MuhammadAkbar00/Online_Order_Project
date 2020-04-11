import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Order_items from "./Order_items";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Auth from '../auth'
import {
    Redirect, useHistory
} from "react-router-dom"
  
export default () => {

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
    const [paymentMethod, setPaymentMethod] = useState('C')
    const [paid, setPaid] = useState(null)
    const [lastAccess, setLastAccess] = useState(null)
    const [dineIn, setDineIn] = useState("N")
    
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


    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handleDineIn = (e) => {
        setDineIn(e.target.value)
    }

    const handleGetOrder = async () => {
        
        const user = await db.users.getUser("loggeduser");
        setUser(user)
        const order = await db.orders.getUser(``);
        console.log('order from  visiting my cart',order)
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
        const order_items = await db.order_items.getUser(`${order.id}`)
        if (order_items.length == 0) {

        }else{
            order.paid = 'Y';
            order.paymentMethod = paymentMethod;
            order.dineIn = dineIn
            
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
    }

    return (
        Auth.isLoggedIn() ?
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
                    <Form.Control as="select" placeholder="paymentMethod" onChange={handlePaymentMethod} >
                       <option value={'C'}>Credit Card</option>
                       <option value={'K'}>Cash</option>
                    </Form.Control>
                    <dt>Dine in</dt>
                    <Form.Control as="select" placeholder="dineIn" onChange={handleDineIn}>
                       <option value={'N'}>No</option>
                       <option value={'Y'}>Yes</option>
                    </Form.Control>
                </dl>
                <Order_items orderUpdater = {setOrder} order_id={order.id}/>

                {/*Add if statement to check if there is orders for this user if not dont show check out button*/}
                <Button onClick={() => userCheckout(order)}>Check Out!</Button>
            </header>
        </div>
        : <Redirect to={`/review/${order.id}`} />
        : <Redirect to={`/login?returnUrl=${returnUrl}`} />
    );
}