import '../App.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

function AddUser() {
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
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    {/* DROP DOWN  */}

    <Button variant="danger" type="submit">
        Delete User
    </Button>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default AddUser;
