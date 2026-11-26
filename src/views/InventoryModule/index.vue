<template>
  <div>
    <div class="text-right">
      <div class="pa-5">
        <v-btn color="primary" class="add_button" @click="openCreateForm()">
          <v-icon start>mdi-plus</v-icon>
          <span class="text">Add Inventory</span>
        </v-btn>
      </div>
    </div>

    <InventoryTable ref="inventoryTable" />

    <!-- Add Inventory Card Popup Dialog -->
    <v-dialog v-model="showForm" max-width="620px" persistent>
      <v-card class="form rounded-lg" elevation="6">
        <v-card-title class="d-flex justify-space-between align-center pa-5 bg-grey-lighten-4">
          <div>
            <span class="header text-h6">Add Inventory</span>
            <div class="text-caption text-grey-darken-1 font-weight-regular">
              Fields marked with <span class="text-red font-weight-bold">*</span> are required. Other fields are not mandatory.
            </div>
          </div>
          <v-btn icon variant="text" @click="closeAddForm" class="icon_btn">
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pt-4">
          <AddInventory
            @closeForm="closeAddForm"
            @saved="handleInventoryAdded"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Success Popup Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top right"
      timeout="3000"
    >
      <div class="d-flex align-center">
        <v-icon start>mdi-check-circle-outline</v-icon>
        <span>{{ snackbar.message }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import InventoryTable from "@/views/InventoryModule/Components/Table.vue";
import AddInventory from "@/views/InventoryModule/Components/AddInventory.vue";

export default {
  name: "InventoryModuleIndex",
  components: {
    InventoryTable,
    AddInventory,
  },

  data() {
    return {
      showForm: false,
      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
    };
  },

  methods: {
    openCreateForm() {
      this.showForm = true;
    },

    closeAddForm() {
      this.showForm = false;
    },

    handleInventoryAdded(newItem) {
      this.showForm = false;
      if (this.$refs.inventoryTable) {
        this.$refs.inventoryTable.addInventoryItem(newItem);
      }
      this.snackbar.message = "Inventory record added successfully!";
      this.snackbar.color = "success";
      this.snackbar.show = true;
    },
  },
};
</script>
