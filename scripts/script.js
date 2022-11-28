const popup = document.querySelectorAll('.popup-modal');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelectorAll('.close-button');
const popupOpenButtonElement = document.querySelector('.profile__open-popup');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
const form = document.querySelector('.popup__container'); //form
const nameInput = popupElement.querySelector('.popup__name');
const infoInput = popupElement.querySelector('.popup__info');
const profileElement = document.querySelector('.profile');
const nameProfile = profileElement.querySelector('.profile__title');
const infoProfile = profileElement.querySelector('.profile__subtitle');
const unlock = true;

const popupEl = document.querySelector('.popup-plus');
const popupOpenButtonEl = document.querySelector('.profile__button');
const popupSubmitButtonEl = document.querySelector('.popup-plus__submit-button');
const formEl = document.querySelector('.popup-plus__container');
const nameInputEl = document.querySelector('.popup-plus__name');
const infoInputEl = document.querySelector('.popup-plus__info');

const popupImage = document.querySelector('.popup-image');
const imageElement = document.querySelector('.popup-image__container');
const nameImage = document.querySelector('.popup-image__text');
const imgImage = document.querySelector('.popup-image__big');

function open(popup) {
  popup.classList.add('popup__is-opened');
}

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
      spot.place = nameInputEl.value;
  };
  if (infoInput.value !== '') {
      spot.link = infoInputEl.value;
  };
  renderImg(spot);
  close(popupEl);
  formEl.reset();
}

function close(popup) {
  popup.classList.remove('popup__is-opened');
}

popupSubmitButton.addEventListener('click', addProfile);
popupSubmitButtonEl.addEventListener('click', addSpot);

popupOpenButtonElement.addEventListener('click', function(){
  open(popupElement);
})
popupOpenButtonEl.addEventListener('click', function(){
  open(popupEl);
})
popupCloseButtonElement.forEach((button) => {
  const popup = button.closest('.popup-modal');
  button.addEventListener('click', () => close(popup));
});

const closePopupByClickOnOverlay = function(event) {
  if(event.target !== event.currentTarget) {
    return;
  }
  close(popup);
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

const formInput = document.querySelector('.popup__input');
const formError = document.querySelector(`.${formInput.id}-error`); //formError

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formElement) => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    }); const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
    fieldsetList.forEach((fieldSet) => {
  setEventListeners(fieldSet);
});
  }); 
};



// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('button_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('button_inactive');
  }
};

enableValidation();