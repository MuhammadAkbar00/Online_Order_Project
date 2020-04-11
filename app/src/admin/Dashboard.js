
import React, { useState, useEffect } from 'react';

// Layout components for page layout and structure
import {Container, Col, Row} from "react-bootstrap"

//Imports for database and token authentication access for users.
import db from '../db.js'
import Auth from './../auth.js'

import Nav from 'react-bootstrap/Nav'

import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'
import {
    Redirect
  } from "react-router-dom"

export default () => {

    let returnUrl = "dashboard"
    const [customers, setCustomers] = useState([])

    const [customer, setCustomer] = useState({})

    const [userId   , setUserId   ] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName , setLastName ] = useState("")
    const [address  , setAddress  ] = useState("")
    const [email    , setEmail    ] = useState("")
    const [mailing  , setMailing  ] = useState("")
    const [points   , setPoints   ] = useState("")
    const [language , setLanguage ] = useState("")
    const [phone    , setPhone    ] = useState("")
    const [analytics, setAnalytics] = useState("")

    const [coupons, setCoupons] = useState([])
    const [adverts, setAdverts] = useState([])
    const [advert, setAdvert] = useState({})
    const [coupon , setCoupon] = useState({})

    const [discount, setDiscount] = useState("")
    const [code, setCode] = useState("")
    const [expire, setExpire] = useState("")
    const [desc, setDesc] = useState("")
    const [couponId, setCouponId] = useState("")
    const [userCoupon, setUserCoupon] = useState([])
    const [userOptions, setUserOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState("")
    const [popularProduct, setPopularProduct] = useState("")

    const [adDesc, setAdDesc] = useState("")
    const [image, setImage] = useState("")
    const [slot, setSlot] = useState("")
    const [display, setDisplay] = useState("")

    const [data, setData] = useState("")

    useEffect(()=>{
        getAllCustomers()
    },[])

    const handleUserId = (e) => {setUserId(e.target.value)}
    const handleFirstName = (e) => {e.target.isInvalid = true; setFirstName(e.target.value)}
    const handleLastName = (e) => {setLastName(e.target.value)}
    const handleAddress = (e) => {setAddress(e.target.value)}
    const handleEmail = (e) => {setEmail(e.target.value)}
    const handleMailing = (e) => {setMailing(e.target.value)}
    const handlePoints = (e) => {setPoints(e.target.value)}
    const handleLanguage = (e) => {setLanguage(e.target.value)}
    const handlePhone = (e) => {setPhone(e.target.value)}

    const handleDiscount = (e) => {setDiscount(e.target.value)}
    const handleCode = (e) => {setCode(e.target.value)}
    const handleExpire = (e) => {setExpire(e.target.value)}
    const handleDesc = (e) => {setDesc(e.target.value)}
    const handleUserCoupon = (e) => {setUserCoupon(getUserOptions);setSelectedOption(e.target.value)}

    const handleAdDesc = (e) => {setAdDesc(e.target.value)}
    const handleImage = (e) => {setImage(e.target.value)}
    const handleSlot = (e) => {setSlot(e.target.value)}
    const handleDisplay = (e) => {setDisplay(e.target.value)}

    const getAllCustomers = async () => {
        let users = await db.users.getByQueryNoFormat('admin','')
        console.log(users)
        setCustomers(users)
    }

    const getUserOptions = () => {
        let usernames = []
        customers.map(item=>{
            if (item.username !== "admin") {
                usernames.push(item.username)
            }
        })
        setUserOptions(usernames)
        return usernames
    }

    const deleteUser = async(id) => {
        await db.users.deleteById('',id);
        getAllCustomers();
    }

    const editUser = async(id) => {

        setUserId("")
        setFirstName("")
        setLastName("")
        setAddress("")
        setEmail("")
        setMailing("")
        setPoints("")
        setLanguage("")
        setPhone("")

        setData("edit")

        let user = customers.filter(item=>{
            if (item.id === id ) 
                return item
        })
        user = user[0]

        setUserId(userId ? userId : 0)
        setFirstName(user.firstName ? user.firstName : "")
        setLastName(user.lastName ? user.lastName : "")
        setAddress(user.address ? user.address : "")
        setEmail(user.email ? user.email : "")
        setMailing(user.mailing ? user.mailing : "")
        setPoints(user.points ? user.points : 0)
        setLanguage(user.language ? user.language : "")
        setPhone(user.phone ? user.phone : "")

        setCustomer(user)
    }
    
    const handleSave = async () => {
        let user = {}
        user.username = customer.username
        user.firstName = (firstName ? firstName : null)
        user.lastName = (lastName ? lastName : null)
        user.address = (address ? address : null)
        user.email = (email ? email : null)
        user.mailing = (mailing ? mailing : 'N')
        user.points = (points ? points : 0)
        user.language = (language ? language : "EN") 
        user.phone = (phone ? phone : null)
        await db.users.saveNoFormat(null,user)
    }

    const getCoupons = async() => {
        let coupons = await db.coupons.getByQueryNoFormat('admin','')
        setCoupons(coupons)
        setData('coupons')
    }

    const getAdverts = async() => {
        let adverts = await db.adverts.getByQueryNoFormat('admin','')
        setAdverts(adverts)
        setData("adverts")
    }

    const deleteCoupon = async(id) => {
        await db.coupons.deleteById('',id);
        getCoupons();
    }

    const deleteAdvert = async(id) => {
        await db.adverts.deleteById('',id);
        getAdverts();
    }

    const editCoupon = async (id) => {

        let coupon = coupons.filter(item=>{
            if (item.id === id ) 
                return item
        })
        coupon = coupon[0]

        setCoupon(coupon)

        setDiscount("")
        setCode("")
        setExpire("")
        setDesc("")
        setUserCoupon("")

        getUserOptions()
        setSelectedOption(userOptions[0])
        setCustomer(userOptions[0])
        setData("edit coupon")

        setDiscount(coupon.discount)
        setCode(coupon.code)
        setExpire(coupon.expire)
        setDesc(coupon.desc)
        setCouponId(coupon.id)
    }

    const editAdvert = async (id) => {

        let advert = adverts.filter(item=>{
            if (item.id === id ) 
                return item
        })
        advert = advert[0]

        setAdvert(coupon)

        setAdDesc("")
        setImage("")
        setSlot("")
        setDisplay("")

        setData("edit advert")

        setDiscount(advert.discount)
        setCode(advert.code)
        setExpire(advert.expire)
        setDesc(advert.desc)
        setCouponId(advert.id)
    }

    const handleSaveCoupon = async () => {
        let coupon = {}
        let user = {}
        user.username = selectedOption+""
        user.firstName = (firstName ? firstName : null)
        user.lastName = (lastName ? lastName : null)
        user.address = (address ? address : null)
        user.email = (email ? email : null)
        user.mailing = (mailing ? mailing : 'N')
        user.points = (points ? points : 0)
        user.language = (language ? language : "EN") 
        user.phone = (phone ? phone : null)

        coupon.id = couponId
        coupon.discount = discount
        coupon.code = code
        coupon.expire = expire
        coupon.desc = desc
        coupon.user = user

        await db.coupons.saveNoFormat(null,coupon)
    }

    const handleSaveAdvert = async () => {
        let advert = {}

        advert.desc = adDesc
        advert.image = image
        advert.slot = slot
        advert.display = display

        await db.adverts.saveNoFormat('admin',advert)
    }


    return(

        Auth.isAdmin() ?
        <Container>
            <Row>
                <Col>
                    <Nav.Link onClick={()=>{setData("customers")}}>Manage users</Nav.Link>
                    <Nav.Link onClick={()=>{getCoupons()}}>Manage coupons</Nav.Link>
                    <Nav.Link onClick={()=>{getAdverts()}}>Manage adverts</Nav.Link>
                </Col>
                <Col>
                    { //Sections of the website are displayed according to the value of the data
                      //useState which is set by the executing the command options the admin set.
                        data === "customers" ?
                            <table>
                                <tbody>
                                    {//This mapping function displays the edit options for each user
                                    // unless the user is the admin.
                                        customers.map((item,i)=>
                                            (item.username !== "admin" ? 
                                                <tr key={i}>
                                                    <td>{item.username}</td>
                                                    {/* User creation or editing depends on the interpretation
                                                        of the sent data on the backend. Whether the user Id is the same
                                                        or not for example would indicate whether the admin wants a create
                                                        or an edit to happen. */}
                                                    <td> 
                                                        <Button onClick={()=>{editUser(item.id)}} size={"sm"} variant={"outline-light"}>Edit</Button>
                                                        <Button onClick={()=>{deleteUser(item.id)}} size={"sm"} variant={"outline-warning"}>X</Button>
                                                    </td>
                                                </tr>
                                            :null)
                                        )
                                    }
                                </tbody>
                            </table>
                            //This data useState if statement option displays the form fields
                            //to edit the user the admin picked.
                        : data === "edit" ? 
                            <table>
                                <tbody>
                                    {   //Only display the data of the active customer
                                        //if it's not null which is 
                                        //given an object containing all the 
                                        //data for the user picked by the admin
                                        (customer ? 
                                            <>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Address</th>
                                                    <th>Email</th>
                                                    <th>Mailing</th>
                                                    <th>Points</th>
                                                    <th>Language</th>
                                                    <th>Phone</th>
                                                </tr>
                                                <tr>
                                                    <td><Form.Control onChange={handleUserId} value={userId}/></td>
                                                    <td><Form.Control onChange={handleFirstName} value={firstName}/></td>
                                                    <td><Form.Control onChange={handleLastName} value={lastName}/></td>
                                                    <td><Form.Control onChange={handleAddress} value={address}/></td>
                                                    <td><Form.Control onChange={handleEmail} value={email}/></td>
                                                    <td><Form.Control onChange={handleMailing} value={mailing}/></td>
                                                    <td><Form.Control onChange={handlePoints} value={points}/></td>
                                                    <td><Form.Control onChange={handleLanguage} value={language}/></td>
                                                    <td><Form.Control onChange={handlePhone} value={phone}/></td>
                                                </tr>
                                                <tr>
                                                    <td><Button onClick={handleSave} style={{margin: "auto"}}>Submit</Button></td>
                                                </tr>
                                            </>
                                        :null)
                                    }
                                </tbody>
                            </table>
                            
                        : data === "adverts" ?
                            adverts ?
                                adverts.map((item,i)=>
                                    <tr key={i}>
                                        <td>{item.desc}</td>
                                        <td>
                                            <Button onClick={()=>{editAdvert(item.id)}} size={"sm"} variant={"outline-light"}>Edit</Button>
                                            <Button onClick={()=>{deleteAdvert(item.id)}} size={"sm"} variant={"outline-warning"}>X</Button>
                                        </td>
                                    </tr>
                                )
                            :null

                        : data === "coupons" ?
                        <table>
                            <tbody>
                                { 
                                (coupons.map((item,i)=>
                                    <tr key={i} style={{width: '100%'}}>
                                        <td>for {item.user.username} : {item.code}</td>
                                        <td>
                                            <Button onClick={()=>{editCoupon(item.id)}} size={"sm"} variant={"outline-light"}>Edit</Button>
                                            <Button onClick={()=>{deleteCoupon(item.id)}} size={"sm"} variant={"outline-warning"}>X</Button>
                                        </td>                                        
                                    </tr>
                                    )
                                )
                                }
                            </tbody>
                        </table>

                        : data === "edit coupon" ?
                            <table>
                                <tbody>
                                    {
                                        (coupon ?
                                            <>
                                                <tr>
                                                    <th>Discount</th>
                                                    <th>Code</th>
                                                    <th>Expire</th>
                                                    <th>Desc</th>
                                                    <th>User</th>
                                                </tr>
                                                <tr>
                                                    <td><Form.Control onChange={handleDiscount} value={discount}/></td>
                                                    <td><Form.Control onChange={handleCode} value={code}/></td>
                                                    <td><Form.Control onChange={handleExpire} value={expire}/></td>
                                                    <td><Form.Control onChange={handleDesc} value={desc}/></td>
    
                                                    <td>    <select style={{width:"100px"}} className={"form-control"} onChange={handleUserCoupon} value={selectedOption} as="select">
                                                                {
                                                                    userOptions.map((item,i)=>{
                                                                            return <option value={item.username} key={i}>{item}</option> 
                                                                        } 
                                                                    )
                                                                }
                                                            </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><Button onClick={handleSaveCoupon}>Submit</Button></td>
                                                </tr>
                                            </>
                                        :null)
                                    }
                                </tbody>
                            </table>
                        :data === "edit advert" ?
                                    <>
                                    <tr>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Slot</th>
                                        <th>Display</th>
                                    </tr>
                                    <tr>
                                        <td><Form.Control onChange={handleAdDesc} value={adDesc}/></td>
                                        <td><Form.Control onChange={handleImage} value={image}/></td>
                                        <td><Form.Control onChange={handleSlot} value={slot}/></td>
                                        <td><Form.Control onChange={handleDisplay} value={display}/></td>
                                        <td><Button onClick={handleSaveAdvert}>Submit</Button></td>
                                    </tr>
                                    </>
                        :null
                    }
                </Col>
            </Row>
        </Container>
        :<Redirect to={`/login?returnUrl=${returnUrl}`} />
    )
}