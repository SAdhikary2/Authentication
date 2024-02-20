import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from "react-hot-toast";
import Home from './components/Home';
import Forgot from './components/Forgot';
import NewPass from './components/NewPass';






function App() {
  return (
    <>
       <Toaster />
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/forgot-password" element={<Forgot/>} />
        <Route path="/newPassword" element={<NewPass/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;