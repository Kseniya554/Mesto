const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
const formElement = document.querySelector('.popup__container');
const nameInput = popupElement.querySelector('.popup__name');
const infoInput = popupElement.querySelector('.popup__info');
const profileElement = document.querySelector('.profile');
const nameProfile = profileElement.querySelector('.profile__title');
const infoProfile = profileElement.querySelector('.profile__subtitle');
const unlock = true;

const popupEl = document.querySelector('.popup-plus');
const popupCloseButtonEl = popupEl.querySelector('.popup-plus__close-button');
const popupOpenButtonEl = document.querySelector('.profile__button');
const popupSubmitButtonEl = popupEl.querySelector('.popup-plus__submit-button');
const formElementEl = document.querySelector('.popup-plus__container');
const nameInputEl = popupEl.querySelector('.popup-plus__name');
const infoInputEl = popupEl.querySelector('.popup-plus__info');

const popupImage = document.querySelector('.popup-image');
const popupCloseButtonImage = popupImage.querySelector('.popup-image__close-button');
const imageElement = document.querySelector('.popup-image__container');
const nameImage = document.querySelector('.popup-image__text');
const imgImage = document.querySelector('.popup-image__big');


const openPopup = function(event) {
  popupElement.classList.add('popup__is-opened');      
}

const openPopupEl = function(event) {
  popupEl.classList.add('popup__is-opened');      
}

const openPopupImage = function(event) {
  popupImage.classList.add('popup__is-opened');        
}

function addProfile(event) {
    event.preventDefault();
    if (nameInput.value !== '') {
        nameProfile.textContent = nameInput.value;
    }
    if (infoInput.value !== '') {
        infoProfile.textContent = infoInput.value;
    }
}

function addSpot(event) {
  event.preventDefault();
  const spot = {
      'name': '',
      'link': ''
  };
  if (nameInputEl.value !== '') {
      spot.name = nameInputEl.value;
  };
  if (infoInput.value !== '') {
      spot.link = infoInputEl.value;
  };
  renderImg(spot);
  closePopupEl();
}

const closePopup = function() {
    popupElement.classList.remove('popup__is-opened');
    nameInput.value = nameProfile.textContent;
    infoInput.value = infoProfile.textContent;
}


const closePopupEl = function() {
    popupEl.classList.remove('popup__is-opened');
    nameInputEl.value = '';
    infoInputEl.value = '';
}

const closePopupImage = function() {
  popupImage.classList.remove('popup__is-opened');  
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupSubmitButton.addEventListener('click', addProfile);
popupOpenButtonEl.addEventListener('click', openPopupEl);
popupCloseButtonEl.addEventListener('click', closePopupEl);
popupSubmitButtonEl.addEventListener('click', addSpot);
popupCloseButtonImage.addEventListener('click', closePopupImage);

  function cloneElement(spot) {
    const cardTemplate = document.querySelector('.spot');
    const el = cardTemplate.content.cloneNode(true);
    const textEl = el.querySelector('.element__title');
    const imgEl = el.querySelector('.element__image');
    el.querySelector('.element__button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button_active')
    });
    el.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove()
    });
    textEl.textContent = spot.name;
    imgEl.src = spot.link;
    imgEl.alt = spot.name;

    imgEl.addEventListener('click', function(event) {
      nameImage.textContent = textEl.textContent;
      imgImage.src = imgEl.src;  
      imgImage.alt = textEl.textContent;
      openPopupImage(popupImage);
    });

    return el;
}

function renderImg(spot) {
    const cards = document.querySelector('#cards')
    const el = cloneElement(spot);
    cards.prepend(el);
}

initialCards.forEach(renderImg);