import {
  initialCards,
  popupOpenButtonElement,
  profileName,
  profileInfo,
  popupOpenButtonEl,
  profileForm,
  cardForm,
  nameImage,
  imgImage,
  FORM_SETTINGS
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
});
popupOpenButtonEl.addEventListener('click', function(){
  cardPopup.openPopup();
});

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
        nameProfile: profileName,
        infoProfile: profileInfo
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
    renderCard(spot);
    cardPopup.closePopup();
    cardForm.reset(); 
  }  
})
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues['name-input'],
      info: formValues['info-input']
    }
    userInfo.setUserInfo(data);
    profilePopup.closePopup();
  }
})
profilePopup.setEventListeners();