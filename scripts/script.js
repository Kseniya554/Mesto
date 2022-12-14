const popups = document.querySelectorAll('.popup-modal');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElements = document.querySelectorAll('.close-button');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
const formElement = document.querySelector('.form');
const nameInput = popupElement.querySelector('.popup__name');
const infoInput = popupElement.querySelector('.popup__info');
const profileElement = document.querySelector('.profile');
const nameProfile = profileElement.querySelector('.profile__title');
const infoProfile = profileElement.querySelector('.profile__subtitle');
const unlock = true;

const cardPopup = document.querySelector('.popup-plus');
const popupOpenButtonEl = document.querySelector('.profile__button');
const popupSubmitButtonEl = document.querySelector('.popup-plus__submit-button');
//const cardForm = document.querySelector('.popup-plus__container');
const nameInputEl = document.querySelector('.popup-plus__name');
const infoInputEl = document.querySelector('.popup-plus__info');

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];

const popupImage = document.querySelector('.popup-image');
const imageElement = document.querySelector('.popup-image__container');
const nameImage = document.querySelector('.popup-image__text');
const imgImage = document.querySelector('.popup-image__big');

const formInput = document.querySelector('.form__input');
const errorMessage = {'text':'Вы пропустили это поле'};
const formError = formElement.querySelector(`.${formInput.id}-error`);

function open(popup) {
  popup.classList.add('popup__is-opened');
  document.addEventListener('keydown', closeByEscape )
}

function close(popup) {
  popup.classList.remove('popup__is-opened');
  document.removeEventListener('keydown', closeByEscape )
}

document.addEventListener('click', function(event) {
  if (event.target == event.currentTarget) {
    close(document);
    }
});

function addProfile(event) {
    event.preventDefault();
    if (nameInput.value !== '') {
        nameProfile.textContent = nameInput.value;
    }
    if (infoInput.value !== '') {
        infoProfile.textContent = infoInput.value;
    }
    close(popupElement);
}

function addSpot(event) {
  event.preventDefault();
     const spot = {
      'place': '',
      'link': ''
    };
  
  if (nameInputEl.value !== '') {
      spot.name = nameInputEl.value;
  };
  if (infoInput.value !== '') {
      spot.link = infoInputEl.value;
  };
//  if ((nameInputEl.length > 1) && (nameInputEl.length = > 40) )
  renderImg(spot);
  close(cardPopup);
  cardForm.reset();
}

popupElement.addEventListener('submit', addProfile);
cardForm.addEventListener('submit', addSpot);

popupOpenButtonElement.addEventListener('click', function(){
  open(popupElement);
})
popupOpenButtonEl.addEventListener('click', function(){
  open(cardPopup);
})
popupCloseButtonElements.forEach((button) => {
  const popup = button.closest('.popup-modal');
  button.addEventListener('click', () => close(popup));
  const closePopupByClickOnOverlay = (evt) => {
    if (evt.target == evt.currentTarget) {
      close(evt.currentTarget);
    }
  };
  popup.addEventListener('click', closePopupByClickOnOverlay);
});


 function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__is-opened')
     close(openedPopup)
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
      open(popupImage);
    });

    return el;
}

const cards = document.querySelector('#cards');

function renderImg(spot) {
    const el = cloneElement(spot);
    cards.prepend(el);
}

initialCards.forEach(renderImg);