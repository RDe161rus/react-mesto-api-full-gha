import '../index.css';
import ok from '../images/ok.png';
import err from '../images/err.png';
import * as auth from '../utils/auth.jsx';
import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);
  const [intoTooltip, setIntoTooltip] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => console.error(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  //
  const handleCardClick = data => {
    setSelectedCard(data);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
        
      })
      .catch(e => console.error(`Ошибочка ${e}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(res => {
        setCards(state => state.filter(item => card._id !== item._id));
      })
      .catch(e => console.error(`Ошибочка ${e}`));
  }
  //
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then(data => {
        setCurrentUser(data);
        setIsEditProfilePopupOpen(false);
      })
      .catch(err => {
        console.error(`Ошибочка ${err}`);
      });
  }
  //
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then(data => {
        setCurrentUser(data);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(err => {
        console.error(`Ошибочка ${err}`);
      });
  }
  //
  function handleAddPlaceSubmit(data) {
    api
      .addCards(data)
      .then(data => {
        setCards([data, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(e => {
        console.error(`Ошибочка ${e}`);
      });
  }

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(res => {
        setRegister(true);
        setIntoTooltip(true);
        navigate('/sign-in');
      })
      .catch(e => {
        console.error(`Ошибочка ${e}`);
        setRegister(false);
        setIntoTooltip(true);
      });
  };
  const handleLogin = ({ email, password }) => {
    auth
      .login(email, password)
      .then(res => {
        if (res.token) {
          navigate('/', { replace: true });
          return res;
        }
      })
      .catch(e => console.error(`Ошибочка ${e}`));
  };

  const handleExit = () => {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate('/');
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [token, navigate]);

  //
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
    setIntoTooltip(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onExit={handleExit} />
        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />

          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />

          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick} //
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
              />
            }
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}
        />

        <PopupWithForm id="confirm-popup" title="Вы уверены?" buttonText="Да" name="addCards" />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={intoTooltip}
          onClose={closeAllPopups}
          title={
            register ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
          src={register ? ok : err}
        />
        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
