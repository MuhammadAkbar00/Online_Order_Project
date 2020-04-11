import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

export default () => {

    return (
        <Container style={{marginTop: "35px"}}  fluid={true} >
            <Row>
                <Col  xs={0} md={3} ></Col>
                <Col xs>
                      <span style={{justifyContent: "right"}}>
                          <ul className={"nobreak"} style={{listStyleType: "none"}} >
                              <p className={"fineprint-hard"} >Links</p>
                              <span className={"fineprint"}>
                              </span>
                          </ul>
                      </span>
                </Col>
                <Col xs={0}></Col>
                <Col xs>
                    <ul  style={{listStyleType: "none"}} >
                        <p className={"fineprint-hard"} >Social Media</p>
                        <span className={"fineprint"}>
                              <li>Facebook</li>
                              <li>Twitter</li>
                              <li>Instagram</li>
                          </span>
                    </ul>
                </Col>
                <Col md={1} lg={0}></Col>
            </Row>
        </Container>
    )
}

