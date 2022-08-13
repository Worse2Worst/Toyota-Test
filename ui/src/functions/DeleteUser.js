import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';


const baseURL = "http://127.0.0.1:5000/v1/users";

function DeleteUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(baseURL + "?id=all", {
      'method': 'GET',
      headers: {
        'Content-Type': 'applications/json'
      }
    })
      .then(resp => resp.json())
      .then(resp => setUsers(resp))
      .catch(error => console.log(error))
  }, [])
  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Delete User</Card.Header>
    <Card.Body>
     {/*TODO, have to look into dropdown thing, change drop down menu too */}
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Please select id to delete
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {users.map(user => {
          return (
        // <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item>{user.id}</Dropdown.Item>
          )
         })}
      </Dropdown.Menu>
    </Dropdown>

    <Button variant="danger" type="submit">
        Delete User
    </Button>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default DeleteUser;
