import { useState } from 'react';
import { post } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', name: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const res = await post('users/register', form);
    if (res) {
        alert('Registration successful! Please login.');    
        navigate('/login');
    } else {
        alert('Registration failed. Try again.');
    }
    
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input className="input" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="input" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn" onClick={handleSubmit}>Register</button>
      </div>
    </div>
  );
}