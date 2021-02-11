// eslint-disable-next-line no-unused-vars
export class User {
    fullName;
    mobile;
    email;
    password;
    pic;
    country;
    birthday;
    sms;
    userType;
    active;
    token;
    socialToken;
    deliveryAddress;
    stores;
    _id;
    constructor(data) {
        this.fullName = data.fullName;
        this.mobile = data.mobile;
        this.email = data.email;
        this.password = data.password;
        this.pic = data.pic;
        this.country = data.country;
        this.birthday = data.birthday;
        this.sms = data.sms;
        this.userType = data.userType;
        this.active = data.active;
        this.socialToken = data.socialToken;
        this.deliveryAddress = data.deliveryAddress;
        this.stores = data.stores;
        this._id = data._id;
    }
}