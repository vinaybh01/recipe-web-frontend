import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import LoadingSpinner from "../components/LoadingSpinner";

export const Auth = () => {
  return (
    <>
      <div className="image">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          alt=""
          className="login-image"
        />
      </div>
      <div className="auth other">
        <Login />
        <Register />
      </div>
    </>
  );
};

const Login = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = process.env.REACT_APP_BASIC_URL;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const result = await axios.post(`${URL}/auth/login`, {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError("Incorrect username or password");
      setTimeout(() => {
        setError("");
      }, 2500);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="button-submit" type="submit">
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_BASIC_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      setTimeout(() => {
        setError("");
      }, 2500);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${URL}/auth/register`, {
        username,
        password,
      });
      setLoading(false);
      alert("Registration Completed! Now login.");
      navigate("/");
    } catch (error) {
      setError("Username has taken");
      setTimeout(() => {
        setError("");
      }, 2500);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="button-submit" type="submit">
          {loading ? <LoadingSpinner /> : "Register"}
        </button>
      </form>
    </div>
  );
};
