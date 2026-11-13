<script setup>
import { RouterLink, useRoute } from "vue-router";


const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/Events">Events</RouterLink>
    <RouterLink to="/Profile">Profile</RouterLink>
    <RouterLink to="/Signin"> Sign in</RouterLink>
  </nav>
</template>

<style scoped>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #fff;
  color: #cf6363;
}

nav {
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px 0;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

nav a {
  text-decoration: none;
  color: #555;
  padding: 8px 15px;
  margin: 0 5px;
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
}

nav a:hover,
nav a:focus {
  color: #000;
  background-color: #eee;
}
</style>
