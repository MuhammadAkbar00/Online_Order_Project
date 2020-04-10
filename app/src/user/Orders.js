import React, {useState, useEffect} from 'react';
import db from '../db.js';
import Order_items from "./Order_items";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

export default () => {

    // setting the order initial state to null when the page first render
    // then will be changed throughout the code
    const [order, setOrder] = useState(null);

    // setting the paymentMethod state to null when the page first render
    // user can update their payment method
    // const [paymentMethod, setPaymentMethod] = useState(null);

    // setting the paymentMethod state to null when the page first render
    // user can update either dine In or Out
    // const [dineIn, setDineIn] = useState(null);

    // first method to run after the page is loaded to the user
    useEffect(() => {
        handleGetOrder()
    }, []);


    // handleGetOrder gets all the required information for that specific user order (his cart)
    // sets the order state to the one it gets from the order database
    // handleGetOrder gets re-run when the user checks-out
    const handleGetOrder = async () => {
        // gets the information of the current logged user information
        // awaits the information to be delivered (with either ok or bad response)
        const user = await db.users.getUser("loggeduser");

        // gets the order (cart) information. takes a query of the user id to show that specific user order (cart)
        // awaits the information to be delivered (with either ok or bad response)
        // note: working on getting the order with the status unpaid since this file is only used for user current order
        const order = await db.orders.getUser(`/${user.id}`);

        // setting the order state to the order we got from above statement
        setOrder(order);
    };

    // zeroPad used in getDateFormatted function
    // places 0 before one digit number
    const zeroPad = (num, places) => String(num).padStart(places, '0');

    // getDateFormatted formats the local machine current date to
    // satisfy the database date type (YYYY-MM-DD)
    const getDateFormatted = () => {
        // initializing the current date, month and day.
        const today = new Date();
        let month;
        let day;

        // checks if MONTH is two digits or not (using zeroPad function if yes)
        if (today.getMonth() < 10) {
            // calls zeroPad to add 0. e.g: if it is 1 it becomes 01
            month = zeroPad(today.getMonth(), 2);
        } else {
            // note adding 1 in the else since it starts with 0 as Jan and so on for the rest (ends with 11)
            month = today.getMonth() + 1;
        }

        // checks if DAY is two digits or not (using zeroPad function if yes)
        if (today.getDate() < 10) {
            // calls zeroPad to add 0. e.g: if it is 1 it becomes 01
            day = zeroPad(today.getDate(), 2);
        } else {
            day = today.getDate();
        }

        // return the format (YYYY-MM-DD) as a string
        return today.getFullYear() + '-' + month + '-' + day;
    };

    // (under development, not working properly) createNewCart
    // creates a new order (cart) for user when he checks out
    // note: current code supports when user register it
    // creates for him a order aka cart (check JwtAuthenticationRestController file)
    const createNewCart = async () => {
        // gets the information of the current logged user information
        // awaits the information to be delivered (with either ok or bad response)
        const user = await db.users.getUser("loggeduser");

        // gets the order (cart) information. takes a query of the user id to show that specific user order (cart)
        // awaits the information to be delivered (with either ok or bad response)
        // note: working on getting the order with the status unpaid since this file is only used for user current order
        // const order = await db.orders.getUser(`${user.id}`);

        // initialize date constant using getDateFormatted function for when creating a new
        // order record
        const date = getDateFormatted();
        // console.log("myOldOrder ",order)

        // creates a new record in orders table in the database.
        await db.orders.saveNoFormat('user',
            {
                userId: user.id,
                branchId: 1,
                date: date,
                total: 0,
                paymentMethod: 'C',
                paid: 'N',
                lastAccess: date,
                dinein: 'Y'
            }
        );

        // // UNDER PROGRESS
        // when creating a new order (cart), user's order_item(orderId field) must be a new one
        // since the previous one became paid (history for the user to check it later)
        // //
        // await db.order_items.saveNoFormat('user', {
        //     orderId: userOrder.id,
        //     productId: product_id
        // })

        // setting the order state to the new order (Cart) we just created
        // setOrder(order);
    };

    // (under development, not working properly) userCheckout
    // when user checks out we save the same order state (what the function receives as parameter)
    // which is displayed to the user in the database with a paid status (Y), after that we call createNewCart function
    // to create a new order (cart)
    const userCheckout = async (order) => {
        // gets the information of the current logged user information
        // awaits the information to be delivered (with either ok or bad response)
        const user = await db.users.getUser("loggeduser");
        const currOrder = await db.orders.getUser(`myOrder/${order.id}`);

        // it takes the current order state and only change the paid field.
        // under development( creates a new record instead of editing the passed one)
        await db.orders.saveNoFormat('user',
            {
                id: currOrder.id,
                userId: user.id,
                branchId: order.branchId,
                date: order.date,
                total: order.total,
                paymentMethod: order.paymentMethod,
                paid: 'Y',
                lastAccess: order.date,
                dinein: order.dinein
            }
        );

        // creates a new order (new cart) for the user after checking out
        // await createNewCart();

        // calls handleGetOrder which will update (re-run) the displayed page
        await handleGetOrder();
        // Order_items.forceUpdate();
    };

    // (under development) handlePaymentMethod
    // for the user to change payment method
    // takes parameter event (onchange) from html
    // const handlePaymentMethod = (event) => {
    //     setPaymentMethod(event.target.value)
    // }
    // (under development) handleDineIn
    // for the user to change the dine in option
    // takes parameter event (onchange) from html
    // const handleDineIn = (event) => {
    //     setDineIn(event.target.value)
    // }

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
                    {/* under development */}
                    {/* calls handlePaymentMethod when it changes */}
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
                    {/* under development */}
                    {/* calls handleDineIn when it changes */}
                    {/*<Form.Control type={onselect} placeholder="paymentMethod" onChange={handleDineIn}>*/}
                    {/*    <option value={'N'}>N</option>*/}
                    {/*    <option value={'Y'}>Y</option>*/}
                    {/*</Form.Control>*/}
                </dl>

                {/* shows the specific order_item for this specific order(cart) */}
                <Order_items order_id={order.id}/>

                {/* calls userCheckout passes the current order state
                , passed as a function so it does wait until pressed */}
                {/*Add if statement to check if there is orders for this user if not dont show check out button*/}
                <Button onClick={() => userCheckout(order)}>Check Out!</Button>
            </header>
        </div>
    );
}