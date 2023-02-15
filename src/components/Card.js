export default class Card {
    constructor({spot, handleCardClick, handleLikeClick, handleDeleteClick}, templateSelector, userId) {
        this._name = spot.name;
        this._link = spot.link;
        this._likes = spot.likes;
        this._ownerUserCardId = spot.owner._id;
        this._cardId = spot.cardId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;                
        this._userId = userId;
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
        this._likeNumber = this._cardTemplate.querySelector('.element__number');
        this._textEl.textContent  = this._name;
        this._imgElement.src = this._link;
        this._imgElement.alt = this._name;
        this._likeNumber.textContent = this._likes.length;
        this.setLikesView(this._likes);
        this._setEventListeners();
        return this._cardTemplate;
    }

    isLiked() {
      return this._likes.some(data => data._id === this._userId);
    }

    _setEventListeners() {
         this._likeButton.addEventListener('click', () => {
            this._addLike(this._cardId);
          });
          this._deleteButton.addEventListener('click', () => {
            if (this._ownerUserCardId === this._userId){
            this._delete(this._cardId);}
          });
          this._imgElement.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
          });
    }  

    _addLike = () => {
      this._likeButton.classList.toggle(this._cardId);
    }

    _delete = () => { 
      if (this._ownerUserCardId === this._userId) {
        this._handleDeleteClick(this._cardId);
        } else {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
    }

    remove = () => {
      this._cardTemplate.closest('.element').remove();
      this._cardTemplate = null;
    }

    setLikesView(likes) {
      this._likes = likes;
      this._likeNumber.textContent = likes.length;
      if (this.isLiked()) {
        this._likeButton.classList.add('element__button_active');
      } else {
        this._likeButton.classList.remove('element__button_active');
      }
    }

}

