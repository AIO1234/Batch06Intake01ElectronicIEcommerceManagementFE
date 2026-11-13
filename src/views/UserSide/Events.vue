<template>
  <div class="app-container">
    <h1>Upcoming Events</h1>
    <div class="columns-container">
      <CardComponent
        title="Event 1"
        content="This is the first event."
        color="#ffcc00"
      />
      <CardComponent
        title="Event 2"
        content="This is the second event."
        color="#66ccff"
      />
      <CardComponent
        title="Event 3"
        content="This is the third event."
        color="#ff6666"
      />
    </div>
  </div>
</template>

<script setup>
import CardComponent from "@/components/CardComponent.vue";
</script>

<style scoped>
.app-container {
  padding: 20px;
  font-family: sans-serif;
}

.columns-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

@media (max-width: 768px) {
  .columns-container {
    flex-direction: column;
  }
}
</style>
