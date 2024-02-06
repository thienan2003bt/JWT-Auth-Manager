import './App.scss';
import Nav from './components/Navigation/nav.js';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/login.js';
import Signup from './components/Signup/signup.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Nav />
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
