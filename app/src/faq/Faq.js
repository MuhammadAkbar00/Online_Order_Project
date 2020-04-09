import React, { useState, useEffect } from 'react';
import db from '../db.js'
import {Button} from "react-bootstrap";


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
        <Button href={"/createfaq"}>Create FAQ</Button>
        <h1>Faq</h1>
        {faq.map(item =>
            item.hidden != "Y" ?
            <div style={{border: 'solid 1px', marginBottom: '20px' }} key={item.id}>
              <p>Question: {item.question}</p>
              <p>Answer: {item.answer}</p>
              <p>Hidden: {item.hidden}</p>
            </div>
                :
                <>
                </>
        )}
        <ul>

        </ul>
      </header>

    </div>
  );
}