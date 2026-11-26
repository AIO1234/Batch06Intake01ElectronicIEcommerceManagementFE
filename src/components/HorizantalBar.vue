<template>
  <!-- Top Horizontal Header Bar Component -->
  <v-card elevation="1" class="pa-4 card rounded-lg">
    <v-row align="center" no-gutters>
      <!-- Left Section: Shows "Welcome...!" only on Dashboard; shows Module Title on all other pages -->
      <v-col cols="8" md="9">
        <h2
          v-if="$route.path === '/admin/dashboard'"
          class="welcome-header-title mb-0"
        >
          Welcome...!
        </h2>
        <span v-else class="text-subtitle-1 font-weight-semibold text-grey-darken-3">
          {{ $route.meta.pageTitle || "CARTEL Inventory Management" }}
        </span>
      </v-col>

      <!-- Right Section: Logged-in User Profile Info & Account Menu -->
      <v-col cols="4" md="3" class="d-flex justify-end align-center ga-3">
        <div class="text-right">
          <span class="font-weight-bold">Test User</span>
          <br />
          <span class="role_text text-caption text-grey-darken-1">Admin</span>
        </div>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-account" color="primary" variant="tonal" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/admin/dashboard')">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "HorizantalBar",
};
</script>

<style scoped>
.welcome-header-title {
  color: #1d63dc;
  font-family: "Inter", "Urbanist", sans-serif;
  font-size: 28px;
  font-weight: 700;
}
</style>
