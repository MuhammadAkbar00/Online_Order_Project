import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Nav from "react-bootstrap/Nav";
import {Col} from "react-bootstrap";
import AdMarketing from "./AdMarketing";
import CouponMarketing from "./CouponMarketing";

export default () => {

  const [user, setUser] = useState(null)
  const [show, setShow] = useState("")


  useEffect(() => {

  }, [])

  const showAd = () => {
      setShow("Ad")
  }

  const showCoupon = () => {
    setShow("Coupon")
  }

  const remove = () => {
    setShow("")
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Marketing Page</h1>
        <div style={{float:"left", height:"150vh"}}>
          <Nav.Link onClick={()=>{showAd()}}>Ads</Nav.Link>
          <Nav.Link onClick={()=>{showCoupon()}}>Coupon</Nav.Link>
          <Nav.Link onClick={()=>{remove()}}>Occasion</Nav.Link>
        </div>


        <div>
          {show == "Ad" ?
            <AdMarketing/> :
              <></>
          }
          {show == "Coupon" ?
              <CouponMarketing/> :
              <></>
          }
        </div>
      </header>
    </div>
  );
}