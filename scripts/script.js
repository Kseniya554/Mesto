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
console.log(popupOpenButtonElement);

const openPopup = function(event) {
    // console.log(event.target, event.currentTarget);
    popupElement.classList.add('popup__is-opened');
}

const closePopupByClickOnOverlay = function(event) {
    // console.log(event.target, event.currentTarget);
    if(event.target !== event.currentTarget) {
        return;
    }
    closePopup();
}

function addName(event) {
    event.preventDefault();
    if (nameInput.value !== '') {
        nameProfile.textContent = nameInput.value;
    } 
    closePopup();
}

function addInfo(event) {
    event.preventDefault();
    if (infoInput.value !== '') {
        infoProfile.textContent = infoInput.value;
    } 
    closePopup();
}

const closePopup = function() {
    popupElement.classList.remove('popup__is-opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
profileElement.addEventListener('click', function() {
    console.log('Profile clicked');
})
popupSubmitButton.addEventListener('click', addName);
formElement.addEventListener('submit', addName);
popupSubmitButton.addEventListener('click', addInfo);
formElement.addEventListener('submit', addInfo);
