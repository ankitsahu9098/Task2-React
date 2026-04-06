<<<<<<< HEAD
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
=======
import { useState } from "react";
import { ApiService } from "../services";

export default function Login({ setUser }: { setUser: (user: any) => void }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await ApiService.post("/users/login", form);

      if (res) {
        setUser(res);
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Login failed");
>>>>>>> 41fa6a106b91b9fabfa32e2908d48a64c9c2bae5
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>User Login</h2>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f2f3",
  },
  card: {
    padding: 30,
    background: "white",
    borderRadius: 8,
    width: 300,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#f48024",
    color: "white",
    border: "none",
  },
};
>>>>>>> 41fa6a106b91b9fabfa32e2908d48a64c9c2bae5
