<template>
  <v-app>
    <div>
      <HeaderComponent />
    </div>

    <div class="pt-15"></div>

    <div class="pt-5"></div>

    <div>
      <router-view />
    </div>

    <div class="pt-15"></div>
  </v-app>
</template>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    HeaderComponent,
  },
};
</script>
<style lang="scss" scoped></style>
