import '../App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import api from '../api/axios';


function AddUser() {
  
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users?id=all');
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

  let state = {
    name: "",
    email: ""
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(state.name);
    console.log(state.email);
  }

  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Add User</Card.Header>
    <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formAddName">
          <Form.Control 
            type="text" 
            placeholder="Please input your name..." 
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddEmail">
          <Form.Control 
          type="email" 
          placeholder="Please input your email..."
          />
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default AddUser;
