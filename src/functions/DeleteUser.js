import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Alert from 'react-bootstrap/Alert';


function DeleteUser() {
  
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);
  const [ID, setID] = useState(-1);
  const [dropDownValue, setDropDownValue] = useState("Please select id to delete...");

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
          setAlertMessage(err.response);
          setAlert(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(ID);
    if (ID === -1) {
      setAlertMessage("Please select an ID to delete!!");
      setAlert(true);
      return;
    }
    // Calling the API
    const jsonBody = {
      'id': ID
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'type': 'del'
      }
    }
    try {
      const response = await api.post('/users', jsonBody, config);
      if (response.data.hasOwnProperty("error")) {
        setAlertMessage(response.data.error);
        setAlert(true);
      } else {
        setSuccessAlert(true);
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

  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Delete User</Card.Header>
    <Card.Body>
      <Alert show={alert} variant='danger' onClose={() => setAlert(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
      {alertMessage}
      </p>
      </Alert>

      <Alert show={successAlert} variant='success' onClose={() => setSuccessAlert(false)} dismissible>
        <Alert.Heading>Success!!</Alert.Heading>
        <p>
        Deleted a member from the database.
        </p>
      </Alert>
    <Dropdown onClick={fetchUsers}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        {dropDownValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {users.map(user => {
          return (
        <Dropdown.Item onClick={() => {setID(user.id); setDropDownValue(user.id); }}>
          {user.id}
          </Dropdown.Item>
          )
         })}
      </Dropdown.Menu>
    </Dropdown>
    <Button variant="danger" type="submit" onClick={handleSubmit}>
        Delete User
    </Button>
    </Card.Body>
    </Card>
    
    </div>
    </div>
    );
}

export default DeleteUser;
