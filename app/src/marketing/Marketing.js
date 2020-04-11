import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Nav from "react-bootstrap/Nav";
import auth from "../auth";
import AdMarketing from "./AdMarketing";
import CouponMarketing from "./CouponMarketing";
import AnalyticMarketing from "./AnalyticMarketing";

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

  const showAnalytic = () => {
    setShow("Analytics")
  }


  return (
      auth.isMarketing() ?
    <div className="App">
      <header className="App-header">
        <h1>Marketing Page</h1>
        <div style={{float:"left", height:"150vh"}}>
          <Nav.Link onClick={()=>{showAd()}}>Ads</Nav.Link>
          <Nav.Link onClick={()=>{showCoupon()}}>Coupon</Nav.Link>
          <Nav.Link onClick={()=>{showAnalytic()}}>Analytics</Nav.Link>
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
          {show == "Analytics" ?
              <AnalyticMarketing/> :
              <></>
          }
        </div>
      </header>
    </div>
          :
          <h2 style={{textAlign:"center"}}>You do not have the Marketing Role to access this</h2>
  );
}