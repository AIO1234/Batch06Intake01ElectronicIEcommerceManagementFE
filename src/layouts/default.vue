<template>
  <v-app>
    <div>
      <v-row>
        <v-col lg="2" md="2" cols="12"> <SideBar /></v-col>
        <v-col lg="10" md="10" cols="12"> </v-col>
      </v-row>
    </div>
  </v-app>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    SideBar,
  },
};
</script>
<style lang="scss" scoped></style>
