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

const openPopup = function(event) {
    popupElement.classList.add('popup__is-opened');
    
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

const closePopup = function() {
    popupElement.classList.remove('popup__is-opened');
    nameInput.value = nameProfile.textContent;
    infoInput.value = infoProfile.textContent;
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupSubmitButton.addEventListener('click', addProfile);
