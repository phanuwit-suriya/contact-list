"use strict"

const mongoose = require("mongoose")
const Contact = mongoose.model("Contacts")

exports.listAllContacts = function (req, res) {
  var query = { sort: { contactId: 1 } }
  Contact
    .find({}, null, query, function (err, contact) {
      if (err) throw err
      res.json(contact)
    })
}

exports.createContact = function (req, res) {
  var newContact = new Contact(req.body)
  newContact
    .save(function (err, contact) {
      if (err) throw err;
      res.json(contact)
    })
}

exports.getContact = function (req, res) {
  Contact.findById(req.params.contactId, function (err, contact) {
    if (err) throw err
    res.json(contact)
  })
}

exports.updateContact = function (req, res) {
  var editedContact = req.body
  Contact.findByIdAndUpdate(req.params.contactId, editedContact, {
    new: true
  }, function (err, contact) {
    if (err) throw err;
    res.json(contact);
  })
}

exports.deleteContact = function (req, res) {
  Contact.findByIdAndDelete(req.params.contactId, function (err, contact) {
    if (err) throw err
    var response = {
      message: "Delete user id: " + req.params.contactId + " successfully",
      id: contact.contactId
    }
    res.json(response)
  })
}

