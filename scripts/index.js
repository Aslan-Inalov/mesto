const popupOpenElem = document.querySelector('.profile__edit-button');
const popupElems = document.querySelector('.popup');
const popupCloseElem = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileInputName = document.querySelector('.popup__input_type_name');
const profileInputAbout = document.querySelector('.popup__input_type_about');
const formProfile = document.querySelector('.popup__form');

//редактор профиля 

//открытия редактора с заполнеными значениями профайла
function openPopup(popup) { 
  popup.classList.add('popup_opened');

  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent; 
}

//закрытия редактора
function closePopup(popup) { 
  popup.classList.remove('popup_opened'); 
}

//сохранения
function handleFormProfileSubmit(elem) {
  elem.preventDefault();

  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupElems);
}


//открыть
popupOpenElem.addEventListener('click', () => {
  openPopup(popupElems);
});

//закрыть
popupCloseElem.addEventListener('click', () => {
  closePopup(popupElems);
});

//сохранить
formProfile.addEventListener('submit', handleFormProfileSubmit);


