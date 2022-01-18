<template>
  <div id="update_restaurant">
    <div class="myForm_container">
      <form id="updateForm" v-on:submit.prevent="update_restaurant()">
        <h1 class="update_heading">Update Restaurant</h1>
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
        <button type="submit" class="update_Res_Submit">
          Update Restaurant
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  name: "Update",
  data() {
    return {
      res_name: "",
      res_address: "",
      res_contact: "",
    };
  },
  async mounted() {
    let getUserInfo = localStorage.getItem("userInfo");
    if (!getUserInfo) {
      this.$router.push({ name: "Signup" });
    } else {
      this.name = JSON.parse(getUserInfo).username;
    }

    let id = useRoute().params.id;
    let restaurant = await axios.get("http://localhost:3000/restaurants/" + id);
    this.res_name = restaurant.data.name;
    this.res_address = restaurant.data.address;
    this.res_contact = restaurant.data.contact;
  },
  methods: {
    async update_restaurant() {
      let id = this.$route.params.id;
      let result = await axios.put("http://localhost:3000/restaurants/" + id, {
        name: this.res_name,
        address: this.res_address,
        contact: this.res_contact,
      });
      if (result.status === 200) {
        console.log("Restaurant Updated");
        this.$router.push({ name: "Home" });
      } else {
        console.log("Some error occured to update restaurant");
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
#update_restaurant {
  height: 100vh;
}
#update_restaurant .myForm_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 3rem;
}
#update_restaurant .myForm_container .update_heading {
  margin: 1rem 0 1rem 0;
  color: rgb(197, 135, 0);
}
#updateForm {
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
#updateForm input {
  margin: 1rem 0;
  padding: 0.5rem 0.5rem;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 0.3rem;
  font-size: 0.9rem;
  width: 100%;
  outline: none;
}
#updateForm input:focus {
  border: 1px solid rgb(197, 135, 0);
  box-shadow: 0px 0px 5px 0 rgb(197, 135, 0);
}
#updateForm .update_Res_Submit {
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
#updateForm .update_Res_Submit:hover {
  background-color: rgb(150, 102, 0);
}
</style>
