import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import db from '../db.js'
import Auth from '../auth'
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import {
    Redirect
  } from "react-router-dom"

export default () => {

    let returnUrl = "custom"
    const [parts, setParts] = useState([])
    const [selectValueDressing, setSelectValueDressing] = useState("Ranch dressing")
    const [selectValueBase, setSelectValueBase] = useState("Lettuce")
    const [selectValueCheese, setSelectValueCheese] = useState("Parmesan cheese")
    const [home, setHome] = useState(false)

    useEffect(()=>{
        getAllParts()
    },[])

    const handleDressing = (e) => {
        setSelectValueDressing(e.target.value)
    }

    const handleBase = (e) => {
        setSelectValueBase(e.target.value)
    }

    const handleCheese = (e) => {
        setSelectValueCheese(e.target.value)
    }
    
    const getAllParts = async() => {
        let res = await db.parts.getUser("")
        setParts(res)
        
    }

    const getTotal = () => {
        
        let total = 0
        parts.map(item=>{
            if  (  item.name === selectValueDressing
                || item.name === selectValueBase
                || item.name === selectValueCheese
                ) {
                total += item.price
                console.log('added :',item.price)
            }
        })
        console.log('total :',total)
        return total
    }

    const saveCustomParts = async(id) => {
        let customPart = {}

        parts.map(async(item)=>{
            if  (  item.name+"" === selectValueDressing
                || item.name+"" === selectValueBase
                || item.name+"" === selectValueCheese
                ) {
                    customPart.partId=item.id
                    customPart.customId = id
                    await db.custom_parts.saveNoFormat('user',customPart)
                }
        })
    }

    const saveProduct = async(id) => {
        let data = {
            customId: id
        }
        let product = await db.products.saveNoFormat('user', data)
        saveOrderItem(product.id)
    }

    const saveOrderItem = async(pid) => {
        let order = await db.orders.getUser(``);
        
        let data = {
            productId:pid,
            orderId:order.id
        }
        await db.order_items.saveNoFormat('user', data)
    }

    const handleSave = async() => { 

        console.log("dressing",selectValueDressing)

        let custom = {
            name: null,
            desc: `Vegetable salad with ${selectValueDressing}, ${selectValueBase} and ${selectValueCheese}`,
            date: null,
            type: "salad",
            total: getTotal(),
            occasionId: null
        }

        let order = await db.orders.getUser(``);
        order.total += custom.total;

        await db.orders.saveNoFormat('user', order)

        let res = await db.customs.saveNoFormat('user',custom)
        saveCustomParts(res.id)
        saveProduct(res.id)
        setHome(true);
    }

    if (parts) {
        return (
            Auth.isLoggedIn() ?
            !Auth.isAdmin() ?
            <Container>
    
                <Row>
    
                    <Col>
                        Dressing : <br/><br/>
                        Base ingredient:<br/> <br/>
                        Cheese : <br/><br/>
                    </Col>
    
                    <Col>
                        {
                        <>
                        <Form.Control as={"select"} value={selectValueDressing} onChange={handleDressing}>
                            {parts &&
                                parts.map((item,i)=>
                                    (item.name.includes('dressing') ? 
                                        <option key={i}>{item.name}</option> :null
                                    )
                                )
                            }
                        </Form.Control>
    
                            <Form.Control as={"select"} onChange={handleBase} value={selectValueBase}>
                        {parts &&
                            parts.map((item,i)=>
                                (item.name.includes('cheese') || item.name.includes('dressing') ? null
                                    : <option key={i}>{item.name}</option>
                                )
                            )
                        }
                        </Form.Control>
    
                        <Form.Control as={"select"} onChange={handleCheese} value={selectValueCheese}>
                            {parts &&
                                parts.map((item,i)=>
                                    (item.name.includes('cheese') ?
                                        <option key={i}>{item.name}</option> :null
                                    )
                                )
                            }
                        </Form.Control>
                        <Button onClick={handleSave} type="submit">Add to cart</Button>
                        </>
                        }
                    </Col>
    
                    <Col></Col>
                </Row>
                <Row>
                    
    
                </Row>
    
            </Container>
            : <Redirect to={`/`} />
            : <Redirect to={`/login?returnUrl=${returnUrl}`} />
        )
    }

}