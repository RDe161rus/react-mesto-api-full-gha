import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const cardNameRef = useRef(null);
  const cardLinkRef = useRef(null);

  useEffect(() => {
    cardNameRef.current.value = '';
    cardLinkRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCard({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      id="item-popup"
      title="Новое место"
      buttonText="Сохранить"
      name="addCards"
    >
      <input
        ref={cardNameRef}
        id="name-item-input"
        type="text"
        className="input"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="form__input-error name-item-input-error"></span>
      <input
        ref={cardLinkRef}
        id="text-item-input"
        type="url"
        className="input"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__input-error text-item-input-error"></span>
    </PopupWithForm>
  );
}
