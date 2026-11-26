<template>
  <div>
    <v-container>
      <div class="mt-4"></div>
      <v-card class="pa-5 rounded-lg" elevation="3">
        <v-data-table :items="items" :headers="headers" :loading="loading">
          <template
            v-for="header in headers"
            :key="header.value"
            v-slot:[`item.${header.value}`]="props"
          >
            <div v-if="header.value === 'sku'" class="font-weight-bold text-primary">
              {{ props.item.sku }}
            </div>

            <div v-if="header.value === 'product_name'" class="font-weight-medium">
              {{ props.item.product_name }}
            </div>

            <div v-if="header.value === 'category'">
              {{ props.item.category }}
            </div>

            <div v-if="header.value === 'quantity'">
              <span class="font-weight-bold">{{ props.item.quantity }}</span> Units
            </div>

            <div v-if="header.value === 'unit_price'">
              Rs. {{ Number(props.item.unit_price).toLocaleString("en-LK", { minimumFractionDigits: 2 }) }}
            </div>

            <div v-if="header.value === 'location'">
              <span v-if="props.item.location">{{ props.item.location }}</span>
              <span v-else class="text-grey font-italic">Not Specified</span>
            </div>

            <div v-if="header.value === 'status'">
              <v-chip
                size="small"
                :color="getStatusColor(props.item)"
                variant="flat"
                class="font-weight-bold"
              >
                {{ getStatusText(props.item) }}
              </v-chip>
            </div>

            <div v-if="header.value === 'action'" class="d-flex align-center ga-2 py-2">
              <v-btn
                size="small"
                style="text-transform: capitalize"
                color="info"
                @click="openViewDialog(props.item)"
              >
                View
              </v-btn>

              <v-btn
                size="small"
                style="text-transform: capitalize"
                color="success"
                @click="openEditForm(props.item)"
              >
                Edit
              </v-btn>

              <v-btn
                size="small"
                style="text-transform: capitalize"
                color="red"
                @click="openDeleteDialog(props.item)"
              >
                Delete
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <!-- View Inventory Card Popup Dialog -->
    <v-dialog v-model="showViewDialog" max-width="520px">
      <v-card class="form rounded-lg" elevation="6">
        <v-card-title class="d-flex justify-space-between align-center pa-5 bg-grey-lighten-4">
          <span class="header text-h6">Inventory Item Details</span>
          <v-btn icon variant="text" @click="showViewDialog = false" class="icon_btn">
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-5">
          <v-row dense>
            <v-col cols="6" class="mb-3">
              <div class="text-caption text-grey-darken-1">SKU Code</div>
              <div class="font-weight-bold text-body-1 text-primary">{{ selectedItem.sku }}</div>
            </v-col>
            <v-col cols="6" class="mb-3">
              <div class="text-caption text-grey-darken-1">Status</div>
              <v-chip size="small" :color="getStatusColor(selectedItem)" variant="flat">
                {{ getStatusText(selectedItem) }}
              </v-chip>
            </v-col>
            <v-col cols="12" class="mb-3">
              <div class="text-caption text-grey-darken-1">Product Name</div>
              <div class="font-weight-bold text-body-1">{{ selectedItem.product_name }}</div>
            </v-col>
            <v-col cols="6" class="mb-3">
              <div class="text-caption text-grey-darken-1">Category</div>
              <div class="font-weight-medium">{{ selectedItem.category }}</div>
            </v-col>
            <v-col cols="6" class="mb-3">
              <div class="text-caption text-grey-darken-1">Unit Price</div>
              <div class="font-weight-bold">
                Rs. {{ Number(selectedItem.unit_price || 0).toLocaleString("en-LK", { minimumFractionDigits: 2 }) }}
              </div>
            </v-col>
            <v-col cols="6" class="mb-3">
              <div class="text-caption text-grey-darken-1">Stock Quantity</div>
              <div class="font-weight-bold">{{ selectedItem.quantity }} Units</div>
            </v-col>
            <v-col cols="6" class="mb-3">
              <div class="text-caption text-grey-darken-1">Reorder Level (Optional)</div>
              <div>{{ selectedItem.reorder_level || "10" }} Units</div>
            </v-col>
            <v-col cols="12" class="mb-3">
              <div class="text-caption text-grey-darken-1">Warehouse / Rack Location (Optional)</div>
              <div>{{ selectedItem.location || "Not Specified" }}</div>
            </v-col>
            <v-col cols="12">
              <div class="text-caption text-grey-darken-1">Remarks / Notes (Optional)</div>
              <div>{{ selectedItem.remarks || "No additional remarks" }}</div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4 justify-end">
          <v-btn color="primary" variant="flat" @click="showViewDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Edit Inventory Card Popup Dialog -->
    <v-dialog v-model="showEditForm" max-width="620px" persistent>
      <v-card class="form rounded-lg" elevation="6">
        <v-card-title class="d-flex justify-space-between align-center pa-5 bg-grey-lighten-4">
          <div>
            <span class="header text-h6">Edit Inventory</span>
            <div class="text-caption text-grey-darken-1 font-weight-regular">
              Fields marked with <span class="text-red font-weight-bold">*</span> are required. Other fields are not mandatory.
            </div>
          </div>
          <v-btn icon variant="text" @click="closeEditForm" class="icon_btn">
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pt-4">
          <UpdateInventory
            :selectedItem="selectedItem"
            @closeModal="closeEditForm"
            @updated="handleUpdateInventory"
          />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Popup Dialog (Inside Table.vue as Tutor Instructed) -->
    <v-dialog v-model="showDeleteDialog" max-width="440px" persistent>
      <v-card class="form rounded-lg pa-2" elevation="6">
        <v-card-title class="d-flex justify-space-between align-center">
          <span class="header text-h6 text-red">Delete Inventory Item</span>
          <v-btn icon variant="text" @click="showDeleteDialog = false" class="icon_btn">
            <v-icon color="grey-darken-1">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-2 pb-4 text-body-1">
          Are you sure you want to delete
          <strong>{{ selectedItem.product_name }}</strong>
          (SKU: <strong>{{ selectedItem.sku }}</strong>) from inventory?
        </v-card-text>
        <v-card-actions class="justify-end ga-2 px-4 pb-4">
          <v-btn
            variant="outlined"
            color="grey-darken-1"
            style="text-transform: capitalize"
            @click="showDeleteDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="flat"
            color="red"
            style="text-transform: capitalize"
            @click="confirmDeleteInventory()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import UpdateInventory from "@/views/InventoryModule/Components/UpdateInventory.vue";

