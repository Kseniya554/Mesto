import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImage, nameImage) {
        super(popupSelector);
        this._popupImage = popupImage;
        this._nameImage = nameImage;
    }

    openPopup(name, link) {
        super.openPopup();
        this._nameImage.textContent = name;
        this._popupImage.src = link;
        this._nameImage.alt = name;
    }
}