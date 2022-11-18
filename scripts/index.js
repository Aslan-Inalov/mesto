const popupOpenElem = document.querySelector('.profile__edit-button');
const popupElems = document.querySelector('.popup');
const popupCloseElem = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileInputName = document.querySelector('.popup__input_type_name');
const profileInputAbout = document.querySelector('.popup__input_type_about');
const formProfile = document.querySelector('.popup__form_profile');
const likeElem = document.querySelector(".element__like");
const popupCard = document.querySelector(".popup_card");


function changeValue() {
  profileInputName.value = profileName.textContent;
  profileInputAbout.value = profileAbout.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormProfileSubmit(elem) {
  elem.preventDefault();

  profileName.textContent = profileInputName.value;
  profileAbout.textContent = profileInputAbout.value;

  closePopup(popupProfile);
}

popupCloseElem.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popupOpenElem.addEventListener('click', () => {
  openPopup(popupProfile);
  changeValue();
});

formProfile.addEventListener('submit', handleFormProfileSubmit);


