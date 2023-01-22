import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
// узлы

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popupOpenElem = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const popupElems = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupPicture = document.querySelector('.popup_picture');
const popupCloseElems = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileInputName = document.querySelector('.popup__input_user_name');
const profileInputAbout = document.querySelector('.popup__input_user_about');
const formProfile = document.querySelector('.popup__form_profile');
const formCard = document.querySelector('.popup__form_card');
const formCardBtn = formCard.querySelector('.popup__button');
const cardContainer = document.querySelector('.element');
const cardInputName = document.querySelector('.popup__input_card_name');
const cardInputLink = document.querySelector('.popup__input_card_link');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__picture-text');
const cardTemplate = document.querySelector('#card-template');






//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

//РЕДАКТОР ПРОФИЛЯ

function changeValue() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

//сохранение
function handleFormProfileSubmit(event) {
  event.preventDefault();

  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupProfile);
}

//открыть
popupOpenElem.addEventListener('click', () => {
  openPopup(popupProfile);
  changeValue();
  profileFormValidator.resetValidation();
});

//сохранить
formProfile.addEventListener('submit', handleFormProfileSubmit);

//КАРТОЧКИ
//открыть
cardAddBtn.addEventListener('click', () => {
  formCard.reset();
  cardFormValidator.resetValidation();
  openPopup(popupCard);
});

///универсальное закрытие попап 
popupElems.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (
      event.target.classList.contains('popup__close-button')
      || event.target.classList.contains('popup_opened')
    ) {
      closePopup(popup);
    }
  });
});

//закрытие попапа нажатием Escape
const closePopupByEsc = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const handleCardPopup = (link, name) => {
  openPopup(popupPicture);
  popupImage.src = link;
  popupText.textContent = name;
  popupText.alt = name;
}

//обработчик событий
const handleSubmitAddCard = (event) => {
  event.preventDefault();
  renderCard({
    name: cardInputName.value,
    link: cardInputLink.value
  });
  formCard.reset();
  closePopup(popupCard);
}

formCard.addEventListener('submit', handleSubmitAddCard);


function createCard(dataCard) {
  const newCard = new Card(dataCard, '#card-template', handleCardPopup);
  const cardElement = newCard.getView();
  return cardElement
}

const renderCard = (dataCard) => {
  const newCard = createCard(dataCard);
  cardContainer.prepend(newCard);
};





//рендер карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})

const profileFormValidator = new FormValidator(formProfile, configValidation);
const cardFormValidator = new FormValidator(formCard, configValidation);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

