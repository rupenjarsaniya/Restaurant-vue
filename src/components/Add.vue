<template>
  <div id="add_restaurant">
    <div class="myForm_container">
      <form id="addForm" v-on:submit.prevent="add_restaurant()">
        <h1 class="add_heading">Add Restaurant</h1>
        <input
          type="text"
          name="res_name"
          placeholder="Enter Restaurant Name"
          v-model="res_name"
        />
        <input
          type="text"
          name="res_address"
          placeholder="Enter Restaurant Address"
          v-model="res_address"
        />
        <input
          type="number"
          name="res_contact"
          placeholder="Enter Restaurant Contact"
          v-model="res_contact"
        />
        <button type="submit" class="add_Res_Submit">Add Restaurant</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Add",
  data() {
    return {
      res_name: "",
      res_address: "",
      res_contact: "",
    };
  },
  mounted() {
    let getUserInfo = localStorage.getItem("userInfo");
    if (!getUserInfo) {
      this.$router.push({ name: "Signup" });
    } else {
      this.name = JSON.parse(getUserInfo).username;
    }
  },
  methods: {
    async add_restaurant() {
      let result = await axios.post("http://localhost:3000/restaurants", {
        name: this.res_name,
        address: this.res_address,
        contact: this.res_contact,
      });
      if (result.status === 201) {
        console.log("Restaurant Added");
        this.res_name = "";
        this.res_address = "";
        this.res_contact = "";
      } else {
        console.log("Some error occured to add restaurant");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
#add_restaurant {
  height: 100vh;
}
#add_restaurant .myForm_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 3rem;
}
#add_restaurant .myForm_container .add_heading {
  margin: 1rem 0 1rem 0;
  color: rgb(197, 135, 0);
}
#addForm {
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
#addForm input {
  margin: 1rem 0;
  padding: 0.5rem 0.5rem;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 0.3rem;
  font-size: 0.9rem;
  width: 100%;
  outline: none;
}
#addForm input:focus {
  border: 1px solid rgb(197, 135, 0);
  box-shadow: 0px 0px 5px 0 rgb(197, 135, 0);
}
#addForm .add_Res_Submit {
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
  transition: 0.3s;
}
#addForm .add_Res_Submit:hover {
  background-color: rgb(150, 102, 0);
}
</style>
