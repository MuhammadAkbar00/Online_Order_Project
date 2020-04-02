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
import {DropdownButton, DropdownItem , Dropdown} from "react-bootstrap";

export default ({}) => {

  const [faq, setFaq] = useState([])


  useEffect(() => {
    handleGetByQuery()
  }, [])

  const handleGetByQuery = async () => {
    const faq = await db.faqs.getPublic("")
    console.log("Faq",faq)
    setFaq(faq)
  }

  return (
    faq &&
    <div className="App">
      <header className="App-header">
        <h1>Faq</h1>

        <ul>

        </ul>
      </header>

    </div>
  );
}