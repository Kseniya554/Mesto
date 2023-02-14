import './index.css';

import {
  initialCards,
  popupOpenButtonElement,
  profileName,
  profileInfo,
  avatarProfile,
  avatarHover,
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

// Подтверждение удаления карточки
const popupWithConfirmation = new PopupWithConfirmation('.popup-delete');
popupWithConfirmation.setEventListeners();

const cardsContainer = document.querySelector('#cards');

const popupWithImage = new PopupWithImage('.popup-image', imgImage, nameImage);
popupWithImage.setEventListeners();

const userabout = new UserInfo({
  nameProfile: profileName,
  infoProfile: profileInfo,
  avatar: avatarProfile 
})


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '2e68d41e-015c-4b85-8029-ac9ad107e6a1',
    'Content-Type': 'application/json'
  }
});

api.getNeededUserInfo()
.then((result) => {
  const [dataForUserInfo] = result;
  userabout.setUserInfo(dataForUserInfo);
  userabout.setUserAvatar(dataForUserInfo.avatar);
})
.catch(err => console.log(err))


api.getNeededInitialCards()
.then((result) => {
  const [dataForInitialCards] = result;
  const initialCards = dataForInitialCards;
  sectionCard.renderItems(initialCards);
})
.catch(err => console.log(err))



const sectionCard = new Section(
  {
    renderer: (spot) => {
      sectionCard.appendItem(renderCard(spot));
    }
  },
  cardsContainer
);


const cardPopup = new PopupWithForm({
  popupSelector: '.popup-plus',
  handleFormSubmit: (formValues) => {
    const spot = {
          name: formValues['place-input'],
          link: formValues['url-input']
        };
    sectionCard.addItem(renderCard(spot));
 
    cardPopup.setSubmitTextButton("Сохранение...");
    api.NewCard(spot)
      .then((response) => {
        addItem(response);
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
      about: formValues['info']
    }

    profilePopup.setSubmitTextButton("Сохранение...");
    api.patchUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        profilePopup.closePopup();
      })    
      .catch(err => console.log(err))
      .finally(() => {
        profilePopup.setSubmitTextButton("Сохранить");
      });
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


function renderCard(spot) {
  const template = new Card({
    spot: {
      name: spot.name,
      link: spot.link,
      cardId: spot._id,
      likes: spot.likes,
      owner: spot.owner
    },

    handleCardClick: (name, link) => {
      popupWithImage.openPopup(name, link);
    },

    handleDeleteClick: (cardId) => {
      popupWithConfirmation.openPopup();
      popupWithConfirmation.setCallback(() => {
        api.deleteCard(cardId)
          .then(() => {
            popupWithConfirmation.closePopup();
            template.remove();
          })
          .catch(err => console.log(err))
      });
    },

    handleLikeClick: (cardId) => {
      if(template.isLiked()) {
        api.deleteLike(cardId)
          .then((response) => {
            template.setLikesView(response.likes);
          })
          .catch(err => console.log(err))
      } else {
        api.putLike(cardId)
          .then((response) => {
            template.setLikesView(response.likes);
          })
          .catch(err => console.log(err))
      }
    }
  },
  '.spot',
  userInfo.getUserId());

  const templateElement = template.generateCard();
  return templateElement;
}

avatarHover.addEventListener('click', function(){
  popupAvatar.openPopup();  
})

popupOpenButtonElement.addEventListener('click', function(){
  profilePopup.openPopup();
  return profilePopup.setInputValues(userInfo.getUserInfo()); 
});

popupOpenButtonEl.addEventListener('click', function(){
  cardPopup.openPopup();
});

const profileFormValidator = new FormValidator(FORM_SETTINGS, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(FORM_SETTINGS, cardForm);
cardFormValidator.enableValidation();