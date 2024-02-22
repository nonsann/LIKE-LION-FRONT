import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('회원가입:', name, email, password);

    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/auth/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok && data.msg === 'Success') {
      toast.success('회원가입 성공!');
      navigate('/');
    } else {
      toast.error('회원가입 실패 ㅠㅜ');
    }
  };

  return (
    <div className="signup-container"> {/* CSS 클래스 적용 */}
      <h2>아기사자 회원가입</h2>
      <form onSubmit={handleSubmit} className="signup-form"> {/* CSS 클래스 적용 */}
        <div>
          <label>이름 </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Signup;

