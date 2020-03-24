import React, { useState, useEffect } from 'react';
import db from '../db.js';
import Order_items from "./Order_items";

export default () => {

  const [user, setUser] = useState(null)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    handleGetAll()
  }, [])


  const handleGetAll = async () => {
    const user = await db.users.getUser("")
    const order = await db.orders.getUser(`${user.id}`)
    console.log("user", user)
    console.log("orders", order)
    setUser(user)
    setOrder(order)
    console.log("user after set", user)
    console.log("orders after set", order)

  }


  return (
      order &&
      <div className="App">
        <header className="App-header">
          <h1>My Cart</h1>
          <dl>
            <dt>Date </dt><dd>{order.date}</dd>
            <dt>Total </dt><dd>{order.total}</dd>
            <dt>Payment Method </dt><dd>{order.payment_method}</dd>
            <dt>Paid </dt><dd>{order.paid}</dd>
            <dt>Last Access Date </dt><dd>{order.last_access}</dd>
            <dt>Dine in </dt><dd>{order.dinein}</dd>
          </dl>
          <h1>Items</h1>
          <Order_items order_id={order.id}/>
          <ul>
            {
              // registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
            }
          </ul>
        </header>
      </div>
  );
}