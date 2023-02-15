export default class Api {
    constructor(options) {
        // тело конструктора
        this._url = options.baseUrl;
        this._headers = options.headers;
      }

    //   get
    _getResponseData(response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    
      _getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
        headers: {
        authorization: '2e68d41e-015c-4b85-8029-ac9ad107e6a1'
    }
  })
 .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
// return fetch(`${this._url}cards`, {
//   method: 'GET',
//   headers: this._headers
// })
//   .then(this._getResponseData);
      }
   
      _getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          headers: this._headers
        })
          .then(this._getResponseData);
      }

      getNeededUserInfo() {
        return Promise.all([this._getUserInfo()]);
      }

      getNeededInitialCards() {
        return Promise.all([this._getInitialCards()]);
      }
    
      patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.about
          })
        })
        .then(this._getResponseData);
      }
    
      NewCard(data) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(this._getResponseData);
      }
    
      deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
    
      putLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
    
      deleteLike(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(this._getResponseData);
      }
    
      changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: avatar
          })
        })
        .then(this._getResponseData);
      }
}