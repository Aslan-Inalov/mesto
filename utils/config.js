export const popupOpenElem = document.querySelector('.profile__edit-button');
export const cardAddBtn = document.querySelector('.profile__add-button');
export const popupElems = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup_profile');
export const popupCard = document.querySelector('.popup_card');
export const popupPicture = document.querySelector('.popup_picture');
export const popupCloseElems = document.querySelectorAll('.popup__close-button');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profileInputName = document.querySelector('.popup__input_user_name');
export const profileInputAbout = document.querySelector('.popup__input_user_about');
export const formProfile = document.querySelector('.popup__form_profile');
export const formCard = document.querySelector('.popup__form_card');
export const formCardBtn = formCard.querySelector('.popup__button');
export const cardContainer = document.querySelector('.element');
export const cardInputName = document.querySelector('.popup__input_card_name');
export const cardInputLink = document.querySelector('.popup__input_card_link');
export const popupImage = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__picture-text');
export const cardTemplate = document.querySelector('#card-template');

export const initialCards = [
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