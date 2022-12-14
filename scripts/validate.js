const FORM_SETTINGS = {
  formElement: '.form__set',
  input: '.form__input',
  submitButton: '.form__submit',
  inactiveButton: 'form__submit_inactive',
  inputError: 'form__input-error',
  ActiveError: 'form__input-error_active'
};

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.ActiveError);
};

const hideInputError = (formElement, inputElement, settings) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputError);
  errorElement.classList.remove(settings.ActiveError);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.input));
  const buttonElement = formElement.querySelector(settings.submitButton);

  
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement, settings);

  formElement.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
     toggleButtonState(inputList, buttonElement, settings);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    // formElement.addEventListener('submit', function (evt) {
    //   evt.preventDefault();
    // }); setEventListeners(formElement);
    setEventListeners(formElement, settings);
  }); 
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement, settings) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
     buttonElement.classList.add(settings.inactiveButton);
     buttonElement.disabled = 'disabled'
  } else {
    // иначе сделай кнопку активной
     buttonElement.classList.remove(settings.inactiveButton);
     buttonElement.disabled = ''
  }
};


enableValidation(FORM_SETTINGS);