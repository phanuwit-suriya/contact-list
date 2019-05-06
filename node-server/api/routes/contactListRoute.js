"use strict";

module.exports = function(app) {
    var contactList = require("../controllers/contactListController");
    
    app.route("/contact")
        .get(contactList.listAllContacts)
        .post(contactList.createContact);
        
    app.route("/contact/:contactId")
        .get(contactList.getContact)
        .post(contactList.updateContact)
        .delete(contactList.deleteContact);
};
