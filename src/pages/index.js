import {
  initialCards,
  // popups,
  // profilePopup,
  popupCloseButtonElements,
  popupOpenButtonElement,
  // popupSubmitButton,
  nameInputProfile,
  infoInputProfile,
  // profileElement,
  nameProfile,
  infoProfile,
  // unlock,
  // cardPopup,
  popupOpenButtonEl,
  popupSubmitButtonEl,
  nameInputCard,
  infoInputCard,
  cardsSection,
  profileForm,
  cardForm,
  // popupImage,
  // imageElement,
  nameImage,
  imgImage,
  // formInput,
  // errorMessage,
  FORM_SETTINGS,
  // profilePopup
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

popupOpenButtonElement.addEventListener('click', function(){
  profilePopup.openPopup();
  profilePopup.setInputValues(userInfo.getUserInfo());
  // formValidators['popup__container'].resetValidation();
});
popupOpenButtonEl.addEventListener('click', function(){
  cardPopup.openPopup();
  // formValidators['popup-plus__container'].resetValidation();
});

// popupCloseButtonElements.forEach((button) => {
//   const popup = button.closest('.popup-modal');
//   button.addEventListener('click', () => closePopup(popup)); 
// })


// function closePopupByClickOnOverlay(evt) {
//       if (evt.target == evt.currentTarget) {
//         const openPopup = document.querySelector('.popup__is-opened');
//       closePopup(openPopup);
//     }
//   };


//  function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openPopup = document.querySelector('.popup__is-opened')
//     closePopup(openPopup)
//   }
// }


// function openImage(name, link) {
//   imgImage.textContent = name;
//   imgImage.src = link;
//   imgImage.alt = name;
//   openPopup(popupImage);
// }

export const cardsContainer = document.querySelector('#cards');

function createCard(spot) {
  const card = new Card(spot, '.spot', handleCardClick);
  const cardTemplate = card.cloneElement(spot);
  return cardTemplate;
}

function handleCardClick(name, link) {
  popupWithImage.openPopup(name,link);
}

function renderCard(spot) {
    const cardTemplate = createCard(spot);
    cardsContainer.prepend(cardTemplate);
}

initialCards.forEach(renderCard);

const section = new Section({items: initialCards, render: (item) => {
  section.addItem(createCard(item))
}},
cardsContainer);
section.renderItems();

// const formValidators = {};

const profileFormValidator = new FormValidator(FORM_SETTINGS, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(FORM_SETTINGS, cardForm);
cardFormValidator.enableValidation();

const userInfo = new UserInfo({
        nameProfile: nameProfile,
        infoProfile: infoProfile
})



const popupWithImage = new PopupWithImage('.popup-image', imgImage, nameImage);
popupWithImage.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: '.popup-plus',
  handleFormSubmit: (formValues) => {
    const spot = {
          name: formValues['place-input'],
          link: formValues['url-input']
        };
    prependCard(spot);
    cardPopup.closePopup;
    cardForm.reset(); 
  }  
})
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: (formValues) => {
    nameProfile.textContent = formValues['name-input'];
    infoProfile.textContent = formValues['info-input'];
    userInfo.setUserInfo(data);
    profilePopup.closePopup();
  }
})
profilePopup.setEventListeners();