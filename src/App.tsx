<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
=======
import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
export default function App() {
  const [user, setUser] = useState(null);

  return user ? (
    <Home user={user} setUser={setUser} />
  ) : (
    <Login setUser={setUser} />
  );
}
>>>>>>> 41fa6a106b91b9fabfa32e2908d48a64c9c2bae5
