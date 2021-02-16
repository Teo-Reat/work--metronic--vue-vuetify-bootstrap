export class Item {
	seo;
	inStock;
	rate;
	category;
	nameEn;
	nameHeb;
	description;
	additional;
	dayDeal;
	price;
	__v;
	code;
	picture;
	recommended

	constructor(data) {
		this.seo = data.seo;
		this.price = data.price;
		this.__v = data.__v;
		this.inStock = data.inStock;
		this.recommended = data.recommended;
		this.picture = data.picture;
		this.rate = data.rate;
		this.code = data.code;
		this.category = data.category;
		this.description = data.description;
		this.nameEn = data.nameEn;
		this.nameHeb = data.nameHeb;
		this.additional = data.additional;
		this.dayDeal = data.dayDeal;
	}
}
