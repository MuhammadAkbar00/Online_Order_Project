import React, { useState, useEffect } from 'react';
import db from '../db'
import StudentDetail from './StudentDetail'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

export default ({ search }) => {

  const [students, setStudents] = useState([])
  const [editId, setEditId] = useState("")
  const [detailId, setDetailId] = useState("")
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [searchName, setSearchName] = useState(search)

  useEffect(() => {
    handleGetByQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName, search])

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }

  const handleAge = (event) => {
    setAge(event.target.value)
  }

  const handleGetByQuery = async () => {
    // only admin can search by student name so following uses /search type of url
    const students = await db.students.getAdmin(searchName ?`/search/findByNameContaining?name=${searchName}` : '')
    setStudents(students)
  }

  const handleEdit = item => {
    setEditId(item.id)
    setName(item.name)
    setAge(item.age)
  }

  const handleSave = async () => {
    await db.students.save({ id: editId, name, age })
    setEditId("")
    setName("")
    setAge("")
    handleGetByQuery()
  }

  const handleDelete = async item => {
    await db.students.deleteById(item.id)
    handleGetByQuery()
  }

  const handleDetail = item => {
    setDetailId(item.id)
  }

  if (detailId === "") {
    console.log('students', students)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Students</h1>
          <Form.Control type="text" placeholder="Name" onChange={handleName} value={name} />
          <Form.Control type="text" placeholder="Age" onChange={handleAge} value={age} />
          <Button onClick={handleSave} >Save</Button>
          <Form.Control type="text" placeholder="Search by Name" onChange={handleSearchName} value={searchName} />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {
                students.map(item =>
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>
                      <Button onClick={() => handleDetail(item)}>Detail</Button>
                      <Button onClick={() => handleEdit(item)}>Edit</Button>
                      <Button onClick={() => handleDelete(item)}>X</Button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </header>
      </div>
    );
  } else {
    return (
      <StudentDetail id={detailId} />
    )
  }
}