<template>
  <div>
    <v-container>
      <div class="mt-10"></div>
      <v-card class="pa-5" elevation="3">
        <v-data-table :items="items" :headers="headers" :loading="loading">
          <template
            v-for="header in headers"
            :key="header.value"
            v-slot:[`item.${header.value}`]="props"
          >
            <div v-if="header.value === 'name'">
              {{ props.item.name }}
            </div>

            <div v-if="header.value === 'email'">
              {{ props.item.email }}
            </div>

            <v-row v-if="header.value === 'action'">
              <v-col lg="3">
                <v-btn
                  style="text-transform: capitalize"
                  color="success"
                  @click="openEditForm(props.item)"
                >
                  Edit
                </v-btn>
              </v-col>
              &nbsp;&nbsp;&nbsp;
              <v-col lg="3">
                <v-btn
                  style="text-transform: capitalize"
                  color="red"
                  @click="deleteUser(props.item.id)"
                >
                  Delete
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <v-dialog v-model="showEditForm" max-width="500px" persistent>
      <v-card class="form">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="header">Edit User</span>
          <v-btn icon @click="closeEditForm" class="icon_btn">
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <UpdateUser
            :selectedItem="selectedItem"
            @closeModal="closeEditForm"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UpdateUser from "@/views/AdminSide/UserManagement/Components/UpdateUser.vue";

export default {
  props: {
    items: Array,
  },
  components: {
    UpdateUser,
  },

  data() {
    return {
      items: [],
      loading: false,
      showEditForm: false,
      selectedItem: {},
      headers: [
        { title: "User Name", value: "name" },
        { title: "Email", value: "email" },
        { title: "Action", value: "action" },
      ],
    };
  },

  async created() {
    await this.getUsers();
  },

  methods: {
    // get users
    // async getUsers() {
    //   this.loading = true;
    //   const response = await userService.getAllUsers();
    //   this.items = response.data;
    //   this.loading = false;
    // },

    // open edit form
    openEditForm(item) {
      this.selectedItem = item;
      this.showEditForm = true;
    },

    // close edit form
    closeEditForm() {
      this.showEditForm = false;
      this.getUsers();
    },
  },
};
</script>
