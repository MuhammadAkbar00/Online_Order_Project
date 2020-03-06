import React, { useState, useEffect } from 'react';
import db from '../db'
import Auth from '../auth'
import { useParams } from "react-router-dom";

export default () => {

  const { id } = useParams();

  const [course, setCourse] = useState(null)
  const [registrations, setRegistrations] = useState([])

  useEffect(() => {
    handleGetOne(id)
    if (Auth.isAdmin()) {
      handleGetRegistrationsByCourse(id)
    }
  }, [id])

  const handleGetOne = async (id) => {
    const course = await db.courses.getPublic(id)
    setCourse(course)
  }

  const handleGetRegistrationsByCourse = async (id) => {
    const registrations = await db.registrations.getAdmin(`/search/findByCourseId?id=${id}`)
    setRegistrations(registrations)
  }

  return (
    course &&
    <div className="App">
      <header className="App-header">
        <h1>Course</h1>
        <dl>
          <dt>Name</dt><dd>{course.name}</dd>
          <dt>Capacity</dt><dd>{course.capacity}</dd>
        </dl>
        {Auth.isAdmin() && <h1>Students Registered In Course</h1>}
        <ul>
          {
            registrations.map(item => <li key={item.id}>{item.student.name} - {item.student.age}</li>)
          }
        </ul>
      </header>
    </div>
  );
}