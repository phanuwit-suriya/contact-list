"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
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
    }
});

module.exports = mongoose.model("Contacts", ContactSchema, "contacts");
