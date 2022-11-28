// массив карточек
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

// узлы
const popupOpenElem = document.querySelector('.profile__edit-button');
const cardAddBtn = document.querySelector('.profile__add-button');
const popupElems = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupCloseElem = document.querySelectorAll('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileInputName = document.querySelector('.popup__input_user_name');
const profileInputAbout = document.querySelector('.popup__input_user_about');
const formProfile = document.querySelector('.popup__form_profile');
const formCard = document.querySelector('.popup__form_card');
const cardContainer = document.querySelector('.element');
const cardInputName = document.querySelector('.popup__input_card_name');
const cardInputLink = document.querySelector('.popup__input_card_link');



//РЕДАКТОР ПРОФИЛЯ 

//открытие редактора с заполнеными значениями профайла
function openPopup(popup) { 
  popup.classList.add('popup_opened');

  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent; 
}

//закрытие редактора
function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
}

//сохранение
function handleFormProfileSubmit(elem) {
  elem.preventDefault();

  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupProfile);
}

//открыть
popupOpenElem.addEventListener('click', () => {
  openPopup(popupProfile);
});

//сохранить
formProfile.addEventListener('submit', handleFormProfileSubmit);


//КАРТОЧКИ
//открыть
cardAddBtn.addEventListener('click', () => {
  openPopup(popupCard);
});

//универсальное закрытие попап
popupCloseElem.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener ('click', () => closePopup(popup));
});

//шаблон
const cardTemplate = document.querySelector('#card-template').content.querySelector('.element__item');


//генерация карточки
const handerDeleteCard = (event) => {
  event.target.closest('.element__item').remove();
}

const handerLikeCard = (event) => {
  event.target.closest('.element__like').classList.toggle('element__like_active');
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
