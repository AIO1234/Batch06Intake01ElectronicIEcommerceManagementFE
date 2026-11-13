<template>
  <div class="signup-container">
    <form @submit.prevent="handleSignup" class="signup-form">
      <h1 style="align-self: center">Sign Up</h1>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit">Register</button>

      <div>
        <button @click="showLoginForm = true">Open Login Form</button>

        <LoginForm v-if="showLoginForm" @close="showLoginForm = false" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

import LoginForm from "@/views/UserSide/Loginform.vue"; // Import the login form component

// Reactive state to control visibility
const showLoginForm = ref(false);

const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }
  // Further logic for API call and user registration goes here
  console.log("Sign-up submitted:", {
    name: name.value,
    email: email.value,
    password: password.value,
  });
  alert("Sign-up successful! (API call not implemented)");
};
</script>

<style scoped>
/* Container for the entire signup form area */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  background-color: #f0f2f5; /* Light gray background */
  padding: 20px;
}

/* The form itself */
.signup-form {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Max width for a clean look */
  display: flex;
  flex-direction: column;
}

/* Style for the main heading */
.signup-form h1 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

/* Grouping for labels and inputs */
.form-group {
  margin-bottom: 15px;
  width: 100%;
}

/* Labels for inputs */
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

/* Text and password inputs */
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding doesn't affect width */
  font-size: 16px;
}

.form-group input:focus {
  border-color: #007bff; /* Highlight focus */
  outline: none;
}

/* Style for the primary submit button */
.signup-form button[type="submit"] {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.signup-form button[type="submit"]:hover {
  background-color: #0056b3;
}

/* Style for the second button (Open Login Form) */
.signup-form > div:last-child button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #6c757d; /* Different color for the secondary action */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.signup-form > div:last-child button:hover {
  background-color: #5a6268;
}

/* Optional: Basic responsive design */
@media (max-width: 480px) {
  .signup-form {
    padding: 20px;
    margin: 10px;
  }
}
</style>
