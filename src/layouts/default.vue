<template>
  <!-- Main Admin Layout: Displays the left CARTEL Sidebar, top Horizontal Header Bar, and dynamic Router View -->
  <v-app>
    <!-- Left Navigation Sidebar Component -->
    <SideBar />

    <!-- Main Right-Side Content Area -->
    <v-main class="cartel-main-layout">
      <div class="horizantal_paddings pt-4 horizantal px-6">
        <!-- Top Header Bar (Shows "Welcome...!" on Dashboard, and Page Title on other modules) -->
        <HorizantlBar />

        <div class="mt-6"></div>

        <!-- Module Page Heading (Hidden on Dashboard so "Welcome...!" is not duplicated) -->
        <h2 v-if="$route.path !== '/admin/dashboard'" class="page-heading">
          {{ $route.meta.pageTitle }}
        </h2>

        <!-- Dynamic Child Route Content -->
        <div class="content mt-4">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HorizantlBar from "@/components/HorizantalBar.vue";

export default {
  name: "DefaultLayout",
  components: {
    SideBar,
    HorizantlBar,
  },
};
</script>

<style lang="scss" scoped>
.cartel-main-layout {
  background-color: #f4f5f7;
  min-height: 100vh;
}
.page-heading {
  font-family: "Inter", "Urbanist", sans-serif;
  font-weight: 700;
  color: #111827;
}
</style>
