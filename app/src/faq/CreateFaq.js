import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import db from '../db.js'
import {ButtonGroup} from "react-bootstrap";
import {
  Switch,
  Redirect, BrowserRouter, useHistory,
} from "react-router-dom";


export default () => {

  const [faq, setFaq] = useState(null)
  //I used this to get the url and I also use to to change the url. (Imported from react-router-dom)
  const history = useHistory();

//Question will be storing the value of what will be set by setQuestion
  //Answer will be storing the value of what the user has typed into the textbox (same as question)
  //Hidden will store "Y" or "N" depending on the option the admin has chosen.
  const [question, setQuestion] = useState("")
  const [answer , setAnswer ] = useState("")
  const [hidden , setHidden ] = useState("")

  useEffect(() => {
  }, [faq])

  //This will run everytime the user types in the question textbox
  //And this will set the question into whatever is in the textbox or whatever the user has typed.
  const handleQuestion = (event) => {
    setQuestion(event.target.value)
  }
  //This will run every time the user types in the answer textbox
  //And this will set the question into whatever is in the textbox or whatever the user has typed.
  const handleAnswer = (event) => {
    setAnswer(event.target.value)
  }
  //This will run every time the user clicks on a radiobutton
  //And this will set the Hidden value into "Y" or "N".
  const handleHidden = (event) => {
    setHidden(event.target.value)
  }

//This function is run when the user clicks on the "Create" button
  //this will create an object with the Key field which should be the same as the Model for this object.
  //The key data will be the useState variables.
  //The function is an async because we will need to wait for the database as it takes a while to POST or GET from the database
  //Then we have an await because we will need to wait for the database to finish its process before we carry on.
  //Then fq (object we created) will be sent to saveFaq(). saveFaq is a function I created in the db. I copied the save() function in db however I removed "await this.reformatOne(this.table.substring(0, this.table.length - 1), json)" as it was not necessary to reformat the json.
  //the saveFaq() will then create a json body out of the object we created and run stringify which basically adds "" to the object data values.
  //It then the Admin Controller will have a POST method for faq that will check whether or not the ROLE of the user is "ROLE_ADMIN" and if it is not it will do nothing and return null.
  //If user is ROLE_ADMIN then continue with the function which will create an an object that is an instance of FAQ and it will set the question, answer and hidden into the data in the Requestbody.
  //and once they are all set, it will run faqRepository.save() passing the object we created and it will save into the FAQ table.
//We do not need to set ID as it is automatically generated.
  //after that is done, and the new FAQ is saved. I set answer, question and hidden into "" so it removes whatever value it had before and makes it "" so the textbox will also remove whatever the previous FAQ question and answer in the textbox was and makes it empty
  //I then return history.push('/home') which will basically change the url into /home and will show the admin the home page.
  const handleSave = async () => {
    let fq = {
      question: question,
      answer: answer,
      hidden: hidden
    }
    await db.faqs.saveFaq(fq)
    setAnswer("")
    setQuestion("")
    setHidden("")
    return history.push(`/home`)
  }


  //the first form control is the textbox for question will run handleQuestion after every key typed
  //the second on is the textbox for answer will run handleAnswer after every key type
  //and then i have radio buttons with values "Y" and "N" accordingly, will run handleHidden everytime a radio is clicked
  //and i have a save button to run handleSave whenever it is clicked.
  return (
    <div className="App">
      <header style={{marginLeft:200}} className="App-header">
        <h1>User</h1>
        <dl>
          <dt>Question</dt>
          <dd>
            <Form.Control type="text" style={{width:'500px'}} placeholder={`Question`} onChange={handleQuestion} value={question} />
          </dd>
          <dd>
            <Form.Control type="text" style={{width:'500px'}} placeholder={`Answer`} onChange={handleAnswer} value={answer} />
          </dd>
          <dt>Hidden</dt>
          <div className={"form-check form-check-inline"}>
            <input type="radio" onClick={handleHidden} value={"Y"} className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample"></input>
              <label className="form-check-label" htmlFor="materialInline1">Yes</label>
          </div>
          <div className={"form-check form-check-inline"}>
            <input type="radio" onClick={handleHidden} value={"N"} className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample"></input>
            <label className="form-check-label" htmlFor="materialInline1">No</label>
          </div>

        </dl>
        <Button onClick={handleSave} >Create</Button>
      </header>
    </div>
  );
}