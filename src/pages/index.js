import './index.css';

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
  FORM_SETTINGS,
  cardsSection
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
  return profilePopup.setInputValues(userInfo.getUserInfo());
 
});
popupOpenButtonEl.addEventListener('click', function(){
  cardPopup.openPopup();
});

const cardsContainer = document.querySelector('#cards');

function handleCardClick(name, link) {
  popupWithImage.openPopup(name,link);
}

const sectionCard = new Section({items: initialCards, render: (item) => {
  const template = new Card(item, '.spot', handleCardClick);
  const card = template.cloneElement();
  sectionCard.addItem(card)
}},
cardsContainer);
sectionCard.renderItems();

const profileFormValidator = new FormValidator(FORM_SETTINGS, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(FORM_SETTINGS, cardForm);
cardFormValidator.enableValidation();

const userInfo = new UserInfo({
        nameProfile: profileName,
        infoProfile: profileInfo
})

function renderCard(item) {
  const template = new Card(item,'.spot', handleCardClick);
  const card = template.cloneElement();
  return card;
};

const popupWithImage = new PopupWithImage('.popup-image', imgImage, nameImage);
popupWithImage.setEventListeners();

const cardPopup = new PopupWithForm({
  popupSelector: '.popup-plus',
  handleFormSubmit: (formValues) => {
    const spot = {
          name: formValues['place-input'],
          link: formValues['url-input']
        };
    sectionCard.addItem(renderCard(spot));
    cardPopup.closePopup();
    cardForm.reset();   
  }  
})
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      info: formValues["info"]
    }
    userInfo.setUserInfo(data);
    profilePopup.closePopup();
  }
})
profilePopup.setEventListeners();