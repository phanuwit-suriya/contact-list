<template>
  <div class="signup-form">
    <form>
  		<h2>Register</h2>
      <div class="form-group">
      	<input type="email" class="form-control" name="email" placeholder="Email" v-model="formData.email" required autofocus>
      </div>
  		<div class="form-group">
        <input type="password" class="form-control" name="password" placeholder="Password" v-model="formData.password" required>
      </div>
  		<div class="form-group">
        <input type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" v-model="formData.confirmPassword" required>
      </div>        
  		<div class="form-group">
        <button type="submit" class="btn btn-success btn-lg btn-block" @click="signUp">Register Now</button>
      </div>
    </form>
  	<div class="text-center">Already have an account? 
  	  <router-link to="/signin">
  	    Sign in
  	  </router-link>
  	</div>
  </div>
</template>

<script>
  export default {
    name: "SignUp",
    data() {
      return {
        formData: {
          email: null,
          password: null,
          confirmPassword: null
        }
      };
    },
    methods: {
      signUp() {
        if (this.formData.password === this.formData.confirmPassword) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.formData.email,
              this.formData.password
            )
            .then(user => {
              this.$router.replace("/dashboard");
            })
            .catch(error => {
              alert(error.message);
            });
        } else {
          alert("Password and confirm password does not match");
        }
      }
    }
  };
</script>

<style scoped>
  .form-control {
    height: 40px;
    box-shadow: none;
    color: #969fa4;
  }

  .form-control:focus {
    border-color: #5cb85c;
  }

  .form-control,
  .btn {
    border-radius: 3px;
  }

  .signup-form {
    width: 400px;
    margin: 0 auto;
    padding: 30px 0;
  }

  .signup-form h2 {
    color: #636363;
    margin: 0 0 15px;
    position: relative;
    text-align: center;
  }

  .signup-form h2:before,
  .signup-form h2:after {
    content: "";
    height: 2px;
    width: 30%;
    background: #d4d4d4;
    position: absolute;
    top: 50%;
    z-index: 2;
  }

  .signup-form h2:before {
    left: 0;
  }

  .signup-form h2:after {
    right: 0;
  }

  .signup-form .hint-text {
    color: #999;
    margin-bottom: 30px;
    text-align: center;
  }

  .signup-form form {
    color: #999;
    border-radius: 3px;
    margin-bottom: 15px;
    background: #f2f3f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
  }

  .signup-form .form-group {
    margin-bottom: 20px;
  }

  .signup-form .btn {
    font-size: 16px;
    font-weight: bold;
    min-width: 140px;
    outline: none !important;
  }

  .signup-form .row div:first-child {
    padding-right: 10px;
  }

  .signup-form .row div:last-child {
    padding-left: 10px;
  }

  .signup-form a {
    color: #000;
    text-decoration: underline;
  }

  .signup-form a:hover {
    text-decoration: none;
  }

  .signup-form form a {
    color: #5cb85c;
    text-decoration: none;
  }

  .signup-form form a:hover {
    text-decoration: underline;
  }
</style>
