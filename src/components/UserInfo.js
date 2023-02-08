class UserInfo {
    constructor(profileNameSelector, profileAboutSelector) {
        this._profileNameText = document.querySelector(profileNameSelector);
        this._profileAboutText = document.querySelector(profileAboutSelector);
    }

    getUserInfo() {
        return { name: this._profileNameText.textContent, about: this._profileAboutText.textContent }

    }
    setUserInfo({ name, about }) {
        this._profileNameText.textContent = name;
        this._profileAboutText.textContent = about;
    }
}

export default UserInfo;