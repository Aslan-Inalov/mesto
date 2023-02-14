class UserInfo {
    constructor(profileNameSelector, profileAboutSelector, profileAvatarSelector) {
        this._profileNameText = document.querySelector(profileNameSelector);
        this._profileAboutText = document.querySelector(profileAboutSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return { name: this._profileNameText.textContent, about: this._profileAboutText.textContent }

    }
    setUserInfo(formValues) {
        this._profileNameText.textContent = formValues.name;
        this._profileAboutText.textContent = formValues.about;
        this._profileAvatar.src = formValues.avatar;
        this._profileAvatar.alt = formValues.name;
    }

    setUserAvatar(formValues) {
        this._profileAvatar.src = formValues.avatarLink;
      }
}

export default UserInfo;