import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import api from '../api/axios';
import Alert from 'react-bootstrap/Alert';


function GetUsers() {

  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams([['id', 'all']]);
      const response = await api.get('/users', { params });
      setUsers(response.data);
      if (response.data.hasOwnProperty("error")) {
        setAlertMessage(response.data.error);
        setAlert(true);
      }
    } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          setAlertMessage(err.response);
          setAlert(true)
        } else {
          console.log(`Error: ${err.message}`);
          setAlertMessage(err.message);
          setAlert(true);
        }
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const handleClick = async () => {
      fetchUsers();
    };
  return (
    <div className='app'>
      <div className='card'>
        <Card>
          <Card.Header>Get Users</Card.Header>
          <Card.Body>

          <Alert show={alert} variant='danger' onClose={() => setAlert(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
          {alertMessage}
          </p>
          </Alert>
  
            <UsersList users = {users}/>
            <Button variant="info" onClick={handleClick}>
              Get Users
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default GetUsers;
