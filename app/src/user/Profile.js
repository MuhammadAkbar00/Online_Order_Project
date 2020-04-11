import React, {useState, useEffect} from 'react';
import db from '../db.js'

export default () => {

    const [user, setUser] = useState(null)
    // const [registrations, setRegistrations] = useState([])

    useEffect(() => {
        handleUserProfile()
        // handleUserRegistrations()
    }, [])

    const zeroPad = (num, places) => String(num).padStart(places, '0');

    const getDateFormatted = () => {
        const today = new Date();
        let month;
        let day;
        if (today.getMonth() < 10) {
            month = zeroPad(today.getMonth(), 2);
        } else {
            month = today.getMonth() + 1;
        }
        if (today.getDate() < 10) {
            day = zeroPad(today.getDate(), 2);
        } else {
            day = today.getDate();
        }
        return today.getFullYear() + '-' + month + '-' + day;
    };

    const rand = (length, current) => {
        current = current ? current : '';
        return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ".charAt(Math.floor(Math.random() * 36)) + current) : current;
    }


    const handleUserProfile = async () => {
        const user = await db.users.getByQuery('user', 'loggeduser')
        const date = getDateFormatted();
        console.log("user", user)
        if (user.points >= 2000) {
            const code = rand(5);
            console.log("code: ", code)
            const newCo = {
                user: user,
                discount: 2,
                code: code,
                expire: date,
                desc: "2% discount from playing our game!"
            };
            const response = await db.coupons.saveNoFormat('user', newCo);
            if (response!=1) {
                user.points -= 200;
            }
        }
        await db.users.saveNoFormat('user', user)
        setUser(user)
        console.log("after set", user)
    }

    // const handleUserRegistrations = async () => {
    //   const registrations = await db.registrations.getUser("")
    //   console.log("registration",registrations)
    //   // setRegistrations(registrations)
    // }

    return (
        user &&
        <div className="App">
            <header className="App-header">
                <h1>User</h1>
                <dl>
                    <dt>Username</dt>
                    <dd>{user.username}</dd>
                    <dt>First name</dt>
                    <dd>{user.firstName}</dd>
                    <dt>Last name</dt>
                    <dd>{user.lastName}</dd>
                    <dt>Address</dt>
                    <dd>{user.address}</dd>
                    <dt>Email</dt>
                    <dd>{user.email}</dd>
                    <dt>Mailing</dt>
                    <dd>{user.mailing}</dd>
                    <dt>Points</dt>
                    <dd>{user.points}</dd>
                    <dt>Language</dt>
                    <dd>{user.language}</dd>
                </dl>
                <h1>Orders</h1>
                <ul>
                    {
                        // registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
                    }
                </ul>
            </header>
        </div>
    );
}