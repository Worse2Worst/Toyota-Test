import React from 'react'
import Table from 'react-bootstrap/Table';


function UsersList(props) {
  return (
    <div>
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
                {
                  props.users && props.users.map((user, index) => {
                    return (
                      <tr>
                        <td>{index}</td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
    </Table>
    </div>
  );
}

export default UsersList;
