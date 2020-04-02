import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Auth from "../auth";
import Button from "react-bootstrap/Button";
import {Link, Route, Switch} from "react-router-dom";
import Form from 'react-bootstrap/Form';
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
import {DropdownButton, DropdownItem , Dropdown} from "react-bootstrap";

export default ({}) => {

  // const [user, setUser] = useState(null)
  const [menu, setMenu] = useState([])
  // const [menuDetail, setMenuDetail] = useState(null)
  const [searchName, setSearchName] = useState("")
  const [type, setType] = useState([])
  const [searchType, setSearchType] = useState("")

  useEffect(() => {
    handleGetByQuery()
  }, [searchName, searchType])


  const handleSearchType = (item) => {
    console.log(item)
    setSearchType(item)
    console.log("WORKING")
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleTypeList = (list) => {
      let type = [];
      for(let i = 0; i < list.length; i++){
         if(!type.includes(list[i].type)){
            type.push(list[i].type)
         }
      }
      console.log(type)
    setType(type)
  }


  const handleGetByQuery = async () => {
    console.log(searchType, "Hah")
    const menu = await db.menu.getPublic(searchName ? `findByNameContaining/${searchName}` : '')
    console.log("Menu",menu)
    setMenu(menu)
    handleTypeList(menu)
  }

  return (
    menu &&
    <div className="App">
      <header className="App-header">
        <h1>Menu</h1>
        <Form.Control type="text" placeholder="Search Menu" onChange={handleSearchName} value={searchName} />
        <DropdownButton id="dropdown-basic-button" title="Search By Type">
          {
            type.map(item => <DropdownItem key={item} onClick={() => handleSearchType(item)}>{item}</DropdownItem>)
          }
        </DropdownButton>

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
                  {Auth.isUser() &&
                  <Button>Buy</Button>}
                  <Link as={Link} to={`menu/${item.id}`}>Details</Link>
            </div>)
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