import React, { useState } from 'react';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    window.location.href = '/student/student-dash.html';
  };

  return (
    <div className="login-container">
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          body {
            background: linear-gradient(135deg, #3498db, #2980b9);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .login-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            width: 100%;
            max-width: 400px;
          }
          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }
          .login-header h2 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #2c3e50;
          }
          .form-group input {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
          }
          .btn-login {
            width: 100%;
            padding: 1rem;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 1rem;
            cursor: pointer;
          }
          .btn-login:hover {
            background: #2980b9;
          }
          .back-link {
            display: block;
            text-align: center;
            margin-top: 1rem;
            color: #3498db;
            text-decoration: none;
          }
          .back-link:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div className="login-header">
        <h2>Student Login</h2>
        <p>Access your learning dashboard</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
      <a href="/" className="back-link">Back to Home</a>
    </div>
  );
};

export default StudentLogin;
