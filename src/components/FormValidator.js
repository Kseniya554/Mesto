export default class FormValidator {
    constructor(spot, formElement) {
      this._formSelector = spot.formElement;
      this._input = spot.input;
      this._submitButton = spot.submitButton;
      this._inactiveButton = spot.inactiveButton;
      this._inputError = spot.inputError;
      this._ActiveError = spot.ActiveError;
      this._formElement = formElement;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
      this._buttonElement = this._formElement.querySelector(this._submitButton);
    }
  
    _showInputError = ( inputElement, errorMessage) => {
      // Находим элемент ошибки внутри самой функции
      const errorElement = document.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._ActiveError);
    };
  
    _hideInputError = (inputElement) => {
      // Находим элемент ошибки
      const errorElement = document.querySelector(`#${inputElement.id}-error`);
      // inputElement.classList.remove(settings.inputError);
      errorElement.classList.remove(this._ActiveError);
      errorElement.textContent = '';
    };
    
    _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    _hasInvalidInput = () => {
      // проходим по этому массиву методом some
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };
    
    _toggleButtonState = () => {
      // Если есть хотя бы один невалидный инпут
      if (this._hasInvalidInput()) {
        // сделай кнопку неактивной
         this._buttonElement.classList.add(this._inactiveButton);
         this._buttonElement.disabled = 'disabled'
      } else {
        // иначе сделай кнопку активной
         this._buttonElement.classList.remove(this._inactiveButton);
         this._buttonElement.disabled = ''
      }
    };
  
    _setEventListeners = () => {
      // const inputList = Array.from(formElement.querySelectorAll(settings.input));
      // const buttonElement = formElement.querySelector(settings.submitButton);
    
      this._toggleButtonState();
       
      this._formElement.addEventListener('reset', () => {
        // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
        setTimeout(() => {
         this._toggleButtonState();
        }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
      });
    
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input',  () =>
         {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    };
       
    // Функция принимает массив полей ввода
    // и элемент кнопки, состояние которой нужно менять
      
    enableValidation = () => {
      // const formList = Array.from(document.querySelectorAll('.form'));
      this._formElement.addEventListener('submit', function (evt) {
        evt.preventDefault()
      }); 
      this._setEventListeners();
    };
  }