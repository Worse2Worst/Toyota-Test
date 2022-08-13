import '../App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

function ModifyUser() {
  return (
    <div className='app'>
    <div className='card'>
    <Card>
    <Card.Header>Modify User Name</Card.Header>
    <Card.Body>
     {/*TODO, have to look into dropdown thing, change drop down menu too */}
    <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Please select id to modify the username
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Form>
      <Form.Group className="mb-3" controlId="formModifyName">
          <Form.Control type="text" placeholder="Please input the new name..." />
        </Form.Group>
    </Form>
    {/* DROP DOWN  */}

    <Button variant="warning" type="submit">
        Modify User Name
    </Button>
    </Card.Body>
    </Card>
    </div>
    </div>
    );
}

export default ModifyUser;
