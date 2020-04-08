import React from 'react';
import Courses from './Courses'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Splash from "../Comps/Splash.js"
import Nearest from "./Nearest";

export default () => {
    return (
        <>
            <Container>
                <Row>
                    <Col></Col>
                    <Col xl={"auto"}>
                        <div style={{backgroundColor: "#3B3F43"}}>
                            <h1 style={{textAlign: "center"}} className={"nobreak"} >inDine with us</h1>
                        </div>
                        <div>
                            <Splash />
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    )
}
