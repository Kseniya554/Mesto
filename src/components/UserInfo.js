export default class UserInfo {
    constructor({nameProfile, infoProfile, avatarProfile}) {
        this._nameProfile = nameProfile;
        this._infoProfile = infoProfile;
        this._avatarProfile = avatarProfile;
    }

    getUserInfo() {
        this._submitProfileForm = {};
        this._submitProfileForm.name = this._nameProfile.textContent;
        this._submitProfileForm.info = this._infoProfile.textContent;
        this._submitProfileForm.avatar = this._avatarProfile.src;
        return this._submitProfileForm;
    }

    setUserInfo(data) {
        this._nameProfile.textContent = data.name;
        this._infoProfile.textContent = data.info;
        this._dataUser = data;
    }

    setUserAvatar(avatar) {
        this._avatarProfile.src = avatar;
      }

    getUserId() {
        return this._userId = this._dataUser._id;
      }
}