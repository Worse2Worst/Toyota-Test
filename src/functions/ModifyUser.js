import '../App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import api from '../api/axios';
import Alert from 'react-bootstrap/Alert';


function ModifyUser() {
  
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [ID, setID] = useState(-1);
  const [newName, setNewName] = useState("");
  const [dropDownValue, setDropDownValue] = useState("Please select id to modify the user's name...");

  const onNameInput = ({target:{value}}) => setNewName(value);

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
    console.log(ID);
    if (ID === -1) {
      setAlertMessage("Please select an ID to Modify!!");
      setAlert(true);
      return;
    }

    if (newName.trim() === "") {
      setAlertMessage("Please input new name!!");
      setAlert(true);
      return;
    }
    // Calling the API

    const jsonBody = {
      'id': ID,
      'name': newName
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'type': 'mod'
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
    <Card.Header>Modify User's Name</Card.Header>
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
        Changed the name of member ID: {ID} to {newName}.
        </p>
      </Alert>

    <Dropdown onClick={fetchUsers}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        {dropDownValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
         {users.map(user => {
          return (
        <Dropdown.Item onClick={() => {setID(user.id); setDropDownValue(user.id); }}> {user.id} </Dropdown.Item>
          )
         })}
      </Dropdown.Menu>
    </Dropdown>

    <Form>
      <Form.Group className="mb-3" controlId="formModifyName">
          <Form.Control type="text" placeholder="Please input the new name..." onChange={onNameInput}/>
        </Form.Group>
    </Form>

    <Button variant="warning" type="submit" onClick={handleSubmit}>
        Modify User Name
    </Button>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default ModifyUser;
