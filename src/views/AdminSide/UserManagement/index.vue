<template>
  <div class="text-right">
    <div class="pa-5">
      <v-btn color="primary" class="add_button" @click="openCreateForm()">
        <span class="text">Add User</span>
      </v-btn>
    </div>
  </div>

  <UserTable ref="userTable" />

  <v-dialog v-model="showForm" max-width="500px" persistent>
    <v-card class="form">
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="header">Add User</span>
        <v-btn icon @click="closeAddForm" class="icon_btn">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <AddUser @closeForm="closeAddForm" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import UserTable from "@/views/AdminSide/UserManagement/Components/Table.vue";
import AddUser from "@/views/AdminSide/UserManagement/Components/AddUser.vue";

export default {
  components: {
    UserTable,
    AddUser,
  },

  data() {
    return {
      showForm: false,
      allusers: [],
    };
  },

  created() {},

  methods: {
    openCreateForm() {
      this.showForm = true;
    },

    closeAddForm() {
      this.showForm = false;
      this.$refs.userTable.getUsers();
    },
  },
};
</script>
