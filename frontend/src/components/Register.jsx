import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
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
    onRegister({ email, password });
  }
  return (
    <div className="loginContainer">
      <p className="login__title">Регистрация</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          required
          id="username"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Пароль"
          required
          id="password"
          type="userPassword"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="login__btn-register">
          Зарегистрироваться
        </button>
      </form>
      <div className="login__signup">
        <p>Уже зарегистрированы?</p>
        <Link to="/register" className="login__link">
          Войти
        </Link>
      </div>
    </div>
  );
}
