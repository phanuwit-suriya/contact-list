<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/dashboard">
          <div class="navbar-brand">
            <img
              src="../../assets/logo.png"
              width="24px"
              height="24px"
              class="d-inline-block align-top"
            >
          </div>
        </router-link>
      </div>

      <ul class="nav navbar-nav navbar-left">
        <li>
          <router-link to="/dashboard">Contact</router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="!user">
        <li>
          <router-link to="/signup">
            <span class="glyphicon glyphicon-user"></span> Sign Up
          </router-link>
        </li>
        <li>
          <router-link to="/signin">
            <span class="glyphicon glyphicon-log-in"></span> Login
          </router-link>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="user">
        <li>
          <p>{{ email }}</p>
        </li>
        <li>
          <a @click="logout">
            <span class="glyphicon glyphicon-log-out"></span> Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
  
<script>
export default {
  name: "Navigation",
  data() {
    return {
      user: null
    };
  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        ref = this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/signin");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
