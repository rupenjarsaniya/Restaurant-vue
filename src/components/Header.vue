<template>
  <ul id="menubar">
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/add">Add Restaurant</router-link></li>
    <li><router-link to="/update">Update Restaurant</router-link></li>
    <li><router-link to="" v-on:click="logout()">Logout</router-link></li>
  </ul>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Signup" });
    },
  },
};
</script>

<style scoped>
#menubar {
  display: flex;
  flex-direction: row;
  align-items: left;
  background-color: rgb(197, 135, 0);
}
#menubar li {
  list-style-type: none;
}
#menubar li a {
  display: block;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  letter-spacing: 0.05rem;
  padding: 1rem 1rem;
  transition: 0.3s;
}
#menubar li a:hover {
  background-color: rgb(46, 31, 0);
}
</style>
