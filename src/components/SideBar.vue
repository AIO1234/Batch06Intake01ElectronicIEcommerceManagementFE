<template>
  <!-- changes -->
  <v-app-bar-nav-icon
    @click.stop="drawer = !drawer"
    style="color: #111827"
  ></v-app-bar-nav-icon>
  <v-navigation-drawer v-model="drawer" temporary style="height: 100%">
    <v-list density="compact" nav>
      <!-- Home -->
      <v-list-item
        active-class="ative_color"
        prepend-icon="mdi-home-account"
        title="Dashboard"
        value="Dashboard"
        @click="$router.push('/admin/dashboard')"
      >
      </v-list-item>
      <!-- users -->
      <v-list-item
        active-class="ative_color"
        prepend-icon="mdi-account-tie"
        title="Users"
        value="Users"
        @click="$router.push('/admin/users')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    GotoLeavePage() {
      // route home page
      this.$router.push({ name: "leaves" });
    },
  },
};
</script>
