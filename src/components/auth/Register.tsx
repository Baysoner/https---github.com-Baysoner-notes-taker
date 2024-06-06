import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container } from "react-bootstrap";
import { User } from "./Login";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find((user: User) => user.username === username);

    if (userExists) {
      alert("User already exists");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username);
    navigate("/home");
  };

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleRegister}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <button type="submit" className="btn btn-dark m-2">
          Register
        </button>
        <Link to="/">
          <button type="button" className="btn btn-outline-dark">
            Back to Login
          </button>
        </Link>
      </Form>
    </Container>
  );
};

export default Register;
