import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';



const baseURL = "http://127.0.0.1:5000/v1/users?id=all";

function GetUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(baseURL, {
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
          <Card.Header>Get Users</Card.Header>
          <Card.Body>
            <UsersList users = {users}/>
            <Button variant="info" type="submit">
              Get Users
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default GetUsers;
