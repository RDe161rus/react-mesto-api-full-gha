import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }
  return (
    <div className="loginContainer">
      <p className="login__title">Вход</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          required
          id='regEmail'
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Пароль"
          required
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="login__btn-register">
          Войти
        </button>
      </form>
    </div>
  );
}
