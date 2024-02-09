import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // CSS 파일 import

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('로그인:', email, password);
      navigate('/game'); // 로그인 성공 시 게임 페이지로 이동
    };
  
    return (
      <div className="login-container">
        <h2>아기사자 로그인</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label>이메일 </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호 </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">로그인</button>
          {/* 회원가입 페이지로 이동하는 링크 추가 */}
          <p>
            처음 와본 아기사자인가요? <Link to="/signup">회원가입</Link>
          </p>
        </form>
      </div>
    );
  }
  
  export default Login;
  