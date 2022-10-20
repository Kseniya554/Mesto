let popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.menu__open-popup');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
let formElement = document.querySelector('.popup__conteiner');
let nameInput = popupElement.querySelector('.popup__name');
let infoInput = popupElement.querySelector('.popup__info');
const profileElement = document.querySelector('.profile');
let nameProfile = profileElement.querySelector('.profile__title');
let infoProfile = profileElement.querySelector('.profile__subtitle');
console.log(popupOpenButtonElement);

const openPopup = function(event) {
    console.log(event.target, event.currentTarget);
    popupElement.classList.add('popup_is-opened');
}

const closePopupByClickOnOverlay = function(event) {
    console.log(event.target, event.currentTarget);
    if(event.target !== event.currentTarget) {
        return;
    }
    closePopup();
}

function addName(evt) {
    evt.preventDefault();
    if (nameInput.value !== '') {
        nameProfile.textContent = nameInput.value;
    } else {
        closePopup();
    }
}


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
profileElement.addEventListener('click', function() {
    console.log('Profile clicked');
})

