import {
    openPopup,
    popupImage,
    popupPicture,
    popupText,
  } from "./index.js";

export default class Card {
    constructor(data, cardSelector) {
        this._cardInputName = data.name;
        this._cardInputLink = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate(){
        this._card = document
        .querySelector(this._cardSelector)
        .content.querySelector('.element__item')
        .cloneNode(true);

        return this._card;
    }

    _deleteCard() {
        this._newCard.remowe();
        this._newCard = null;
    }

    _likeCard() {
        this.classList.toggle('.element__like');
    }

    _openPopupImage() {
        popupImage.src = this._cardInputLink;
        popupText.textContent = this._cardInputName;
        popupImage.alt = this._cardInputName;

        openPopup(popupPicture);
    }

    _setData() {
        this._titleElement = this._newCard.querySelector('.element__title');
        this._imageElement = this._newCard.querySelector('.element__image');

        this._titleElement.textContent = this._cardInputName;
        this._imageElement.src = this._cardInputLink;
        this._imageElement.alt = this._cardInputName;

    }

    _setEventListeners() {
        this._newCard
        .querySelector('.element__delete')
        .addEventListener('click', () => { 
            this._deleteCard() 
        });

        this._newCard
        .querySelector('.element__like')
        .addEventListener('click', () => {
            this._likeCard() 
        });

        this._imageElement
        .addEventListener('click', () => {
            this._openPopupImage()
        });

    }

    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setEventListeners();

        return this._newCard;
    }
}

/
