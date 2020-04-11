import React, { useState, useEffect } from 'react';
import db from '../db.js'
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import Auth from '../auth'

export default () => {
  const history = useHistory();

  const [faq, setFaq] = useState([])

  useEffect(() => {
    handleGetByQuery()
  }, [])

  const handleGetByQuery = async () => {
    const faq = await db.faqs.getPublic("")
    console.log("Faq",faq)
    setFaq(faq)
  }

  const handleCreateFaq = () => {
    return history.push(`/createfaq`)
  }

  return (
    faq &&
    <div className="App">
      <header className="App-header">
        {Auth.isAdmin() &&
          <Button onClick={handleCreateFaq}>Create FAQ</Button>
        }
        <h1>Faq</h1>
        {faq.map(item =>
            item.hidden !== "Y" ?
            <div style={{border: 'solid 1px', marginBottom: '20px' }} key={item.id}>
              <p>Question: {item.question}</p>
              <p>Answer: {item.answer}</p>
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