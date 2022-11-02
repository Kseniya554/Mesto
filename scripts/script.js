let popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
let formElement = document.querySelector('.popup__container');
let nameInput = popupElement.querySelector('.popup__name');
let infoInput = popupElement.querySelector('.popup__info');
const profileElement = document.querySelector('.profile');
let nameProfile = profileElement.querySelector('.profile__title');
let infoProfile = profileElement.querySelector('.profile__subtitle');
let unlock = true;

let popupEl = document.querySelector('.popup-plus');
const popupCloseButtonEl = popupEl.querySelector('.popup-plus__close-button');
const popupOpenButtonEl = document.querySelector('.profile__button');
const popupSubmitButtonEl = popupEl.querySelector('.popup-plus__submit-button');
let formElementEl = document.querySelector('.popup-plus__container');
let nameInputEL = popupEl.querySelector('.popup-plus__name');
let infoInputEl = popupEl.querySelector('.popup-plus__info');
let nameProfileEl = document.querySelector('.element__title');
let infoProfileEl = document.querySelector('.element__image');
const card = document.querySelector('.element');

const openPopup = function(event) {
    popupElement.classList.add('popup__is-opened');      
}

const openPopupEl = function(event) {
    popupEl.classList.add('popup__is-opened');      
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

function addProfileEl(event) {
    event.preventDefault();
    if (nameInputEl.value !== '') {
        nameProfileEl.textContent = nameInputEl.value;
    }
    if (infoInput.value !== '') {
        infoProfileEl.urlContent = infoInputEl.value;
    }
}

const closePopup = function() {
    popupElement.classList.remove('popup__is-opened');
    nameInput.value = nameProfile.textContent;
    infoInput.value = infoProfile.textContent;
}


const closePopupEl = function() {
    popupEl.classList.remove('popup__is-opened');
    nameInputEL.value = nameProfileEl.textContent;
    infoInputEl.value = infoProfileEl.textContent;
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupSubmitButton.addEventListener('click', addProfile);
popupOpenButtonEl.addEventListener('click', openPopupEl);
popupCloseButtonEl.addEventListener('click', closePopupEl);
popupSubmitButtonEl.addEventListener('click', addProfileEl);


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



const cardTemplate = document.querySelector('.elments');
const elementHtml = (text) => {
  const el = cardTemplate.content.cloneNode(true).children[0];
  const textEl = el.querySelector('.element__title');
  textEl.textContent = text;
  return el;
}


  const renderImg = (text) => {
    const el = elementHtml(text);
    container.append(el)
      
  }

  initialCards.forEach((renderImg) => {
    
  })

  popupOpenButtonEl.addEventListener('submit', (event) => {
      event.preventDefault();

      const text = document.querySelector('.element__title').value;

      renderImg(text);
     
  })
 