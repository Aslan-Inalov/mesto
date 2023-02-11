import { initialCards } from "../utils/initialCards.js"
import { configValidation } from "../utils/config.js"

import {
  popupOpenElem, cardAddBtn, formProfile,
  formCard,

} from "../utils/constants.js"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '69687510-6f1e-41ab-ba6a-15288c72162a',
    'Content-Type': 'application/json'
  }
});

const profileFormValidator = new FormValidator(formProfile, configValidation);
const cardFormValidator = new FormValidator(formCard, configValidation);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about');
const popupWithImage = new PopupWithImage({ popupSelector: '.popup_picture' });

function createCard(result) {
  const newCard = new Card(result, '#card-template', handleCardClick);
  return newCard.getView();
}

api.getInitialCards().then(result => {
  renderCard.renderItems(result);
})
  .catch(err => {
    console.log(err);
  });

const renderCard = new Section({
  renderer: (dataCard) => {
    renderCard.addItem(createCard(dataCard))
  }
},
  '.element');


const profileFormPopup = new PopupWithForm({
  popupSelector: '.popup_profile',
  submitCallback: (formValues) => {
    userInfo.setUserInfo(formValues);
    profileFormPopup.close();
  }
})

const cardFormPopup = new PopupWithForm({
  popupSelector: '.popup_card',
  submitCallback: (formValues) => {
    api.addNewCard(formValues.nameCard, formValues.linkCard).then(result => {
    renderCard.addItem(createCard(result));
    cardFormPopup.close();
    })
  }
});



const handleCardClick = (name, link) => {
  popupWithImage.open(link, name);
}



//открыть редактор профиля
popupOpenElem.addEventListener('click', () => {
  profileFormPopup.open();
  profileFormPopup.setInputValues(userInfo.getUserInfo());
  profileFormValidator.resetValidation();
});

//открыть редактор карточки
cardAddBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardFormPopup.open();
});

profileFormPopup.setEventListeners();
cardFormPopup.setEventListeners();
popupWithImage.setEventListeners();




