import '../App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import api from '../api/axios';


function AddUser() {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState([]);

  const onNameInput = ({target:{value}}) => setUserName(value);
  const onEmailInput = ({target:{value}}) => setEmail(value);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userName);
    console.log(email);
    // Calling the API
    const jsonBody = {
      'name': userName,
      'email': email
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'type': 'add'
      }
    }
    try{
      const response = await api.post('/users', jsonBody, config);
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



  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Add User</Card.Header>
    <Card.Body>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formAddName">
          <Form.Control 
            type="text"
            onChange={onNameInput}
            placeholder="Please input your name..." 
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddEmail">
          <Form.Control 
          type="email" 
          onChange={onEmailInput}
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
