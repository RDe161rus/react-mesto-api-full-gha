import headerLogo from '../images/logo-header.svg';
import { Link, Route, Routes } from 'react-router-dom';

export default function Header({ email, onExit }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={headerLogo} />
      <div className="header__wrapper">
        {email ? email : ''}
        <Routes>
          <Route
            path="sign-in"
            element={
              <Link to="/sign-up" className="header__email">
                Регистрация
              </Link>
            }
          />
          <Route
            path="sign-up"
            element={
              <Link to="/sign-in" className="header__email">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link to="/sign-in" className="header__btn" onClick={onExit}>
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}
