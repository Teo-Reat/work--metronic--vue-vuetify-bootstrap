export class Store {
	active;
	addresEn;
	addressHeb;
	adminActive;
	adminMessage;
	delivery;
	deliveryTypes;
	description;
	fax;
	mail;
	message;
	mobile;
	nameEn;
	nameHeb;
	payments

	constructor(data) {
		this.active = data.active;
		this.addresEn = data.addresEn;
		this.addressHeb = data.addressHeb;
		this.adminActive = data.adminActive;
		this.adminMessage = data.adminMessage;
		this.delivery = data.delivery;
		this.deliveryTypes = data.deliveryTypes;
		this.description = data.description;
		this.fax = data.fax;
		this.mail = data.mail;
		this.message = data.message;
		this.mobile = data.mobile;
		this.nameEn = data.nameEn;
		this.nameHeb = data.nameHeb;
		this.payments = data.payments;
	}
}
