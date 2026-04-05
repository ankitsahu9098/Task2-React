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
