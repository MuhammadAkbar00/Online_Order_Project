import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Auth from "../auth";
import Button from "react-bootstrap/Button";
import {Link, Route, Switch} from "react-router-dom";
import Authenticate from "../public/Authenticate";
import Logout from "../user/Logout";
import Profile from "../user/Profile";
import Students from "../admin/Students";
import CourseDetail from "../public/CourseDetail";
import Courses from "../public/Courses";
import Registrations from "../public/Registrations";
import Settings from "../admin/Settings";
import Home from "../public/Home";
import MenuDetail from "./MenuDetail";
import Orders from "../user/Orders";

export default () => {

  const [user, setUser] = useState(null)
  const [menu, setMenu] = useState([])
  const [menuDetail, setMenuDetail] = useState(null)

  useEffect(() => {
    handleUserProfile()
    handleUserMenu()
  }, [])

  const handleUserProfile = async () => {
    try{
      const user = await db.users.getUser("")
      console.log("user", user)
      setUser(user)
      console.log("after set", user)
    }catch (e) {
      // no user exists means it's a public user
    }
  }

  const handleMenuDetail = id => {
    setMenuDetail(id)
  }

  const handleSave = async (productID) => {
  try{
    const order = await db.orders.getUser(`${user.id}`)
  }catch (e) {
    // return <Orders />
  }
    // handleGetByQuery()
  }

  const handleUserMenu = async () => {
    const menu = await db.menu.getPublic("")
    console.log("Menu",menu)
    setMenu(menu)
  }

  return (
      menu &&
      <div className="App">
        <header className="App-header">
          <dl>
            {/*<dt>Username</dt><dd>{menu.name}</dd>*/}
            {/*<dt>First name</dt><dd>{menu.desc}</dd>*/}
            {/*<dt>Last name</dt><dd>{menu.image}</dd>*/}
            {/*<dt>Address</dt><dd>{menu.type}</dd>*/}
            {/*<dt>Email</dt><dd>{menu.price}</dd>*/}
            {/*<dt>Mailing</dt><dd>{menu.stock}</dd>*/}
            {/*<dt>Points</dt><dd>{menu.quantity}</dd>*/}
            {/*<dt>Language</dt><dd>{menu.occasionId}</dd>*/}
          </dl>
          <h1>Menu</h1>
          <ul>
            {
              menu.map(item => <div key={item.id}><p style={{fontWeight: "bold", fontSize: 30}}>{item.name}</p>
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
                    {
                      Auth.isUser() &&
                      <Button>Buy</Button>
                    }
                    <Button>
                      <Link as={Link} to={`menu/${item.id}`}>Details</Link>
                    </Button>
                  </div>
              )
            }
          </ul>
        </header>
        <div>
          {/*<Switch>*/}
          {/*  /!*<Route path="/menu/:id" exact>*!/*/}
          {/*  /!*  <MenuDetail />*!/*/}
          {/*  /!*</Route>*!/*/}

          {/*</Switch>*/}
        </div>
      </div>
  );
}