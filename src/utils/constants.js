export const initialCards = [
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

export const popups = document.querySelectorAll('.popup-modal');
export const profilePopup = document.querySelector('.popup');
export const popupCloseButtonElements = document.querySelectorAll('.close-button');
export const popupOpenButtonElement = document.querySelector('.profile__open-popup');
export const popupSubmitButton = profilePopup.querySelector('.popup__submit-button');
export const nameInputProfile = profilePopup.querySelector('.popup__name');
export const infoInputProfile = profilePopup.querySelector('.popup__info');
export const profileElement = document.querySelector('.profile');
export const profileName = profileElement.querySelector('.profile__title');
export const profileInfo = profileElement.querySelector('.profile__subtitle');
export const unlock = true;

// export const cardPopup = document.querySelector('.popup-plus');
export const popupOpenButtonEl = document.querySelector('.profile__button');
export const popupSubmitButtonEl = document.querySelector('.popup-plus__submit-button');
export const cardsSection = document.querySelector('.spot');
export const nameInputCard = document.querySelector('.popup-plus__name');
export const infoInputCard = document.querySelector('.popup-plus__info');

export const profileForm = document.forms["profile-form"];
export const cardForm = document.forms["card-form"];

// export const popupImage = document.querySelector('.popup-image');
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

