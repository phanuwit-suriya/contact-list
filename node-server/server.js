"use strict";

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// var port = process.env.PORT || 8081;
var port = 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Contact = require("./api/models/contactListModel");
var routes = require("./api/routes/contactListRoute");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/contactList", { useNewUrlParser: true }, err => {
  if (err) throw err;
  console.log("Connection successful");
});

routes(app);

app.listen(port, () => console.log("Contact List started on: " + port));
