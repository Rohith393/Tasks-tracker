import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem('username');
    if (existingUser) {
      navigate('/dashboard', { replace: true });
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert('Please enter a username');
      return;
    }
    localStorage.setItem('username', username);
    navigate('/dashboard', { replace: true });
  };

  if (checkingAuth) return null;

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <br />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;