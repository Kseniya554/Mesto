import './index.css';

import {
  initialCards,
  popupOpenButtonElement,
  profileName,
  profileInfo,
  avatarProfile,
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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

popupOpenButtonElement.addEventListener('click', function(){
  profilePopup.openPopup();
  return profilePopup.setInputValues(userInfo.getUserInfo()); 
});
popupOpenButtonEl.addEventListener('click', function(){
  cardPopup.openPopup();
});
// Подтверждение удаления карточки
const popupWithConfirmation = new PopupWithConfirmation('.popup-delete');
popupWithConfirmation.setEventListeners();

const cardsContainer = document.querySelector('#cards');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '2e68d41e-015c-4b85-8029-ac9ad107e6a1',
    'Content-Type': 'application/json'
  }
});

api.getAllNeededData()
  .then((result) => {
    const [dataForUserInfo, dataForInitialCards] = result;
    // console.log(result);

    userInfo.setUserInfo(dataForUserInfo);
    userInfo.setUserAvatar(dataForUserInfo.avatar);

    const initialCards = dataForInitialCards;
    sectionCard.renderItems(initialCards);
  })
  .catch(err => alert(err))

const sectionCard = new Section(
  {
    renderer: (spot) => {
      sectionCard.appendItem(renderCard(spot));
    }
  },
  cardsContainer
);



function handleCardClick(name, link) {
  popupWithImage.openPopup(name,link);
}

// const sectionCard = new Section({items: initialCards, render: (item) => {
//   const template = new Card(item, '.spot', handleCardClick);
//   const card = template.cloneElement();
//   sectionCard.addItem(card)
// }},
// cardsContainer);
// sectionCard.renderItems();

const profileFormValidator = new FormValidator(FORM_SETTINGS, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(FORM_SETTINGS, cardForm);
cardFormValidator.enableValidation();

const userInfo = new UserInfo({
        nameProfile: profileName,
        infoProfile: profileInfo,
        avatar: avatarProfile 
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
    // sectionCard.addItem(renderCard(spot));
 
    cardPopup.setSubmitTextButton("Сохранение...");
    api.postNewCard(spot)
      .then((response) => {
        prependItem(response);
        cardPopup.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        cardPopup.setSubmitTextButton("Создать");
      });
      cardForm.reset();
  }

})
cardPopup.setEventListeners();

const profilePopup = new PopupWithForm({
  popupSelector: '.popup',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues['name'],
      info: formValues['info']
    }

    profilePopup.setSubmitTextButton("Сохранение...");
    api.patchUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        profilePopup.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithProfile.setSubmitTextButton("Сохранить");
      });
    userInfo.setUserInfo(data);
    profilePopup.closePopup();
  }
})
profilePopup.setEventListeners();

// Аватарка
const popupAvatar = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleFormSubmit: (formValues) => {
    const avatar = formValues['avatar-input'];

    popupAvatar.setSubmitTextButton("Сохранение...");
    api.changeAvatar(avatar)
      .then(() => {
        popupAvatar.closePopup();
        userInfo.setUserAvatar(avatar);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAvatar.setSubmitTextButton("Сохранить");
      });
  }
});
popupAvatar.setEventListeners();