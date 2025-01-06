import { Routes, Route } from 'react-router-dom'; // No need for Router here
import './app.css';

import Landing from './landing';
import Login from './components/Login';
import About from './components/pages/About';
import Contact from './components/pages/Contact/Contact';
import UserDash from './components/userdash/UserDash';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/userdash" element={<UserDash/>} />
    </Routes>
  );
}

export default App;
