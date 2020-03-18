import React, { useState, useEffect } from 'react';
import db from '../db.js';

export default ({ order_id }) => {

  const [user, setUser] = useState(null)
  const [order_item, setOrder_items] = useState(null)

  useEffect(() => {
    handleGetAll()
  }, [order_id])


  const handleGetAll = async () => {
    const user = await db.users.getUser("")
    const order_items = await db.order_items.getUser(`${order_id}`)
    console.log("user", user)
    console.log("order_items", order_items)
    setUser(user)
    setOrder_items(order_items)
    console.log("user after set", user)
    console.log("order_items after set", order_items)

  }


  return (
      order_item &&
      <div className="App">
        <header className="App-header">
          <h1>My Cart</h1>
          <dl>
            <dt></dt><dd></dd>

          </dl>
          <ul>
            {
              // registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
            }
          </ul>
        </header>
      </div>
  );
}