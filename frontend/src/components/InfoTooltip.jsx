export default function InfoTooltip({ isOpen, onClose, title, src }) {
  return (
    <div className={`popup ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__container popup__container_tooltip">
        <button id="close-popup-btn" className="popup__close-btn" type="button" onClick={onClose} />
        <img className="popup__img-tooltip" src={src} alt={title} />
        <h3 className="popup__title">{title}</h3>
      </div>
    </div>
  );
}
