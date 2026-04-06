import React, { useState } from "react";
import { ApiService } from "../services";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await ApiService.post("users/login", { username, password });

      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate('/home');
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-2xl shadow w-80">
      
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
        Login
      </h2>

      <input
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
      )}

      <p className="text-sm text-center mt-4 text-gray-600">
        Don't have an account?
        <Link
          to="/register"
          className="text-blue-500 hover:underline ml-1"
        >
          Register
        </Link>
      </p>

    </div>
  </div>
);

};

export default Login;