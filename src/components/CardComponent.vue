<template>
  <div class="card" :style="{ backgroundColor: color }">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script setup>
//  props that the parent component will pass down
const props = defineProps({
  title: String,
  content: String,
  color: String,
});

// Define a simple method
const handleClick = () => {
  alert(`You clicked the card titled "${props.title}"`);
};
</script>

<style scoped>
.card {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  text-align: center;
  transition: transform 0.2s;
  min-width: 0;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-top: 0;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: white;
  color: #333;
  cursor: pointer;
}
</style>
