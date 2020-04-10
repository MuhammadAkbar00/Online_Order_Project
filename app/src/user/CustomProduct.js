import React, { useState, useEffect } from 'react'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import db from '../db.js'
import Carousel from "react-bootstrap/Carousel"
import Auth from '../auth'
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import {
    Redirect
  } from "react-router-dom"

export default () => {

    let returnUrl = "custom"
    const [parts, setParts] = useState([])
    const [selectValueDressing, setSelectValueDressing] = useState("")
    const [selectValueBase, setSelectValueBase] = useState("")
    const [selectValueCheese, setSelectValueCheese] = useState("")

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
        let parts = await db.parts.getUser("")
        console.log("parts",parts)
        setParts(parts)
    }

    const handleSave = () => {

    }

    return (
        Auth.isUser() ?
        <Container>

            <Row>

                <Col>
                    Dressing : <br/><br/>
                    Base ingredient:<br/> <br/>
                    Cheese : <br/><br/>
                </Col>

                <Col>
                    <Form onSubmit={handleSave}>
                        <Form.Group>
                            <Form.Control as="select" onChange={handleDressing} value={selectValueDressing}>
                                {parts &&
                                    parts.map((item,i)=>
                                        (item.name.includes('dressing') ? 
                                            <option key={i}>{item.name}</option> :null
                                        )
                                    )
                                }
                            </Form.Control>

                             <Form.Control as="select" onChange={handleBase} value={selectValueBase}>
                            {parts &&
                                parts.map((item,i)=>
                                    (item.name.includes('cheese') || item.name.includes('dressing') ? null
                                        : <option key={i}>{item.name}</option>
                                    )
                                )
                            }
                            </Form.Control>

                            <Form.Control as="select" onChange={handleCheese} value={selectValueCheese}>
                                {parts &&
                                    parts.map((item,i)=>
                                        (item.name.includes('cheese') ?
                                            <option key={i}>{item.name}</option> :null
                                        )
                                    )
                                }
                            </Form.Control>
                            <Button type="submit">Add to cart</Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col></Col>
            </Row>
            <Row>
                

            </Row>

        </Container>
        : <Redirect to={`/login?returnUrl=${returnUrl}`} />
    )
}