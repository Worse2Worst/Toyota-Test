import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import React, {useState, useEffect} from 'react';
import axios from 'axios';



const baseURL = "http://127.0.0.1:5000/v1/users?id=all";

function GetUser() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(baseURL,{
    'method': 'GET',
    headers: {
      'Content-Type': 'applications/json'
    }
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
    .catch(error => console.log(error))
  })

  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Get User</Card.Header>
    <Card.Body>
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    <Button variant="info" type="submit">
        Get User
    </Button>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default GetUser;
