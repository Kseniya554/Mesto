import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.form__set');
    }

    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._popup.querySelectorAll('.form__input');
        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    } 

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        
        // добавим вызов функции _handleFormSubmit
        // передадим ей объект — результат работы _getInputValues
        this._handleFormSubmit(this._getInputValues());

        this._formElement.reset();
        });
    } 

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    closePopup() {
        super.closePopup();
        this._formElement.reset();
    }
}