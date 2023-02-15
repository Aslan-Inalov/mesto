import { configValidation } from "../utils/config.js"

import {
  popupOpenElem, cardAddBtn, formProfile,
  formCard, formAvatar, profileAvatarButton

} from "../utils/constants.js"


import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
const avatarFormValidator = new FormValidator(formAvatar, configValidation);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');
const popupWithImage = new PopupWithImage({ popupSelector: '.popup_picture' });

let myId;
Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
]).then(([formValues, newCard]) => {
  userInfo.setUserInfo(formValues);
  myId = formValues._id;
  renderCard.renderItems(newCard);
}).catch(err => {
  console.log(`Error: ${err}`);
})

function createCard(result) {
  const newCard = new Card(result, myId, '#card-template', handleCardClick, {
    handleDeleteCard: () => {
      popupDeleteCard.setSubmitAction(() => {
        api.removeCard(newCard.getId(newCard.id)).then(() => {
          newCard.removeCard();
          popupDeleteCard.close();
        }).catch(err => {
          console.log(err)
        })
      });
      popupDeleteCard.open();
    },
    handleLike: (isLiked) => {
      if (isLiked) {
        api.dislikeCard(newCard.getId()).then((result) => {
          newCard.setLikes(result.likes)
        }).catch(err => {
          console.log(err);
        })
      } else {
        api.likeCard(newCard.getId()).then(result => {
          newCard.setLikes(result.likes)
          console.log(result.likes)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
  );
  return newCard.getView();
}

const renderCard = new Section({
  renderer: (dataCard) => {
    renderCard.addItem(createCard(dataCard))
  }
},
  '.element');


const profileFormPopup = new PopupWithForm({
  popupSelector: '.popup_profile',
  submitCallback: (formValues) => {
    profileFormPopup.isLoading(true);
    api.updateUser(formValues).then(result => {
      userInfo.setUserInfo(formValues);
      console.log(result)
      profileFormPopup.close();
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      profileFormPopup.isLoading(false);
    })
  }
});

const cardFormPopup = new PopupWithForm({
  popupSelector: '.popup_card',
  submitCallback: (formValues) => {
    cardFormPopup.isLoading(true);
    api.addNewCard(formValues.nameCard, formValues.linkCard).then(result => {
      renderCard.addItem(createCard(result));
      cardFormPopup.close();
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      cardFormPopup.isLoading(false);
    })
  }
});


const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_avatar',
  submitCallback: (link) => {
    popupEditAvatar.isLoading(true);
    console.log(link);
    api.updateAvatar(link).then(result => {
      userInfo.setUserInfo(result);
      popupEditAvatar.close();
    }).finally(() => {
      popupEditAvatar.isLoading(false);
    })
  }
});

const popupDeleteCard = new PopupWithConfirmation({
  popupSelector: '.popup_delete-card'
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

//открыть редактор аватарки
profileAvatarButton.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  popupEditAvatar.open();
})


profileFormPopup.setEventListeners();
cardFormPopup.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();



