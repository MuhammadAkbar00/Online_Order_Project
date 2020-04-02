import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import db from '../db.js'
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";

export default () => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    handleUserProfile()

  }, [])

  const handleFirstName = (event) => {
    setUser({
      username:user.username,
      firstName : event.target.value,
      lastName: user.lastName,
      address: user.address,
      email: user.email,
      mailing: user.mailing,
      points: user.points,
      language: user.language,
      phone: user.phone
    })
  }


  const handleSave = async () => {
    await db.users.saveUser(user)
    handleUserProfile()
  }

  const handleUserProfile = async () => {
    const user = await db.users.getUser("")
    console.log("user", user)
    setUser(user)
    console.log("after set", user)
  }

  return (
    user &&
    <div className="App">
      <header style={{marginLeft:200}} className="App-header">
        <h1>User</h1>
        <dl>
          <dt>Username</dt><dd>{user.username}</dd>
          <dt>First name</dt>
          <dd>
            <Form.Control type="Text" placeholder={`${user.firstName}`} onChange={handleFirstName} value={user.firstName} />
          </dd>
          <dt>Last name</dt><dd>{user.lastName}</dd>
          <dt>Address</dt><dd>{user.address}</dd>
          <dt>Email</dt><dd>{user.email}</dd>
          <dt>Mailing</dt><dd>{user.mailing}</dd>
          <dt>Points</dt><dd>{user.points}</dd>
          <dt>Language</dt><dd>{user.language}</dd>
          {/*<dt>Age</dt>*/}
          {/*<dd>*/}
          {/*  <Form.Control type="number" placeholder="Age" onChange={handleAge} value={student.age} />*/}
          {/*</dd>*/}

        </dl>
        <Button onClick={handleSave} >Save</Button>
        <h1>Orders</h1>
        <ul>
          {
            // registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
          }
        </ul>
      </header>
    </div>
  );
}