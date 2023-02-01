export default class UserInfo {
    constructor({nameProfile, infoProfile}) {
        this._nameProfile = nameProfile;
        this._infoProfile = infoProfile;
    }

    getUserInfo() {
        this._submitProfileForm = {};
        this._submitProfileForm.name = this._nameProfile.textContent;
        this._submitProfileForm.info = this._infoProfile.textContent;
        return this._submitProfileForm;
    }

    setUserInfo(data) {
        this._nameProfile.textContent = data.name;
        this._infoProfile.textContent = data.info;
    }
}