import React, { useState, useContext } from "react";
import { Container, Card, TextField, Button, Typography } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { users, setCurrentUser } = useContext(UserContext);  // ✅ Ensure this exists
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);  // ✅ Ensure setCurrentUser is available
      navigate("/dashboard");
    } else {
      alert("Invalid credentials or user not registered.");
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <Card className="p-4">
        <h2>Login</h2>
        <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" className="mt-3" onClick={handleLogin}>Login</Button>
        <Typography className="mt-2">
          Not registered? <Link to="/register">Create an account</Link>
        </Typography>
      </Card>
    </Container>
  );
}

export default Login;
