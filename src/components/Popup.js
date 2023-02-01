export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this.handleEscClose.bind(this);
        this._closePopupByClickOnOverlay = this.closePopupByClickOnOverlay.bind(this);
    }

    handleEscClose(evt) {
        if (evt.key === 'Escape') {
          this.closePopup()
        }
    }

    closePopupByClickOnOverlay(evt) {
      if (evt.target == evt.currentTarget) {
          this.closePopup();
          }
    }
  
    openPopup() {
        this._popup.classList.add('popup__is-opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._closePopupByClickOnOverlay);
        document.addEventListener('click', this._closePopupByButton);
    }
      
    closePopup() {
        this._popup.classList.remove('popup__is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._closePopupByClickOnOverlay);
        document.removeEventListener('click', this._closePopupByButton);
    }

    setEventListeners(evt) {
      this._popup.addEventListener('mosedown', (evt)  => {
        if (evt.target == evt.currentTarget) {
          this.closePopup();
        }
      });
      this._popup.addEventListener('keydown', (evt) => {
        if (evt.target == evt.currentTarget) {
          this.closePopup();
        }
      });
      this._popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('close-button')) {
          this.closePopup();
        }
      });
    }
  }