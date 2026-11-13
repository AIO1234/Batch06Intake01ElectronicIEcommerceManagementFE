<template>
  <!-- mobile header -->
  <div class="mobileview">
    <div>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        style="color: #111827"
      ></v-app-bar-nav-icon>
      <v-navigation-drawer v-model="drawer" temporary style="height: 100%" color="#111827">
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="Dashboard"
            @click="$router.push('/dashboard')"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-account-group"
            title="Customers"
            value="Customers"
            @click="$router.push('/customers')"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-badge-account"
            title="Employees"
            value="Employees"
            @click="$router.push('/employees')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-calendar-check"
            title="Booking & Reservations"
            value="Booking & Reservations"
            @click="$router.push('/bookings')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-car-multiple"
            title="Vehicle Management"
            value="Vehicle Management"
            @click="$router.push('/vehicles')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cash-multiple"
            title="Payment"
            value="Payment"
            @click="$router.push('/payments')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-car-wrench"
            title="Vehicle Maintenance"
            value="Vehicle Maintenance"
            @click="$router.push('/maintenance')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-file-chart"
            title="Reports"
            value="Reports"
            @click="$router.push('/reports')"
          ></v-list-item>
          
        </v-list>
      </v-navigation-drawer>
    </div>
  </div>
  <!-- web header -->
  <div class="webview">
    <v-app-bar :elevation="0" color="#111827">
      <v-row>
        <v-col lg="5" md="2" sm="2" class="ml-10">
          <v-img
            width="50px"
            src="@/assets/images/360_F_90672947_9o36fMzvYpFoS2cvgxACFUR0wleV5Yq5.jpg"
          ></v-img>
        </v-col>

        <v-col lg="6" md="8" sm="9" class="header_paddings">
          <v-row>
            <div>
              <v-list-item @click="$router.push('/dashboard')" class="ml-10">
                Dashboard</v-list-item
              >
            </div>

            <div>
              <v-list-item @click="$router.push('/settings')" class="ml-10">
                Settings</v-list-item
              >
            </div>

            <div>
              <v-list-item @click="$router.push('/profile')" class="ml-10">
                Profile</v-list-item
              >
            </div>

            <div>
              <v-list-item @click="$router.push('/shoppingcart')" class="ml-8">
                <v-img width="35px" src="@/assets/images/1325.png"></v-img
              ></v-list-item>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.header_paddings {
  padding-left: 10%;
  padding-top: 21px;
  @media screen and (min-width: 768px) and (max-width: 1366px) {
    padding-left: 4%;
    padding-top: 21px;
  }
}
</style>