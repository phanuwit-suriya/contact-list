"use strict";

var mongoose = require("mongoose");
var Contact = mongoose.model("Contacts");

exports.listAllContacts = (req, res) => {
    Contact.find({}, null, { sort: { contactId: 1 }}, (err, contact) => {
        if (err) throw err;
        res.json(contact);
    });
};

exports.createContact = (req, res) => {
    var newContact = new Contact(req.body);
    newContact.save((err, contact) => {
        if (err) throw err;
        res.json(contact);
    });
};

exports.getContact = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) throw err;
        res.json(contact);
    });
};

exports.updateContact = (req, res) => {
    var editedContact = req.body;
    Contact.findByIdAndUpdate(req.params.contactId, editedContact, { new: true }, (err, contact) => {
        if (err) throw err;
        res.json(contact);
    });
};

exports.deleteContact = (req, res) => {
    Contact.findByIdAndDelete(req.params.contactId, (err, contact) => {
        if (err) throw err;
        res.json({ message: req.params.contactId + " was deleted.", id: contact.contactId });
    });
};
