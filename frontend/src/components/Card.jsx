import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${isLiked && 'element__button_active'}`;

  return (
    <article className="element">
      <img onClick={handleCardClick} className="element__img" src={card.link} alt={card.name} />
      <h2 className="element__title">{card.name}</h2>
      <div className="like-counter">
        <button
          onClick={handleLikeClick}
          className={cardLikeButtonClassName}
          type="button"
        ></button>
        <p className="like-counter__card">{card.likes.length}</p>
      </div>
      {isOwn && <button className="element__button-del" onClick={handleDeleteClick} />}
    </article>
  );
}
