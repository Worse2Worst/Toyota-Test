import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import api from '../api/axios';


function GetUsers() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch(baseURL, {
  //     'method': 'GET',
  //     headers: {
  //       'Content-Type': 'applications/json'
  //     }
  //   })
  //     .then(resp => resp.json())
  //     .then(resp => setUsers(resp))
  //     .catch(error => console.log(error))
  // }, [])

  useEffect(() => {
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

    fetchUsers();
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
