export default function PopupWithForm({
  title,
  name,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit
}) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} id="close-popup-btn" className="popup__close-btn" type="button" />
        <h3 className="popup__title">{title}</h3>
        <form className="form" name={name} autoComplete="off" onSubmit={onSubmit}>
          <fieldset className="form__fieldset">{children}</fieldset>
          <button className="form__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
