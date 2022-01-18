<template>
  <div id="user_signup">
    <div class="myForm_container">
      <img src="../assets/res-logo.png" alt="logo" />
      <form id="myForm" v-on:submit.prevent="addUser()">
        <h1 class="signup_heading">Sign Up</h1>
        <input
          type="text"
          name="user_name"
          placeholder="Enter User Name"
          v-model="username"
        />
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
        <button type="submit" class="submit_btn">Signup</button>
        <p class="redirect_login">
          Already have an account?
          <router-link to="login">Login Here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async addUser() {
      let result = await axios.post("http://localhost:3000/users", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
      if (result.status === 201) {
        console.log("Register Successfully");
        localStorage.setItem("userInfo", JSON.stringify(result.data));
        this.$router.push({ name: "Home" });
      } else {
        console.log("Some error occured while register user");
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
#user_signup {
  height: 100vh;
}
#user_signup .myForm_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
#user_signup .myForm_container img {
  width: 150px;
  margin-top: 3rem;
}
#user_signup .myForm_container .signup_heading {
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
#myForm .redirect_login {
  color: rgb(46, 31, 0);
  font-size: 0.8rem;
}
#myForm .redirect_login a {
  color: rgb(46, 31, 0);
}
</style>
