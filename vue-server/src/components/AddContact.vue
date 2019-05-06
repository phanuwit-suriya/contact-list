<template>
  <div class="add-contact">
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-md-offset-3">
      <h1>{{ msg }}</h1>
      <div class="vframe">
        <form>
          <div class="form-group">
            <label class="pull-left">Contact ID*</label>
            <input
              type="text"
              v-model.trim="contactData.contactId"
              class="form-control"
              placeholder="Contact ID"
              required
            >
          </div>
          <div class="form-group">
            <label class="pull-left">First Name*</label>
            <input
              type="text"
              v-model.trim="contactData.firstName"
              class="form-control"
              placeholder="First Name"
              required
            >
          </div>
          <div class="form-group">
            <label class="pull-left">Last Name*</label>
            <input
              type="text"
              v-model.trim="contactData.lastName"
              class="form-control"
              placeholder="Last Name"
              required
            >
          </div>
          <div class="form-group">
            <label class="pull-left">Mobile No*</label>
            <input
              type="text"
              v-model.trim="contactData.mobileNo"
              class="form-control"
              placeholder="Mobile No"
              required
            >
          </div>
          <div class="form-group">
            <label class="pull-left">E-mail</label>
            <input
              type="email"
              v-model.trim="contactData.email"
              class="form-control"
              placeholder="E-mail"
            >
          </div>
          <div class="form-group">
            <label class="pull-left">Facebook</label>
            <input
              type="text"
              v-model.trim="contactData.facebook"
              class="form-control"
              placeholder="Facebook"
            >
          </div>
          <div class="form-group">
            <label class="pull-left">Image URL</label>
            <input
              type="text"
              v-model.trim="contactData.imageUrl"
              class="form-control"
              placeholder="Image URL"
            >
          </div>
          <div class="container">
            <div class="pull-left" v-if="errors.length > 0">
              <b>Please correct the following error(s).</b>
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </div>
          </div>
          <button class="btn btn-default" type="button" @click="saveButton">
            <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Save
          </button>
          <button class="btn btn-default" type="button" @click="closeButton">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Close
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddContact",
  data() {
    return {
      msg: "Add Contact Page",
      errors: [],
      contactData: {
        contactId: "",
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        facebook: "",
        imageUrl: ""
      }
    };
  },
  methods: {
    saveButton() {
      var newContact = {
        contactId: this.contactData.contactId,
        firstName: this.contactData.firstName,
        lastName: this.contactData.lastName,
        mobileNo: this.contactData.mobileNo,
        email: this.contactData.email,
        facebook: this.contactData.facebook,
        imageUrl: this.contactData.imageUrl
      };
      if (this.contactData.contactId && this.contactData.firstName && this.contactData.lastName && this.contactData.mobileNo) {
        axios
          .post("http://contact-list-v2-phanuwitsuriya.c9users.io:8081/contact", newContact)
          .then(response => {
            this.$router.push("/dashboard");
          })
          .catch(error => {
            alert(error);
          });
      } else {
        this.errors = [];
        if (!this.contactData.contactId) this.errors.push("Contact ID Required");
        if (!this.contactData.firstName) this.errors.push("First Name Required");
        if (!this.contactData.lastName) this.errors.push("Last Name Required");
        if (!this.contactData.mobileNo) this.errors.push("Mobile No Required");
      }
    },
    closeButton() {
      this.$router.push("/dashboard");
    }
  }
};
</script>
