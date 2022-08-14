import '../App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import api from '../api/axios';


function ModifyUser() {
  
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams([['id', 'all']]);
      const response = await api.get('/users', { params });
      setUsers(response.data);
    } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Modify User's Name</Card.Header>
    <Card.Body>
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Please select id to modify the user's name
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

    <Form>
      <Form.Group className="mb-3" controlId="formModifyName">
          <Form.Control type="text" placeholder="Please input the new name..." />
        </Form.Group>
    </Form>
    {/* DROP DOWN  */}

    <Button variant="warning" type="submit">
        Modify User Name
    </Button>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default ModifyUser;
