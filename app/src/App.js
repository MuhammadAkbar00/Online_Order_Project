import React, {useState} from 'react';
import Authenticate from './public/Authenticate'
import Auth from './auth'
import Home from './public/Home'
import Profile from './user/Profile'
import Logout from './user/Logout'
import Students from './admin/Students'
import Settings from './admin/Settings'
import Courses from './public/Courses'
import CourseDetail from './public/CourseDetail'
import Registrations from './public/Registrations'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import {
    Switch,
    Route,
    Link,
    Redirect,
    useLocation
} from "react-router-dom";

export default () => {
// Hello omar
    const location = useLocation()

    const [searchCourse, setSearchCourse] = useState("")
    const [searchStudent, setSearchStudent] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(Auth.isLoggedIn())
    console.log('isLoggedIn set to', isLoggedIn)
    Auth.init(setLoggedIn)

    const handleSearchCourse = (event) => {
        setSearchCourse(event.target.value)
    }

    const handleSearchStudent = (event) => {
        setSearchStudent(event.target.value)
    }

    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {
                            Auth.isUser() &&
                            <Nav.Link as={Link} to="profile">Profile</Nav.Link>
                        }
                        {
                            Auth.isAdmin() &&
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="students">Students</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="courses">Courses</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="registrations">Registration</NavDropdown.Item>
                            </NavDropdown>
                        }
                        {
                            Auth.isAdmin() &&
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="Settings">Features here</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
                <Nav className="mr-auto navbar-right">
                    {
                        Auth.isLoggedIn()
                            ?
                            <Nav.Link as={Link} to="logout">Logout</Nav.Link>
                            :
                            <>
                                <Nav.Link as={Link} to="register">Register</Nav.Link>
                                <Nav.Link as={Link} to="login">Login</Nav.Link>
                            </>
                    }
                </Nav>
            </Navbar>

            <div>
                <div style={{backgroundColor: "red", float: "left", width: "150px"}}>

                    <h1>Filter</h1>
                    <Form.Control type="text" placeholder="Search Courses by Name" onChange={handleSearchCourse}
                                  value={searchCourse}/>
                    {
                        Auth.isAdmin() &&
                        <Form.Control type="text" placeholder="Search Students by Name" onChange={handleSearchStudent}
                                      value={searchStudent}/>
                    }
                </div>
                <div style={{float: "left", width: "750px"}}>
                    <div>
                        {
                            searchCourse &&
                            location.pathname !== "/courses" &&
                            <Redirect to="/courses"/>
                        }
                        {
                            Auth.isAdmin() &&
                            searchStudent &&
                            location.pathname !== "/students" &&
                            <Redirect to="/students"/>
                        }
                        <Switch>
                            <Route path="/register">
                                <Authenticate type="Register"/>
                            </Route>
                            <Route path="/login">
                                <Authenticate type="Login"/>
                            </Route>
                            <Route path="/logout">
                                <Logout/>
                            </Route>
                            <Route path="/profile">
                                <Profile/>
                            </Route>
                            <Route path="/students">
                                <Students search={searchStudent}/>
                            </Route>
                            <Route path="/courses/:id">
                                <CourseDetail/>
                            </Route>
                            <Route path="/courses">
                                <Courses search={searchCourse}/>
                            </Route>
                            <Route path="/registrations">
                                <Registrations/>
                            </Route>
                            <Route path="/settings">
                                <Settings/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </div>

                    <div>
                        <p>footer</p>
                    </div>
                </div>
            </div>
        </>
    );
}