import db from "../db";
import Auth from '../auth'
import { useEffect } from "react";

export default ({ productId, pagename }) => {

    useEffect(()=>{
        saveRecord()
    })

    const saveRecord = async () => {
        let date = new Date()
        let time = date.getHours()
        let month; let day

        if (date.getMonth() < 10) 
            month = "0"+date.getMonth()
        else
            month = date.getMonth()
        
        if (date.getDay() < 10) 
            day = "0"+date.getDay()
        else
            day = date.getDay()
        
        let username; let role
        date = `${date.getFullYear()}-${month}-${day}`
        role = "public"

        if (Auth.user == null)
            username = "guest"  
        else
            username = Auth.user.username
        
        console.log('username is ',username)
        
            
        if (role && username !== "admin") 
            await db.analytics.savePublic(role,{ pagename: pagename, productId: Number.parseInt(productId), date: date, time: time, username: username })
        
        console.log("Logged analytics")
    }

    return(null)

}