<template>
  <div>
    <h1>Hello {{ name }}, Welcome to Home page</h1>
    <table id="myTable">
      <tr>
        <th>Restaurant ID</th>
        <th>Restaurant Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th>Action</th>
      </tr>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <td>{{ restaurant.id }}</td>
        <td>{{ restaurant.name }}</td>
        <td>{{ restaurant.address }}</td>
        <td>{{ restaurant.contact }}</td>
        <td>
          <router-link :to="'/update/' + restaurant.id">Update</router-link>
          &nbsp;
          <button type="button" v-on:click="delete_Restaurant(restaurant.id)">
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      name: "",
      restaurants: [],
    };
  },
  async mounted() {
    this.loadData();
  },
  methods: {
    async delete_Restaurant(id) {
      let result = await axios.delete(
        "http://localhost:3000/restaurants/" + id
      );
      console.log(result);
      if (result.status === 200) {
        console.log("Restaurant Deleted");
        this.loadData();
      } else {
        console.log("Some error getting to delete restaurant");
      }
    },
    async loadData() {
      let getUserInfo = localStorage.getItem("userInfo");
      if (!getUserInfo) {
        this.$router.push({ name: "Signup" });
      } else {
        this.name = JSON.parse(getUserInfo).username;
      }

      let restaurants = await axios.get("http://localhost:3000/restaurants");
      this.restaurants = restaurants.data;
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
#myTable {
  border: 0.5px solid gray;
  border-collapse: collapse;
  border-radius: 10rem;
  margin: 3rem auto 0 auto;
  text-align: center;
}
#myTable tr:nth-child(odd) {
  background-color: rgb(255, 255, 255);
}
#myTable tr:nth-child(even) {
  background-color: rgb(243, 243, 243);
}
#myTable th,
#myTable td {
  border: 0.5px solid gray;
  padding: 0.5rem 2rem;
}
</style>
