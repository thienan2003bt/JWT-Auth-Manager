import './App.scss';
import Nav from './components/Navigation/nav.js';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/login.js';

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
          <Route path="/about" element="about">
          </Route>
          <Route path="/contact" element="contact">
          </Route>
          <Route path="*" element="404 Not Found">
          </Route>

        </Routes>
      </div>
    </div >
  );
}

export default App;
