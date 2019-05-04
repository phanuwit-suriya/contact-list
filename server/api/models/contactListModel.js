"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ContactSchema = new Schema({
  contactId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  facebook: {
    type: String
  },
  imageUrl: {
    type: String
  },
  fullName: {
    type: String
  },
})

ContactSchema.pre("save", function (next) {
  this.fullName = this.firstName + " " + this.lastName
  if (this.imageUrl == "") {
    this.imageUrl = "https://via.placeholder.com/270/00000000/FFFFFFFF/?text=" + this.firstName + "_" + this.lastName
  }
  next();
})

module.exports = mongoose.model("Contacts", ContactSchema)