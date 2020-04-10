import React, { useState, useEffect } from 'react';
import db from '../db.js';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default (prop) => {

    const [faq, setFaq] = useState(null)
    const [searchfaq, setSearchFaq] = useState("")
    const [refresh, setRefresher] = useState(false)

    useEffect(() => {
        handleGetByQuery()
    }, [searchfaq])

    const handleSave = () => {
        console.log("Peep this")
        setRefresher(true)
        prop.triggerNextStep()
    }

    const handleFaqSearch = (event) => {
        setSearchFaq(event.target.value)
    }

    const handleGetByQuery = async () => {
        const faqs = await db.faqs.getPublic('')
        let filt = []
        console.log("Faq",faq)
        if(searchfaq != ""){
            faqs.map((item) => {
                if(item.question.toLowerCase().includes(searchfaq.toLowerCase())){
                    filt.push(item)
                }
            })
            setFaq(filt)
        }else{
            setFaq(faqs)
        }
        console.log("Filter", filt)
    }

    return (
        refresh ?
        faq.length > 0 ?
            <div className={"chatbotfaq"}>
            {faq.map(item =>
                <div key={item.id}>
                    <h3>Question:</h3>
                    <p>{item.question}</p>
                    <h3>Answer:</h3>
                    <p>{item.answer}</p>
                </div>
            )}
            </div>
            :
            <div className={"chatbotfaq"}>
                <p>Sorry! There is no answer to this question</p>
            </div>
            :
            <div className={"chatbotfaq"}>
                <dt>Question</dt>
                <dd>
                    <Form.Control type="text" style={{width:'250px'}} placeholder={`Question`} onChange={handleFaqSearch} value={searchfaq} />
                    <Button onClick={handleSave}>Create</Button>
                </dd>
            </div>
    );


}