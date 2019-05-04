"use strict"

const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const Contact = require("./api/models/contactListModel")
const routes = require("./api/routes/contactListRoute")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/contactList", function (err) {
  if (err) throw err
  console.log("Successfully connected")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

const port = process.env.PORT || 3000

app.listen(port)

console.log("Contact List started on: " + port)