export default {
  name: "InventoryTable",
  components: {
    UpdateInventory,
  },

  data() {
    return {
      loading: false,
      showViewDialog: false,
      showEditForm: false,
      showDeleteDialog: false,
      selectedItem: {},
      headers: [
        { title: "SKU Code", value: "sku" },
        { title: "Product Name", value: "product_name" },
        { title: "Category", value: "category" },
        { title: "Quantity", value: "quantity" },
        { title: "Unit Price", value: "unit_price" },
        { title: "Location (Optional)", value: "location" },
        { title: "Status", value: "status" },
        { title: "Action", value: "action" },
      ],
      items: [
        {
          id: 1,
          sku: "SKU-LAP-001",
          product_name: "ASUS ROG Strix G16 Gaming Laptop",
          category: "Laptops & Computers",
          quantity: 18,
          unit_price: 425000,
          reorder_level: 5,
          location: "Rack A-01 (Colombo Main)",
          remarks: "Fast-moving gaming laptop batch",
        },
        {
          id: 2,
          sku: "SKU-MON-002",
          product_name: "Samsung 27\" Odyssey G5 Curved Monitor",
          category: "Monitors & Displays",
          quantity: 4,
          unit_price: 98500,
          reorder_level: 8,
          location: "Rack B-04",
          remarks: "Low stock - reorder scheduled",
        },
        {
          id: 3,
          sku: "SKU-ACC-003",
          product_name: "Logitech MX Master 3S Wireless Mouse",
          category: "Computer Accessories",
          quantity: 35,
          unit_price: 34500,
          reorder_level: 10,
          location: "Rack C-02",
          remarks: "",
        },
        {
          id: 4,
          sku: "SKU-AUD-004",
          product_name: "Sony WH-1000XM5 Noise Canceling Headphones",
          category: "Audio & Headphones",
          quantity: 0,
          unit_price: 118000,
          reorder_level: 5,
          location: "",
          remarks: "Awaiting next shipment",
        },
      ],
    };
  },

  async created() {
    await this.getInventory();
  },

  methods: {
    async getInventory() {
      // Sample data loaded for frontend demonstration before backend API connection
      this.loading = false;
    },

    getStatusText(item) {
      const qty = Number(item.quantity || 0);
      const reorder = Number(item.reorder_level || 5);
      if (qty <= 0) return "Out of Stock";
      if (qty <= reorder) return "Low Stock";
      return "In Stock";
    },

    getStatusColor(item) {
      const qty = Number(item.quantity || 0);
      const reorder = Number(item.reorder_level || 5);
      if (qty <= 0) return "red";
      if (qty <= reorder) return "orange-darken-2";
      return "green-darken-1";
    },

    addInventoryItem(newItem) {
      const nextId = this.items.length
        ? Math.max(...this.items.map((i) => i.id)) + 1
        : 1;
      this.items.unshift({
        id: nextId,
        ...newItem,
      });
    },

    openViewDialog(item) {
      this.selectedItem = { ...item };
      this.showViewDialog = true;
    },

    openEditForm(item) {
      this.selectedItem = { ...item };
      this.showEditForm = true;
    },

    closeEditForm() {
      this.showEditForm = false;
    },

    handleUpdateInventory(updatedItem) {
      const index = this.items.findIndex((i) => i.id === updatedItem.id);
      if (index !== -1) {
        this.items.splice(index, 1, { ...updatedItem });
      }
      this.showEditForm = false;
    },

    openDeleteDialog(item) {
      this.selectedItem = { ...item };
      this.showDeleteDialog = true;
    },

    confirmDeleteInventory() {
      this.items = this.items.filter((i) => i.id !== this.selectedItem.id);
      this.showDeleteDialog = false;
    },
  },
};
</script>
