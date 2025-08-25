import React, { useState } from 'react';
import '../../css/Login.css';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    
    try {
      const res = await API.post("/user/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token); // ✅ Save token
        setSuccess(res.data.message || "Login successful");
        navigate('/posts'); // ✅ redirect after login
      } else {
        setErr("No token received from server");
      }
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit">Sign In</button>
        
        {/* Messages */}
        {err && <p className="error">{err}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}
