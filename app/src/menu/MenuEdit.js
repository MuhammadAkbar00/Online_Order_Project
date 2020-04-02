import React, { useState, useEffect } from 'react';
import db from '../db'
import Auth from '../auth'
import { useParams } from "react-router-dom";
import pageRecord from "../marketing/PageRecord";

export default () => {

  const { id } = useParams();

  const [menu, setMenu] = useState(null)
  const [user, setUser] = useState([])

  useEffect(() => {
    handleGetOne(id)
    // if (Auth.isAdmin()) {
    //   handleGetRegistrationsByCourse(id)
    // }
  }, [id])

  const handleGetOne = async (id) => {
    const menu = await db.menu.getPublic(id)
    // if(Auth.isLoggedIn()){
    //   const user = await db.users.getUser("")
    //   console.log("working user", user)
    //   setUser(user)
    // }
    setMenu(menu)
  }

  // console.log(user.length == 0)
  // if(user.length == 0 ){
  //   new pageRecord('MenuDetail', id, "")
  // }
  // // new pageRecord('MenuDetail', id, user.username)
  // console.log("WORK WORK WORK WORK")

  // const handleGetRegistrationsByCourse = async (id) => {
  //   const registrations = await db.registrations.getAdmin(`/search/findByCourseId?id=${id}`)
  //   setRegistrations(registrations)
  // }

  return (
    menu &&
    <div className="App">
      <header className="App-header">
        <h1>{menu.name}</h1>
        <img style={{width:"300px", height:"300px", float:"right",display:"block", marginRight:"50%"}} src={ require(`../images/${menu.image}`) } />
        <dl>

          <dt>Name</dt><dd>{menu.name}</dd>
          <dt>Description</dt><dd>{menu.desc}</dd>
          <dt>Type</dt><dd>{menu.type}</dd>
          <dt>Price</dt><dd>{menu.price}</dd>
          <dt>In Stock</dt><dd>{menu.stock}</dd>
          <dt>Quantity</dt><dd>{menu.quantity}</dd>

        </dl>
        {/*{Auth.isAdmin() && <h1>Students Registered In Course</h1>}*/}
        {/*<ul>*/}
        {/*  {*/}
        {/*    registrations.map(item => <li key={item.id}>{item.student.name} - {item.student.age}</li>)*/}
        {/*  }*/}
        {/*</ul>*/}
      </header>
    </div>
  );
}