import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // CSS 파일 import

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('로그인:', email, password);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.msg === 'Success') {
        localStorage.setItem('accessToken', data.token);
        toast.success(data.name + '님 반가워요!');
        navigate('/game');
      } else {
        toast.error('로그인 실패 ㅠㅜ');
      }
    } catch (error) {
      console.error('Login Error : ', error);
      toast.error('로그인 중 오류 발생..');
    }
  };

  return (
    <div className="login-container">
      <h2>아기사자 로그인</h2>
      <img
        src={`${process.env.PUBLIC_URL}/little-lion.png`}
        alt="Little Lion"
        className="little-lion-img"
      />
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
          처음 온 아기사자인가요? <Link to="/signup">회원가입</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
