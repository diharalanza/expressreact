class Contact {
  constructor(id = null, fName, lName, email, phone, imageUrl) {
    this.id = id;
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
  }

  update( options ){
    if(options.fName) this.fName = options.fName;
    if(options.lName) this.lName = options.lName;
    if(options.email) this.email = options.email;
    if(options.phone) this.phone = options.phone;

    //IMPROVEMENT: this was set to "if(options.imageUrl) this.phone = options.imageUrl;" for some reason?
    if(options.imageUrl) this.imageUrl = options.imageUrl;
    return this;
  }

  save() {
    return true;
  }
}

export default Contact;