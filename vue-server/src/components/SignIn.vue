<template>
  <div class="signin">
    <div class="container">
      <div class="card card-container">
        <h2>Login</h2>
        <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
        <p id="profile-name" class="profile-name-card"></p>
        <form class="form-signin">
          <span id="reauth-email" class="reauth-email"></span>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="formData.email" required autofocus>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="formData.password" required>
          <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" @click="signIn">Sign in</button>
        </form>
        
      </div>
      <router-link to="/signup">
        <div class="create-account">Create an account</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SignIn",
    data() {
      return {
        formData: {
          email: null,
          password: null
        }
      };
    },
    methods: {
      signIn() {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.formData.email, this.formData.password)
          .then(user => {
            this.$router.push("/dashboard");
          })
          .catch(error => {
            alert(error.message);
          });
      },
      signInGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithRedirect(provider).then((result) =>  {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // console.log(user)
            this.$router.push("/dashboard");
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }
    }
  };
</script>

<style scoped>  
  .card-container.card {
    max-width: 350px;
    padding: 40px 40px;
  }
  
  .card-container.card h2 {
    color: #636363;
    margin: 0 0 15px;
    position: relative;
    text-align: center;
  }

  .card-container.card h2:before,
  .card-container.card h2:after {
    content: "";
    height: 2px;
    width: 30%;
    background: #d4d4d4;
    position: absolute;
    top: 50%;
    z-index: 2;
  }

  .card-container.card h2:before {
    left: 0;
  }

  .card-container.card h2:after {
    right: 0;
  }

  .btn {
    font-weight: 700;
    height: 36px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
  }

  .card {
    background-color: #F7F7F7;
    /* just in case there no content*/
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
  }

  .reauth-email {
    display: block;
    color: #404040;
    line-height: 2;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .form-signin #inputEmail,
  .form-signin #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
  }

  .form-signin input[type=email],
  .form-signin input[type=password],
  .form-signin input[type=text],
  .form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgb(104, 145, 162);
  }

  .btn.btn-signin {
    /*background-color: #4d90fe; */
    background-color: rgb(104, 145, 162);
    /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
    padding: 0px;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
  }

  .btn.btn-signin:hover,
  .btn.btn-signin:active,
  .btn.btn-signin:focus {
    background-color: rgb(12, 97, 33);
  }

  .create-account {
    color: rgb(104, 145, 162);
  }

  .create-account:hover,
  .create-account:active,
  .create-account:focus {
    color: rgb(12, 97, 33);
  }
</style>
