import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import api from '../api/axios';


function DeleteUser() {
  
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
