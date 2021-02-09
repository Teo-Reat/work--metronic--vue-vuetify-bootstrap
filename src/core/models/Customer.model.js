export class Customer {
  fullName;
  email;
  phone;
  sourceUrl;
  source;
  constructor(customer) {
    this.fullName = customer.fullName;
    this.email = customer.email;
    this.phone = customer.email;
    this.sourceUrl = customer.sourceUrl;
    this.source = customer.source;
  }
}
