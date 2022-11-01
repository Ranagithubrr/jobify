import './App.css';
import Landing from './Pages/Landing/Landing';
import { Routes, Route } from "react-router-dom";
import Homepage from './Pages/Homepage/Homepage';
import PageNotFound from './Pages/PageNotfound/PageNotfound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
  return (
    <div className='container-fluid'>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="*" element={<PageNotFound />} /> 

      </Routes>
    </div>
  );
}

export default App;
