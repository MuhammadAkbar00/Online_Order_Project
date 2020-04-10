import React, {useState, useEffect} from 'react'
import db from '../db.js'
import Auth from "../auth"
import Button from "react-bootstrap/Button"
import PageRecord from '../marketing/PageRecord'
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import CustomProduct from "../user/CustomProduct.js"
import {
    Switch,
    Route,
    Link
  } from "react-router-dom"
// import Normal from "./normal"


export default () => {

    // const [user, setUser] = useState(null)
    const [menu, setMenu] = useState([])
    const [menuDetail, setMenuDetail] = useState(null)

    useEffect(() => {
        // handleUserProfile()
        handleUserMenu()
    }, [])

    const handleMenuDetail = id => {
        setMenuDetail(id)
    }

    const handleUserMenu = async () => {
        const menu = await db.menu.getPublic("")
        console.log("Menu", menu)
        setMenu(menu)
    }

    const addToMyCart = async (product_id) => {
        const user = await db.users.getUser("loggeduser");
        const userOrder = await db.orders.getUser(``);
        await db.order_items.saveNoFormat('user', {
            orderId: userOrder.id,
            productId: product_id
        })

        document.getElementById('status '+product_id).style.display = ""
        let timeout = setTimeout(() => {
            document.getElementById('status '+product_id).style.display = "none"
        }, 3000);
        
    }

    return (
        menu &&
        <div >
            <PageRecord pagename="menu" productId={null}/>

            <Container>
                <Row>
                    <Col></Col>
                    <Col xl={"auto"}>
                        <div style={{backgroundColor: "#3B3F43"}}>
                            <h1 style={{textAlign: "center"}} className={"nobreak"} >Menu</h1>
                            <Link as={Link} to="/custom"><h5 class="card-header">Add a custom salad to your order!</h5></Link>
                        </div>
                        <div>
                            {
                              menu.map(item => 
                              <div key={item.id}>
                                
                                <div class="card" style={{minWidth:306}}>
                                <h5 class="card-header">{item.name}</h5>
                                <div class="card-body" style={{display:"flex"}}>
                                    
                                    <Container>
                                        <Row>
                                            <Col lg={2} xl={2}><h5 class="card-title">{item.price} QAR</h5></Col>
                                            <Col lg={3} xl={5}>
                                                <p class="card-text" style={{textOverflow:"none"}}>{item.desc}</p><br />
                                                {Auth.isUser() &&
                                                <>
                                                    <Button onClick={() => addToMyCart(item.id)} className={"btn btn-primary"}>Buy</Button>
                                                    <br /> <br />
                                                    <p style={{display: "none"}} id={`status ${item.id}`} >Added to cart!</p>
                                                    <br/>
                                                </>
                                                }
                                                <Link as={Link} to={`menu/${item.id}`}>Details</Link>
                                            </Col>
                                            <Col>
                                                <img alt="" style={{width:"250px"}} src={ require(`../images/${item.image}`) } />
                                            </Col>
                                        </Row>
                                    </Container>
                                
                                </div>
                                </div>
                              </div>) 
                            }
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}