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
    <div>
      <Footer />
    </div>
  </v-app>
</template>
<script>
import Footer from "@/components/Footer.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  components: {
    Footer,
    HeaderComponent,
  },
};
</script>
<style lang="scss" scoped></style>
