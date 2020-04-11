import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import db from '../db.js'
import auth from "../auth";


export default () => {

    //Coupon List
    const [coupons, setCoupons] = useState([])

    //States
    const [couponCreate, setCouponCreate] = useState(false)
    const [couponEdit, setCouponEdit] = useState(false)

    //Create coupons
    const [userId, setUserId] = useState("")
    const [discount, setDiscount] = useState("")
    const [code, setCode] = useState("")
    const [expire, setExpire] = useState("")
    const [desc, setDesc] = useState("")

    //Edit coupons
    const [idEdit, setIdEdit] = useState("")
    const [userIdEdit, setUserIdEdit] = useState("")
    const [discountEdit, setDiscountEdit] = useState("")
    const [codeEdit, setCodeEdit] = useState("")
    const [expireEdit, setExpireEdit] = useState("")
    const [descEdit, setDescEdit] = useState("")

    useEffect(() => {
        handleGetByQuery()
    },[])

    const handleGetByQuery = async () => {
        let coupons = await db.coupons.getByQueryNoFormat('marketing','')
        setCoupons(coupons)
    }

    const handleCouponCreate = async () => {
        setCouponCreate(true)
        console.log(couponCreate)
    }

    //Create

    const handleUserId = (event) => {
        setUserId(event.target.value)
    }

    const handleDiscount = (event) => {
        setDiscount(event.target.value)
    }

    const handleCode = (event) => {
        setCode(event.target.value)
    }

    const handleExpire = (event) => {
        setExpire(event.target.value)
    }

    const handleDesc = (event) => {
        setDesc(event.target.value)
    }

    const handleCreate = async () => {
        const user = await db.users.getByQueryNoFormat('marketing',userId)
        console.log(user, "User")
        let coupCreate = {
            user: user,
            discount: discount,
            code: code,
            expire: expire,
            desc: desc
        }
        await db.coupons.saveNoFormat('marketing', coupCreate)
        setCouponCreate(false)
        handleGetByQuery()
    }

    //Coupon Edit

    const handleCouponEdit = async (id) => {
        setCouponEdit(true)
        console.log(id, "This is the id we getting")
        const editing = await db.coupons.getByQueryNoFormat('marketing',id)
        console.log(editing)
        setIdEdit(editing.id)
        setUserIdEdit(editing.user.id)
        setDiscountEdit(editing.discount)
        setCodeEdit(editing.code)
        setExpireEdit(editing.expire)
        setDescEdit(editing.desc)
    }

    const handleUserIdEdit = (event) => {
        setUserIdEdit(event.target.value)
    }

    const handleDiscountEdit = (event) => {
        setDiscountEdit(event.target.value)
    }

    const handleCodeEdit = (event) => {
        setCodeEdit(event.target.value)
    }

    const handleExpireEdit = (event) => {
        setExpireEdit(event.target.value)
    }

    const handleDescEdit = (event) => {
        setDescEdit(event.target.value)
    }

    const handleEditSave = async () =>{
        const user = await db.users.getByQueryNoFormat('marketing',userIdEdit)
        console.log(user, "This is user")
        let coupEdit = {
            id: idEdit,
            user: user,
            discount: discountEdit,
            code: codeEdit,
            expire: expireEdit,
            desc: descEdit
        }
        await db.coupons.saveNoFormat('marketing',coupEdit)
        setCouponEdit(false)
        handleGetByQuery()
    }

    //Delete
    const handleCouponDelete = async(id) =>{
        await db.coupons.deleteById('marketing',id);
        handleGetByQuery()
    }

    return(
        auth.isMarketing() ?
            couponCreate ?
            <div className="App">
                <header style={{marginLeft:200}} className="App-header">
                    <h1>Create Coupon</h1>
                    <dl>
                        <dt>Coupon</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`UserId`} onChange={handleUserId} value={userId} />
                        </dd>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`Discount`} onChange={handleDiscount} value={discount} />
                        </dd>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`Code`} onChange={handleCode} value={code} />
                        </dd>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`Expire`} onChange={handleExpire} value={expire} />
                        </dd>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`Description`} onChange={handleDesc} value={desc} />
                        </dd>

                    </dl>
                    <Button onClick={handleCreate} >Create</Button>
                </header>
            </div>
            :
            couponEdit ?
                <div>
                    <h1>Coupon</h1>
                    <dl>
                        <dt>Coupon Edit</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${userIdEdit}`} onChange={handleUserIdEdit} value={userIdEdit} />
                        </dd>
                        <dt>Discount</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${descEdit}`} onChange={handleDiscountEdit} value={discountEdit} />
                        </dd>
                        <dt>Code</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${codeEdit}`} onChange={handleCodeEdit} value={codeEdit} />
                        </dd>
                        <dt>Expire</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${expireEdit}`} onChange={handleExpireEdit} value={expireEdit} />
                        </dd>
                        <dt>Description</dt>
                        <dd>
                            <Form.Control as="textarea" rows="3" style={{width:"50vw"}} placeholder={`${discountEdit}`} onChange={handleDescEdit} value={descEdit}/>
                        </dd>

                    </dl>
                    <Button onClick={handleEditSave} >Save</Button>
                </div>
                :
        <div>
            <h3>Coupons</h3>
            {coupons.map((item,i) =>
                <div key={i+1}>
                    <p>Coupon {i+1}</p>
                    <p>Coupon Code: {item.code}</p>
                    <p>Coupon Description: {item.desc}</p>
                    <p>Coupon: {item.user.id}</p>
                    <Button onClick={() => handleCouponEdit(item.id)}>Edit</Button>
                    <Button onClick={() => handleCouponDelete(item.id)}>X</Button>
                </div>
            )}
            <Button onClick={handleCouponCreate} >Create New Coupon</Button>
        </div>
            :
            <p style={{color:"red"}}>Unauthorized</p>
    );
}