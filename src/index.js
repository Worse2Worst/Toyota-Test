import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AddUser from './functions/AddUser';
import DeleteUser from './functions/DeleteUser';
import ModifyUser from './functions/ModifyUser';
import GetUsers from './functions/GetUsers';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <div className='app'>
    <h1>Home</h1>
    </div>
    <AddUser />
    <GetUsers />
    <ModifyUser />
    <DeleteUser />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
