// src/components/Login.js
import React, { useState } from 'react';
import './Login.css'; // 你可以在这个文件中定义你的登录页面的样式

function Login({ onLogin }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'tp12') {  // 替换 'yourpassword' 为你想要的密码
      onLogin();
    } else {
      alert('Wrong! try again');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="please enter the password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
