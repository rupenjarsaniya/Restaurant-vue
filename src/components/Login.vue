<template>
  <div id="user_login">
    <div class="myForm_container">
      <img src="../assets/res-logo.png" alt="logo" />
      <form id="myForm" v-on:submit.prevent="logUser()">
        <h1 class="login_heading">Log In</h1>
        <input
          type="email"
          name="user_email"
          placeholder="Enter User Email"
          v-model="email"
        />
        <input
          type="password"
          name="user_password"
          placeholder="Enter Password"
          v-model="password"
        />
        <button type="submit" class="submit_btn">Login</button>
        <p class="redirect_signup">
          Already have an account?
          <router-link to="signup">Login Here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async logUser() {
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );
      console.log(result.data[0]);
      if (result.status === 200 && result.data.length > 0) {
        console.log("Login Successfully");
        localStorage.setItem("userInfo", JSON.stringify(result.data[0]));
        this.$router.push({ name: "Home" });
      } else {
        console.log("Some error occured to login or you already registered");
      }
    },
  },
  mounted() {
    let getUserInfo = localStorage.getItem("userInfo");
    if (getUserInfo) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style scoped>
#user_login {
  height: 100vh;
}
#user_login .myForm_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
#user_login .myForm_container img {
  width: 150px;
  margin-top: 3rem;
}
#user_login .myForm_container .login_heading {
  margin: 1rem 0 1rem 0;
  color: rgb(197, 135, 0);
}
#myForm {
  box-shadow: 0 0 4px 1px rgb(201, 201, 201);
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
  border-radius: 1rem;
  width: 20%;
  margin-top: 2rem;
}
#myForm input {
  margin: 1rem 0;
  padding: 0.5rem 0.5rem;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 0.3rem;
  font-size: 0.9rem;
  width: 100%;
  outline: none;
}
#myForm input:focus {
  border: 1px solid rgb(197, 135, 0);
  box-shadow: 0px 0px 5px 0 rgb(197, 135, 0);
}
#myForm .submit_btn {
  background-color: rgb(197, 135, 0);
  padding: 0.5rem 2rem;
  border-radius: 0.2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 300;
  color: white;
  border: none;
  cursor: pointer;
}
#myForm .redirect_signup {
  color: rgb(46, 31, 0);
  font-size: 0.8rem;
}
#myForm .redirect_signup a {
  color: rgb(46, 31, 0);
}
</style>
