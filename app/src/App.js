import React, { useState } from 'react';
import Authenticate from './public/Authenticate'
import Auth from './auth'
import Home from './public/Home'
import Profile from './user/Profile'
import Orders from './user/Orders'
import Logout from './user/Logout'
import Students from './admin/Students'
import Courses from './public/Courses'
import Menu from "./menu/Menu"
import CourseDetail from './public/CourseDetail'
import Registrations from './public/Registrations'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Footer from './Comps/Footer.js'
import Nearest from "./public/Nearest"
import Marketing from './marketing/Marketing.js'
import Quiz from './user/Quiz.js';
import QuizResult from "./user/QuizResult.js";
import CustomChatbot from "./components/chatbot/CustomChatbot.js";
import "./App.css";
import Dashboard from './admin/Dashboard.js'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation
} from "react-router-dom";
import MenuDetail from "./menu/MenuDetail";
import StarRating from "./components/rating/StarRating";
import CustomProduct from './user/CustomProduct.js';
import MenuEdit from "./menu/MenuEdit";
import Faq from "./faq/Faq";
import CreateFaq from "./faq/CreateFaq";
import SearchFaq from "./faq/SearchFaq";
import CartList from "./user/CartList";

import {Reacteroids} from "./game/Reacteroids";


export default () => {

    const location = useLocation()

    const [searchCourse, setSearchCourse] = useState("")
    const [searchStudent, setSearchStudent] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(Auth.isLoggedIn())
    console.log('isLoggedIn set to', isLoggedIn)
    Auth.init(setLoggedIn)

    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand as={Link} to="/"><img style={{transform: "scale(2,2)"}} width="50em" src={require(`./images/logo.png`)} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                        <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                        {Auth.isMarketing() &&
                            <Nav.Link as={Link} to="/marketing">Marketing</Nav.Link>
                        }
                        {
                            Auth.isUser() &&
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/orders">My Cart</Nav.Link>
                                <Nav.Link as={Link} to="/cartlist">Order History</Nav.Link>
                                <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
                                <Nav.Link as={Link} to="/game">Game</Nav.Link>
                            </>
                        }
                        {
                            Auth.isAdmin() &&
              <Nav.Link as={Link} to="dashboard">Admin Dashboard</Nav.Link>
            }
            </Nav>
            <Nav>
              {
                  Auth.isLoggedIn()
                      ?
                            <>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                <Nav.Link as={Link} to="/nearest">Nearest</Nav.Link>
                                {/* <Nav.Link as={Link} to="/marketing">Marketing</Nav.Link> */}
                                <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <CustomChatbot />
            <br />
            <div>
                <div>
                    <Switch>
                        <Route path="/register">
                            <Authenticate type="Register" />
                        </Route>
                        <Route path="/login">
                            <Authenticate type="Login" />
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/nearest">
                            <Nearest />
                        </Route>
                        <Route path="/game">
                            <Reacteroids />
                        </Route>
                        <Route path="/quiz">
                            <Quiz />
                        </Route>
                        <Route path="/orders">
                            <Orders />
                        </Route>
                        <Route path="/cartlist">
                            <CartList />
                        </Route>
                        <Route path="/quiz/result/:id">
                            <QuizResult />
                        </Route>
                        <Route path="/marketing">
                            <Marketing />
                        </Route>
                        <Route path="/review">
                            <StarRating/>
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/menu">
                            <Menu />
                        </Route>
                        <Route path="/menu/:id">
                            <MenuDetail />
                        </Route>
                        <Route path="/menu/edit">
                            <Menu />
                        </Route>
                        <Route exact path="/faq">
                            <Faq />
                        </Route>
                        <Route exact path="/review/:id">
                            <StarRating/>
                        </Route>
                        <Route exact path="/createfaq">
                            <CreateFaq />
                        </Route>
                        <Route exact path="/searchfaq">
                            <SearchFaq/>
                        </Route>
                        <Route path="/students">
                            <Students search={searchStudent} />
                        </Route>
                        <Route path="/courses/:id">
                            <CourseDetail />
                        </Route>
                        <Route path="/courses">
                            <Courses search={searchCourse} />
                        </Route>
                        <Route path="/registrations">
                            <Registrations />
                        </Route>
                        <Route path="/custom">
                            <CustomProduct />
                        </Route>
                        <Route exact path="/chat">
                            <CustomChatbot />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
            </div>

            <Footer />

      </div>
        </>

)
}