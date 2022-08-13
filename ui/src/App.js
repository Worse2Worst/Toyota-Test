import './App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className='app'>
      
    <div className='card'>
    <Card>
    <Card.Header>Add User</Card.Header>
    <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formAddName">
          <Form.Control type="text" placeholder="Please input your name..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddEmail">
          <Form.Control type="email" placeholder="Please input your email..." />
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

export default App;
