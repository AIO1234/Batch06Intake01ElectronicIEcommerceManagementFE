<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Login</h2>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" />

        <label for="password">Password:</label>
        <input type="password" id="password" />

        <button type="submit">Log In</button>
      </form>

      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  /* Max width and width for responsiveness */
  max-width: 400px;
  width: 90%;
  text-align: center;
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #333;
}

/* Styling for the form elements */
.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-content label {
  text-align: left;
  font-weight: bold;
  color: #555;
}

.modal-content input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.modal-content button[type="submit"] {
  background-color: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.modal-content button[type="submit"]:hover {
  background-color: #0056b3;
}

.modal-content button:last-child {
  margin-top: 20px;
  background-color: #6c757d; /* Secondary color */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

.modal-content button:last-child:hover {
  background-color: #5a6268;
}
</style>
