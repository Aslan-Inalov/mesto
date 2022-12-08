// узлы
const popupOpenElem = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const popupElems = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupPicture = document.querySelector('.popup_picture');
const popupCloseElem = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileInputName = document.querySelector('.popup__input_user_name');
const profileInputAbout = document.querySelector('.popup__input_user_about');
const formProfile = document.querySelector('.popup__form_profile');
const formCard = document.querySelector('.popup__form_card');
const formCardBtn = document.querySelector('.popup__button');
const cardContainer = document.querySelector('.element');
const cardInputName = document.querySelector('.popup__input_card_name');
const cardInputLink = document.querySelector('.popup__input_card_link');
const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__picture-text');


//РЕДАКТОР ПРОФИЛЯ 

//открытие редактора с заполнеными значениями профайла
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//закрытие редактора
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  clearErrors(popup);
}

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
});

//сохранить
formProfile.addEventListener('submit', handleFormProfileSubmit);

function resetErrors(form) {
  const inputs = form.querySelectorAll('.form__input');
  inputs.forEach((input) => {
    hideInputError(form, input, configValidation);
  });
}

//КАРТОЧКИ
//открыть
cardAddBtn.addEventListener('click', () => {
  formCardBtn.disabled = true;
  formCard.reset();
  resetErrors(formCard);
  openPopup(popupCard);
});

//универсальное закрытие попап
popupCloseElem.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//закрытие попапа нажатием Escape
const closePopupByEsc = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//закрытие попапа кликом на оверлей
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


//шаблон
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element__item');


//генерация карточки
const handerDeleteCard = (event) => {
  event.target.closest('.element__item').remove();
}

const handerLikeCard = (event) => {
  event.target.classList.toggle('element__like_active');
}

const generateCard = (dataCard) => {
  const newCard = cardTemplate.cloneNode(true);

  const titleCard = newCard.querySelector('.element__title');
  const imageCard = newCard.querySelector('.element__image');
  titleCard.textContent = dataCard.name;
  imageCard.src = dataCard.link;
  imageCard.alt = dataCard.name;

  const deleteBtn = newCard.querySelector('.element__delete');
  deleteBtn.addEventListener('click', handerDeleteCard)

  const likeBtn = newCard.querySelector('.element__like');
  likeBtn.addEventListener('click', handerLikeCard)

  //попак просмотра картинок
  imageCard.addEventListener('click', () => {
    openPopup(popupPicture);

    popupImage.src = dataCard.link;
    popupImage.alt = dataCard.name;
    popupText.textContent = dataCard.name;

  })

  return newCard;


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

//добавление карточек
const renderCard = (dataCard) => {
  cardContainer.prepend(generateCard(dataCard));
}

//рендер карточек
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
})

