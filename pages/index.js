import Card from "../components/card.js";
import FormValidator from "../components/FormValidator.js";

import { initialCards } from "../utils/initialCards.js"
import { configValidation } from "../utils/config.js"


import {
  popupOpenElem, cardAddBtn, popupElems,
  popupProfile, popupCard, popupPicture,
  popupCloseElems, profileName, profileAbout,
  profileInputName, profileInputAbout, formProfile,
  formCard, formCardBtn, cardContainer,
  cardInputName, cardInputLink, popupImage,
  popupText, cardTemplate
} from "../utils/constants.js"






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

