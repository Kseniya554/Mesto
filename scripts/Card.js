export default class Card {
    constructor(spot, templateSelector, imgEl, openPopup,openImage ) {
        this._name = spot._name;
        this._link = spot._link;
        this._templateSelector = templateSelector;
        this._imgEl = imgEl;
        this.openPopup = openPopup;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.cloneNode(true).children[0];
        return cardTemplate;
    }

    cloneElement() {
        this._cardTemplate = this._getTemplate();
        this._textEl = this._cardTemplate.querySelector('.element__title');
        this._imgEl = this._cardTemplate.querySelector('.element__image');
        this._likeButton = this._cardTemplate.querySelector('.element__button');
        this._deleteButton = this._cardTemplate.querySelector('.element__delete');
        this._textEl.textContent  = this._name;
        this._imgEl.src = this._link;
        this._imgEl.alt = this._name;
        this._setEventListeners();
        return this._cardTemplate;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__button_active')
          });
          this._deleteButton.addEventListener('click', function (evt) {
            evt.target.closest('.element').remove()
          });
          this._imgEl.addEventListener('click', function(evt) {
            openPopup(popupImage);
          });
    }
}
