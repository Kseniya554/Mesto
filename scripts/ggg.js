const checkInputValidity = () => {
    // напишите код здесь
    if (!nameInput.validity.valid) {
    // вызовите showError  
      showErrorPopup(nameInput, nameInput.validationMessage);
  } else {
    // вызовите hideError
    hideErrorPopup(nameInput);
  }
  };
  
  popupElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  
  nameInput.addEventListener('input', function () {
    checkInputValidity();
  });
  