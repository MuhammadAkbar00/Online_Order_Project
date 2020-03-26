import React, { useState, useEffect } from 'react';
import {Container, Col, Row} from "react-bootstrap"
import db from '../db.js'
import Auth from './../auth.js'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default () => {

    const [customers, setCustomers] = useState([])

    useEffect(()=>{
        getAllCustomers()
    },[])

    const getAllCustomers = async () => {
        let users = await db.users.getAll()
        setCustomers(users)
    }

    return(
        Auth.isAdmin() &&
        <Container>
            <Row>
                <Col>
                    <Nav.Link>Manage users</Nav.Link>
                    <Nav.Link>View analytics</Nav.Link>
                    <Nav.Link>Manage coupons & ocassions</Nav.Link>
                    <Nav.Link>Manage adverts</Nav.Link>
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    )
}