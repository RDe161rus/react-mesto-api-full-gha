import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      id="edit-popup"
      title="Редактировать профиль"
      buttonText="Сохранить"
      name="editProfile"
    >
      <input
        value={name ? name : ''}
        onChange={handleNameChange}
        id="name-input"
        type="text"
        className="input"
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Ваше Имя"
        required
      />
      <span className="form__input-error name-input-error"></span>
      <input
        value={description ? description : ''}
        onChange={handleDescriptionChange}
        id="text-input"
        type="text"
        className="input"
        name="about"
        minLength="2"
        maxLength="200"
        placeholder="Ваша профессия"
        required
      />
      <span className="form__input-error text-input-error"></span>
    </PopupWithForm>
  );
}
