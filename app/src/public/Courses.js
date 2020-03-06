import React, { useState, useEffect } from 'react';
import db from '../db.js'
import Auth from '../auth'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Redirect } from "react-router-dom";
export default ({ search }) => {

  const [courses, setCourses] = useState([])
  const [editId, setEditId] = useState("")
  const [detailId, setDetailId] = useState("")
  const [name, setName] = useState("")
  const [capacity, setCapacity] = useState(0)

  useEffect(() => {
    handleGetByQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleCapacity = (event) => {
    setCapacity(event.target.value)
  }

  const handleGetByQuery = async () => {
    const courses = await db.courses.getPublic(
      search ? `findByNameContaining/${search}` : ''
    )
    setCourses(courses)
  }

  const handleEdit = item => {
    setEditId(item.id)
    setName(item.name)
    setCapacity(item.capacity)
  }

  const handleSave = async () => {
    await db.courses.save({ id: editId, name, capacity })
    setEditId("")
    setName("")
    setCapacity(0)
    handleGetByQuery()
  }

  const handleDelete = async item => {
    await db.courses.deleteById(item.id)
    handleGetByQuery()
  }

  const handleDetail = item => {
    setDetailId(item.id)
  }

  if (detailId === "") {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Courses</h1>
          {
            Auth.isAdmin() &&
            <>
              <Form.Control type="text" placeholder="Name" onChange={handleName} value={name} />
              <Form.Control type="number" placeholder="Capacity" onChange={handleCapacity} value={capacity} />
              <Button onClick={handleSave} >Save</Button>
            </>
          }
          <ul id="list">
            {
              courses.map(item =>
                <li key={item.id}>
                  {item.id} - {item.name} - {item.capacity}
                  <Button onClick={() => handleDetail(item)}>Detail</Button>
                  {Auth.isAdmin() && <Button onClick={() => handleEdit(item)}>Edit</Button>}
                  {Auth.isAdmin() && <Button onClick={() => handleDelete(item)}>X</Button>}
                </li>
              )
            }
          </ul>
        </header>
      </div>
    );
  } else {
    return (
      <Redirect to={`/courses/${detailId}`} />
    )
  }
}