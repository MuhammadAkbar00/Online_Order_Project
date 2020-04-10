import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Auth from '../auth'
import {
    Redirect
  } from "react-router-dom"

export default () => {

  let returnUrl = "profile"
  const [user, setUser] = useState(null)
  // const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    handleUserProfile()
    // handleUserRegistrations()
  }, [])

  const handleUserProfile = async () => {
    const user = await db.users.getByQuery('user','loggeduser')
    console.log("user", user)
    setUser(user)
    console.log("after set", user)
  }

  // const handleUserRegistrations = async () => {
  //   const registrations = await db.registrations.getUser("")
  //   console.log("registration",registrations)
  //   // setRegistrations(registrations)
  // }

  return (
    Auth.isUser() ?
    user &&
    <div className="App">
      <header className="App-header">
        <h1>User</h1>
        <dl>
          <dt>Username</dt><dd>{user.username}</dd>
          <dt>First name</dt><dd>{user.firstName}</dd>
          <dt>Last name</dt><dd>{user.lastName}</dd>
          <dt>Address</dt><dd>{user.address}</dd>
          <dt>Email</dt><dd>{user.email}</dd>
          <dt>Mailing</dt><dd>{user.mailing}</dd>
          <dt>Points</dt><dd>{user.points}</dd>
          <dt>Language</dt><dd>{user.language}</dd>
        </dl>
        <h1>Orders</h1>
        <ul>
          {
            // registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
          }
        </ul>
      </header>
    </div>
    : <Redirect to={`/login?returnUrl=${returnUrl}`} />
  );
}