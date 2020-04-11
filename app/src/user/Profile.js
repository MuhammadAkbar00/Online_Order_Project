import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import db from '../db.js'
import Auth from "../auth";
import Nav from "react-bootstrap/Nav";
import {Link, Redirect} from "react-router-dom";
import Orders from "./Orders";

export default () => {
  let returnUrl = "profile"
  const [user, setUser] = useState(null)
  //UserData
  const [firstName, setFirstName] = useState("")
  const [lastName , setLastName ] = useState("")
  const [address  , setAddress  ] = useState("")
  const [email    , setEmail    ] = useState("")
  const [mailing  , setMailing  ] = useState("")
  const [points   , setPoints   ] = useState("")
  const [language , setLanguage ] = useState("")
  const [phone    , setPhone    ] = useState("")
  //User Coupons
  const [coupons    , setCoupons] = useState([])
  //Redeem Coupons
  const [couponRedeem   , setCouponRedeem] = useState("")



  useEffect(() => {
    handleUserProfile()
    handleUserCoupons()
  }, [])

  const handleFirstName = (event) => {
    setFirstName(event.target.value)
    console.log("First Name Set", firstName)
  }
  const handleLastName = (event) => {
    setLastName(event.target.value)
    console.log("Last Name Set", lastName)
  }
  const handleAddress = (event) => {
    setAddress(event.target.value)
    console.log("Address Set")
  }
  const handleEmail = (event) => {
    setEmail(event.target.value)
    console.log("Email Set")
  }
  const handleMailing = (event) => {
    setMailing(event.target.value)
    console.log("Mailing Set")
  }
  const handlePhone = (event) => {
    setPhone(event.target.value)
    console.log("Phone Set")
  }

  const handleSave = async () => {
    let userg = {
      id: user.id,
      username: user.username,
      firstName: (firstName ? firstName : user.firstName),
      lastName: (lastName ? lastName : user.lastName),
      address: (address ? address : user.address),
      email: (email ? email : user.email),
      mailing: (mailing ? mailing : user.mailing),
      points: user.points,
      language: user.language,
      phone : (phone ? phone : user.phone)
    }

    console.log("what was meant to be",userg)

    await db.users.saveNoFormat("user",userg)
    handleUserProfile()
  }

  const handleUserProfile = async () => {
    const user = await db.users.getByQuery('user','loggeduser')
    console.log("user", user)
    setUser(user)
    console.log("after set", user)
  }

  const handleUserCoupons = async () => {
    const coupons = await db.coupons.getByQuery('user', '')
    console.log(coupons)
    setCoupons(coupons)
  }

  const redeemCoupon = async (cid) => {
    const cpn = await db.coupons.getByQuery('user',cid)
    console.log(cpn)
    setCouponRedeem(cpn)
  }

  return (
      Auth.isUser() ?
          !couponRedeem ?
      user &&
      <div className="App">
        <header style={{marginLeft:200}} className="App-header">
          <h1>User</h1>
          <dl>
            <dt>Username</dt><dd>{user.username}</dd>
            <dt>First name</dt>
            <dd>
              <Form.Control type="text" placeholder={`${user.firstName}`} onChange={handleFirstName} value={firstName} />
            </dd>
            <dt>Last name</dt>
            <dd>
              <Form.Control type="text" placeholder={`${user.lastName}`} onChange={handleLastName} value={lastName} />
            </dd>
            <dt>Address</dt>
            <dd>
              <Form.Control type="text" placeholder={`${user.address}`} onChange={handleAddress} value={address} />
            </dd>
            <dt>Email</dt>
            <dd>
              <Form.Control type="text" placeholder={`${user.email}`} onChange={handleEmail} value={email} />
            </dd>
            <dt>Mailing</dt>
            <dd>
              <Form.Control type="text" placeholder={`${user.mailing}`} onChange={handleMailing} value={mailing} />
            </dd>
            <dt>Phone</dt>
            <dd>
              <Form.Control type="text" placeholder={`${user.phone}`} onChange={handlePhone} value={phone} />
            </dd>
            <dt>Points</dt>
            <dd>
              {user.points}
            </dd>
            <dt>Language</dt><dd>{user.language}</dd>
          </dl>
          <Button onClick={handleSave} >Save</Button>
          <h1>Available Coupons</h1>
            {
              coupons.map((item,i) =>
                  <div key={i+1}>
                    <p>Coupon {i+1}</p>
                    <p>Coupon Code: {item.code}</p>
                    <p>Coupon Description: {item.desc}</p>
                    <p>For User: {item.user.username}</p>
                    <Button onClick={() => redeemCoupon(item.id)}>Redeem</Button>
                  </div>
              )
            }
        </header>
      </div>
              :
              <Redirect to={{
                pathname: "/orders",
                search: couponRedeem.code
              }}/>
    : <Redirect to={`/login?returnUrl=${returnUrl}`} />
  );
}