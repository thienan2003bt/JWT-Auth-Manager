import './App.scss';
import Nav from './components/Navigation/nav.js';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/login.js';
import Signup from './components/Signup/signup.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './components/ManageUser/Users.js';
import _ from 'lodash';
import { useState, useEffect } from 'react';

function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  return (
    <div className="App">
      {
        account && !_.isEmpty(account) && account.isAuthenticated
        && <Nav />
      }
      <div>
        <Routes>
          <Route path="/" element="Home">
          </Route>

          <Route path="/news" element="News">
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/signup" element={<Signup />}>
          </Route>
          <Route path="/users" element={<Users />}>
          </Route>
          <Route path="/about" element="about">
          </Route>
          <Route path="/contact" element="contact">
          </Route>
          <Route path="*" element="404 Not Found">
          </Route>


        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div >
  );
}

export default App;
