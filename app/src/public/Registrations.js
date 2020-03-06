import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default () => {

  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [editId, setEditId] = useState("")
  const [studentId, setStudentId] = useState("")
  const [courseId, setCourseId] = useState("")

  useEffect(() => {
    handleGetAll()
  }, [])

  const handleStudentId = (event) => {
    setStudentId(event.target.value)
  }

  const handleCourseId = (event) => {
    setCourseId(event.target.value)
  }

  const handleGetAll = async () => {
    const students = await db.students.getAll()
    const courses = await db.courses.getAll()
    const registrations = await db.registrations.getAll()
    setStudents(students)
    setCourses(courses)
    setRegistrations(registrations)
  }

  const handleEdit = item => {
    setEditId(item.id)
    setStudentId(item.student.id)
    setCourseId(item.course.id)
  }

  const handleSave = async () => {
    const student = students.find(item => item.id === 1 * studentId)
    const course = courses.find(item => item.id === 1 * courseId)
    await db.registrations.save({ id: 1 * editId, student: student.self, course: course.self })
    setEditId("")
    setStudentId("")
    setCourseId("")
    handleGetAll()
  }

  const handleDelete = async item => {
    await db.registrations.deleteById(item.id)
    handleGetAll()
  }

  console.log('registrations', registrations)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Registrations</h1>
        <Form.Control as="select" onChange={handleStudentId} value={studentId}>
          <option value="" disabled hidden>Student</option>
          {
            students.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
          }
        </Form.Control>
        <Form.Control as="select" onChange={handleCourseId} value={courseId}>
          <option value="" disabled hidden>Course</option>
          {
            courses.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
          }
        </Form.Control>
        <Button onClick={handleSave} >Save</Button>
        <ul id="list">
          {
            registrations.map(item =>
              <li key={item.id}>
                {item.id} - {item.student.name} - {item.course.name}
                <Button onClick={() => handleEdit(item)}>Edit</Button>
                <Button onClick={() => handleDelete(item)}>X</Button>
              </li>
            )
          }
        </ul>
      </header>
    </div>
  );
}