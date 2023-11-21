import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
      <main className="main">
        <section className="profile">
          <div className="profile__profile-group">
            <div className="profile__overlay">
              <img
                onClick={onEditAvatar}
                className="profile__avatar"
                src={currentUser.avatar}
                alt="аватар"
              />
            </div>

            <div className="profile__profile-info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                id="opened-popup-btn"
                className="profile__edit-button"
                type="button"
              ></button>
              <p className="profile__text">{currentUser.about}</p>
            </div>
          </div>
          <button
            onClick={onAddPlace}
            id="opened-add-button"
            className="profile__add-button"
            type="button"
          ></button>
        </section>
        <section className="elements">
          {cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              currentUser={currentUser}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
  );
}
