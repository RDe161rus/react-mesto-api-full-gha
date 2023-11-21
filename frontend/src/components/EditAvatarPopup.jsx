import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      id="avatar-popup"
      title="Обновить аватар"
      buttonText="Сохранить"
      name="avatarForm"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        id="avatar-input"
        type="url"
        className="input"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm>
  );
}
