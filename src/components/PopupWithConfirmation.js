import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup{
    constructor(PopupSelector) {
        super(PopupSelector);
        this._formElement =  this._popup.querySelector('.popup-delete__form');
        this._submitButton = this._formElement.querySelector('.popup-delete__submit-button');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        this._handleFormSubmit();
        });
    }

    openPopup() {
        super.openPopup();
        this._submitButton.focus();
    }

    closePopupCallBack(callback) {
        this._handleFormSubmit = callback;        
    }
}