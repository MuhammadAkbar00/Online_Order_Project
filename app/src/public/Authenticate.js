import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Auth from '../auth'
import { Redirect } from "react-router-dom";

export default ({ type }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(Auth.isLoggedIn())

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleSave = async () => {
        await Auth.authenticate(type, username, password)
        setLoggedIn(Auth.isLoggedIn())
    }

    if (isLoggedIn) {
        return (
            <Redirect to="/" />
        )
    } else {
        return (
            <>
                <h1>{type}</h1>
                <Form.Control type="text" placeholder="Username" onChange={handleUsername} value={username} />
                <Form.Control type="password" placeholder="Password" onChange={handlePassword} value={password} />
                <Button onClick={handleSave} >{type}</Button>
            </>
        );
    }
}