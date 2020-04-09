import React, {useState, useEffect} from 'react'
import db from '../db.js'
import Auth from "../auth"
import Button from "react-bootstrap/Button"
import {Link, Route, Switch} from "react-router-dom"
import PageRecord from '../marketing/PageRecord'
import Authenticate from "../public/Authenticate"
import Logout from "../user/Logout"
import Profile from "../user/Profile"
import Students from "../admin/Students"
import CourseDetail from "../public/CourseDetail"
import Courses from "../public/Courses"
import Registrations from "../public/Registrations"
import Home from "../public/Home"
import MenuDetail from "./MenuDetail"
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
        const userOrder = await db.orders.getUser(`${user.id}`);
        await db.order_items.saveNoFormat('user', {
            orderId: userOrder.id,
            productId: product_id
        })
    }

    return (
        menu &&
        <div className="App">
            <PageRecord pagename="menu" productId={null}/>
            <header className="App-header">
                <dl>
                </dl>
                <h1>Menu</h1>
                <ul>
                    {
                        menu.map(item => <div key={item.id}><p
                            style={{fontWeight: "bold", fontSize: 30}}>{item.name}</p>
                            <p>
                                Description: {item.desc}
                            </p>
                            <p>
                                Price: {item.price}
                            </p>
                            <p>
                                Stock: {item.stock}
                            </p>
                            <p>
                                OccasionId: {item.occasionId}
                            </p>
                            <p>
                                Type: {item.type}
                            </p>
                            {Auth.isUser() &&
                            <Button onClick={() => addToMyCart(item.id)}>Buy</Button>}
                            <Link as={Link} to={`menu/${item.id}`}>Details</Link>
                        </div>)
                    }
                </ul>
            </header>
        </div>
    );
}