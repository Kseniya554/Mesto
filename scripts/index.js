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
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', closePopupByClickOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup__is-opened');
  document.removeEventListener('keydown', closeByEscape);
  popup.removeEventListener('mousedown', closePopupByClickOnOverlay);
}


function submitProfileForm(event) {
    event.preventDefault();
    if (nameInputProfile.value !== '') {
        nameProfile.textContent = nameInputProfile.value;
    }
    if (infoInputProfile.value !== '') {
        infoProfile.textContent = infoInputProfile.value;
    }
    closePopup(profilePopup);
}

function submitCardForm(event) {
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
  renderImg(spot);
  closePopup(cardPopup);
  cardForm.reset();
}

profilePopup.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

popupOpenButtonElement.addEventListener('click', function(){
  openPopup(profilePopup);
})
popupOpenButtonEl.addEventListener('click', function(){
  openPopup(cardPopup);
})

popupCloseButtonElements.forEach((button) => {
  const popup = button.closest('.popup-modal');
  button.addEventListener('click', () => closePopup(popup)); 
})


function closePopupByClickOnOverlay(evt) {
      if (evt.target == evt.currentTarget) {
        const openPopup = document.querySelector('.popup__is-opened');
      closePopup(openPopup);
    }
  };


 function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup__is-opened')
    closePopup(openPopup)
  }
}


function openImage(name, link) {
  imgImage.textContent = name;
  imgImage.src = link;
  imgImage.alt = name;
  openPopup(popupImage);
}

export const cardsContainer = document.querySelector('#cards');

function createCard(spot) {
  const card = new Card(spot, '.spot', openImage);
  const el = card.cloneElement(spot);
  return el;
}

function renderCard(spot) {
    const cardTemplate = createCard(spot);
    cardsContainer.prepend(cardTemplate);
}


initialCards.forEach(renderCard);

const profileFormValidator = new FormValidator(FORM_SETTINGS, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(FORM_SETTINGS, cardForm);
cardFormValidator.enableValidation();
