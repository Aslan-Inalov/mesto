const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//показать элемент ошибки
const showInputError = (formElement, inputElement, errorMessage, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

//скрывает элемент ошибки
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = '';
};

//проверить валидность
const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, configValidation);
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//удаление ошибок
function clearErrors(enterPopup) {
  const errors = enterPopup.querySelectorAll(".popup__input-error_active");
  errors.forEach((error) => {
    error.classList.remove(`popup__input-error_active`);
    error.textContent = "";
  });
  const borders = enterPopup.querySelectorAll(".popup__input_type_error");
  borders.forEach((border) => {
    border.classList.remove(`popup__input_type_error`);
  });

  if (enterPopup.classList.contains("popup_type_profile")) {
    toggleButtonState(false, enterPopup, configValidation);
  }
}

//добавление обработчиков
const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(configValidation.inputSelector));
  const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configValidation);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, configValidation);
  });
};


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});