import React, { useState, useEffect } from 'react';
import db from '../db.js'

export default () => {

  const [student, setStudent] = useState(null)
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    handleUserProfile()
    handleUserRegistrations()
  }, [])

  const handleUserProfile = async () => {
    const student = await db.students.getUser("")
    console.log("student", student)
    setStudent(student)
  }

  const handleUserRegistrations = async () => {
    const registrations = await db.registrations.getUser("")
    console.log("registration",registrations)
    setRegistrations(registrations)
  }

  return (
    student &&
    <div className="App">
      <header className="App-header">
        <h1>Student</h1>
        <dl>
          <dt>Name</dt><dd>{student.name}</dd>
          <dt>Age</dt><dd>{student.age}</dd>
        </dl>
        <h1>Courses Registered In</h1>
        <ul>
          {
            registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
          }
        </ul>
      </header>
    </div>
  );
}