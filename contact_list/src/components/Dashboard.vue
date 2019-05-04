<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search..." v-model="search">
            <span class="input-group-btn">
              <!-- <button class="btn btn-default" type="button" @click="searchButton">Search</button> -->
              <router-link to="/add-contact">
                <button class="btn btn-success" type="button">
                  <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
                </button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="panel panel-default">
        <div class="panel-body"></div>
      </div>
    </div>

    <div class="container">
      <div class="panel panel-default">
        <div class="panel-body">
          <div v-if="contacts.length > 0" class="row">
            <div
              class="col-lg-3 col-md-4 col-sm-4"
              v-for="contact in filteredContact"
              :key="contact.contactId"
            >
              <div class="card text-center">
                <div class="card-image">
                  <img class="img-responsive" :src="contact.imageUrl">
                </div>
                <div class="card-body">
                  <h5
                    class="card-title"
                  >{{ capitalize(contact.firstName) + " " + capitalize(contact.lastName) }}</h5>
                  <div class="card-text">Mobile: {{ contact.mobileNo }}</div>
                  <br>
                  <div class="card-text">E-mail: {{ contact.email }}</div>
                  <br>
                  <div class="card-text">Facebook: {{ contact.facebook }}</div>
                  <br>
                </div>
                <div class="card-footer">
                  <router-link :to="{ path: 'edit-contact/' + contact._id }">
                    <button class="btn btn-primary btn-xs" type="button">
                      <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                    </button>
                  </router-link>
                  <button
                    class="btn btn-danger btn-xs"
                    type="button"
                    data-toggle="modal"
                    data-target=".bd-example-modal-sm"
                    @click="confirmDelete(contact._id)"
                  >
                    <span class="glyphicon glyphicon-erase" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>Empty Contact</div>
        </div>
      </div>
    </div>

    <div
      class="modal fade bd-example-modal-sm"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title" id="exampleModalLabel">Are you sure?</h1>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">Are you sure you want to delete this item?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <router-link to="/dashboard">
              <button type="button" class="btn btn-danger" @click="deleteContact(uid)">Delete</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      msg: "Dashboard",
      uid: "",
      search: "",
      contacts: [],
      newContacts: []
    };
  },
  created() {
    axios.get("http://localhost:3000/contact").then(response => {
      this.contacts = response.data;
    });
  },
  methods: {
    searchButton() {
      return this.contacts.filter(contact => {
        return contact.fullName.match(this.search);
      });
    },
    confirmDelete(contactId) {
      $("#my-modal").modal("show");
      this.uid = contactId;
    },
    deleteContact(contactId) {
      axios
        .delete("http://localhost:3000/contact/" + contactId)
        .then(response => {
          console.log("Delete Contact ID: " + contactId + " Successfully");
          this.$router.push("/dashboard");
        })
        .catch(error => {
          console.log(error);
        });
    },
    capitalize(string) {
      if (typeof string !== "string") return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  computed: {
    filteredContact() {
      return this.contacts.filter(contact => {
        return contact.fullName.match(this.search);
      });
    }
  }
};
</script>

<style scoped>
/* @import url(http://fonts.googleapis.com/css?family=Roboto:400,300);
@import url(//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css); */
.card .card-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  transform-style: preserve-3d;
  border-radius: 5px;
}

.card .card-image img {
  -webkit-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  -ms-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.card .card-image:hover img {
  -webkit-transform: scale(1.2) rotate(-7deg);
  -moz-transform: scale(1.2) rotate(-7deg);
  -ms-transform: scale(1.2) rotate(-7deg);
  -o-transform: scale(1.2) rotate(-7deg);
  transform: scale(1.2) rotate(-7deg);
}

.card {
  font-family: "Roboto", sans-serif;
  margin-top: 10px;
  position: relative;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 4 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card .card-body {
  padding-bottom: 10px;
}

.card .card-body .card-text {
  /* line-height: 5px; */
  display: inline-block;
}

.card .card-footer {
  border-top: 1px solid #EEEEEE;
  padding: 10px;
}

.card .card-body .card-title,
.card-reveal .card-title {
  font-size: 24px;
  font-weight: 200;
}

.btn-custom {
  background-color: transparent;
  font-size: 18px;
}
</style>
