import { initialCards } from "../utils/initialCards.js"
import { configValidation } from "../utils/config.js"

import {
  popupOpenElem, cardAddBtn, popupProfile,
  popupCard, popupPicture, profileName,
  profileAbout, formProfile,
  formCard, cardContainer

} from "../utils/constants.js"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//import './index.css';

const profileFormValidator = new FormValidator(formProfile, configValidation);
const cardFormValidator = new FormValidator(formCard, configValidation);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();

const userInfo = new UserInfo(profileName, profileAbout);
const popupWithImage = new PopupWithImage({ popupSelector: popupPicture });

const renderCard = new Section(
  {
    items: initialCards,
    renderer: (dataCard) => {
      renderCard.addItem(createCard(dataCard));
    },
  },
  cardContainer
);

const profileFormPopup = new PopupWithForm({
  popupSelector: popupProfile,
  submitCallback: (formValues) => {
    userInfo.setUserInfo(formValues);
    console.log(formValues);
    profileFormPopup.close();
  }
})

const cardFormPopup = new PopupWithForm({
  popupSelector: popupCard,
  submitCallback: (formValues) => {
    const dataCard = { name: formValues.nameCard, link: formValues.linkCard };
    console.log(dataCard);
    renderCard.addItem(createCard(dataCard));
    console.log(formValues);
    cardFormPopup.close();
  }
});

function createCard(dataCard) {
  const newCard = new Card(dataCard, '#card-template', handleCardPopup);
  return newCard.getView();
}

const handleCardPopup = (name, link) => {
  popupWithImage.open(link, name);
  console.log(popupWithImage);
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

renderCard.renderItems(initialCards);


