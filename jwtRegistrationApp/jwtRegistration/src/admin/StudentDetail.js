import React, { useState, useEffect } from 'react';
import db from '../db.js'

export default ({ id }) => {

  const [student, setStudent] = useState(null)
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    handleGetOne(id)
    handleGetRegistrationsByStudent(id)
  }, [id])

  const handleGetOne = async (id) => {
    const student = await db.students.getOne(id)
    setStudent(student)
  }

  const handleGetRegistrationsByStudent = async (id) => {
    const registrations = await db.registrations.getAdmin(`/search/findByStudentId?id=${id}`)
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
            //registrations.filter(item => item.student.id === student.id).map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
            registrations.map(item => <li key={item.id}>{item.course.name} - {item.course.capacity}</li>)
          }
        </ul>
      </header>
    </div>
  );
}