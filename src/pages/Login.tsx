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
    }
  };

  return (
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
