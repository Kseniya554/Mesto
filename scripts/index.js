import {initialCards} from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

export const popups = document.querySelectorAll('.popup-modal');
export const profilePopup = document.querySelector('.popup');
export const popupCloseButtonElements = document.querySelectorAll('.close-button');
export const popupOpenButtonElement = document.querySelector('.profile__open-popup');
export const popupSubmitButton = profilePopup.querySelector('.popup__submit-button');
export const nameInputProfile = profilePopup.querySelector('.popup__name');
export const infoInputProfile = profilePopup.querySelector('.popup__info');
export const profileElement = document.querySelector('.profile');
export const nameProfile = profileElement.querySelector('.profile__title');
export const infoProfile = profileElement.querySelector('.profile__subtitle');
export const unlock = true;

export const cardPopup = document.querySelector('.popup-plus');
export const popupOpenButtonEl = document.querySelector('.profile__button');
export const popupSubmitButtonEl = document.querySelector('.popup-plus__submit-button');
//const cardForm = document.querySelector('.popup-plus__container');
export const nameInputCard = document.querySelector('.popup-plus__name');
export const infoInputCard = document.querySelector('.popup-plus__info');

export const profileForm = document.forms["profile-form"];
export const cardForm = document.forms["card-form"];

export const popupImage = document.querySelector('.popup-image');
export const imageElement = document.querySelector('.popup-image__container');
export const nameImage = document.querySelector('.popup-image__text')
export const imgImage = document.querySelector('.popup-image__big');

export const formInput = document.querySelector('.form__input');
export const errorMessage = {'text':'Вы пропустили это поле'};
export const FORM_SETTINGS = {
  formElement: '.form__set',
  input: '.form__input',
  submitButton: '.form__submit',
  inactiveButton: 'form__submit_inactive',
  inputError: 'form__input-error',
  ActiveError: 'form__input-error_active'
};

function openPopup(popup) {
  popup.classList.add('popup__is-opened');
  document.addEventListener('keydown', closeByEscape )
}

function closePopup(popup) {
  popup.classList.remove('popup__is-opened');
  document.removeEventListener('keydown', closeByEscape )
}

// popup.addEventListener('click', function(event) {
//   if (event.target == event.currentTarget) {
//     closePopup(popup);
//     }
// });

function addProfile(event) {
    event.preventDefault();
    if (nameInputProfile.value !== '') {
        nameProfile.textContent = nameInputProfile.value;
    }
    if (infoInputProfile.value !== '') {
        infoProfile.textContent = infoInputProfile.value;
    }
    closePopup(profilePopup);
}

function addSpot(event) {
  event.preventDefault();
     const spot = {
      'place': '',
      'link': ''
    };
  
  if (nameInputCard.value !== '') {
      spot.name = nameInputCard.value;
  };
  if (infoInputCard.value !== '') {
      spot.link = infoInputCard.value;
  };
//  if ((nameInputEl.length > 1) && (nameInputEl.length = > 40) )
  renderImg(spot);
  closePopup(cardPopup);
  cardForm.reset();
}

profilePopup.addEventListener('submit', addProfile);
cardForm.addEventListener('submit', addSpot);

popupOpenButtonElement.addEventListener('click', function(){
  openPopup(profilePopup);
})
popupOpenButtonEl.addEventListener('click', function(){
  openPopup(cardPopup);
})
popupCloseButtonElements.forEach((button) => {
  const popup = button.closest('.popup-modal');
  button.addEventListener('click', () => closePopup(popup));
  const closePopupByClickOnOverlay = (evt) => {
    if (evt.target == evt.currentTarget) {
      closePopup(evt.currentTarget);
    }
  };
  popup.addEventListener('click', closePopupByClickOnOverlay);
});


 function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__is-opened')
    closePopup(openedPopup)
  }
}


  function cloneElement(spot) {
    const cardTemplate = document.querySelector('.spot').content.querySelector('.element');;
    const el = cardTemplate.cloneNode(true);
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
      openPopup(popupImage);
    });

    return el;
}

// function openImage(name, link) {
//   imgImage.textContent = name;
//   imgImage.src = link;
//   imgImage.alt = name;
//   openPopup(popupImage);
// }

export const Cards = document.querySelector('#cards');

// function renderImg(spot) {
//   const el = new Card(spot, '.spot', openPopup, openImage);
//   const cardTemplate = el.cloneElement(spot);
//   return el;
//   cards.prepend(cardTemplate);
// }

function renderImg(spot) {
    const cardTemplate = cloneElement(spot);
    cards.prepend(cardTemplate);
}


initialCards.forEach(renderImg);

const profileFormValidator = new FormValidator(FORM_SETTINGS, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(FORM_SETTINGS, cardForm);
cardFormValidator.enableValidation();
