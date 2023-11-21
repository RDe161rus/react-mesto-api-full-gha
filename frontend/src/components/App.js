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
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [register, setRegister] = useState(null);
  const [intoTooltip, setIntoTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  //
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(e => console.error(e));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(res => {
        setCards(state => state.filter(item => card._id !== item._id));
      })
      .catch(e => console.error(e));
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
        console.error(err);
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
        console.error(err);
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
      .catch(err => {
        console.error(err);
      });
  }
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
  //

  const handleRegister = ({ email, password }) => {
    auth
      .register(email, password)
      .then(res => {
        setRegister(res);
        setIntoTooltip(true);
        navigate('/sign-in');
      })
      .catch(err => {
        console.error(err);
        setRegister(null);
        setIntoTooltip(true);
      });
  };
  const handleLogin = ({ email, password }) => {
    auth
      .login(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          navigate('/', { replace: true });
          return res;
        }
      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      checkToken(jwt);
    }
  }, [loggedIn]);

  const checkToken = jwt => {
    auth
      .checkToken(jwt)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  const handleExit = () => {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
  };
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
