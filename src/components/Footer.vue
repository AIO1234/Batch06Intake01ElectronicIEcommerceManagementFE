<template>
  <footer>
    <p>
      Author: Nilupul<br />
      <a href="mailto:jane@example.com">nilupul@example.com</a>
    </p>
    <p>&copy; 2025 Example Company. All rights reserved.</p>
  </footer>
</template>

<script setup></script>

<style scoped>
footer {
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
}

footer a {
  color: #00d4ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

footer a:hover {
  color: #ffffff;
  text-decoration: underline;
}

footer p {
  margin: 10px 0;
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
