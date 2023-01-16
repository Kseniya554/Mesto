// import { popupImage } from ".";

export default class Card {
    constructor(spot, templateSelector, imgEl, openPopup) {
        this._name = spot.name;
        this._link = spot.link;
        this._templateSelector = templateSelector;
        this._imgEl = openPopup;
        this.openPopup = imgEl;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.cloneNode(true).children[0];
        return cardTemplate;
    }

    cloneElement() {
        this._cardTemplate = this._getTemplate();
        this._textEl = this._cardTemplate.querySelector('.element__title');
        this._imgElement = this._cardTemplate.querySelector('.element__image');
        this._likeButton = this._cardTemplate.querySelector('.element__button');
        this._deleteButton = this._cardTemplate.querySelector('.element__delete');
        this._textEl.textContent  = this._name;
        this._imgElement.src = this._link;
        this._imgElement.alt = this._name;
        this._setEventListeners();
        return this._cardTemplate;
    }

    _setEventListeners() {
      // this._likeButton.addEventListener('click', function (evt) {
      //   evt.target.classList.toggle('element__button_active')
      // });
      // this._deleteButton.addEventListener('click', function (evt) {
      //   evt.target.closest('.element').remove()
      // });
      // this._imgEl.addEventListener('click', function(evt) {
      //   evt.target.opened('this._imgEl');
      // });
         this._likeButton.addEventListener('click', function (evt) {
            this._addLike();
          });
          this._deleteButton.addEventListener('click', function () {
            this._delete();           
          });
          this._imgElement.addEventListener('click', () => {
            this.openPopup(popupImage);
          });
    }

    _addLike = () => {
      evt.target.classList.toggle('.element__button_active');
    }

    _delete = () => {
      this._cardTemplate.remove();
      this._cardTemplate = null;
    }

}

