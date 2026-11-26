<template>
  <div class="pl-3 pr-3 mt-1 category">
    <v-container class="form pa-0">
      <v-form v-model="isFormValid">
        <v-row>
          <!-- REQUIRED FIELD 1: SKU Code -->
          <v-col lg="6" md="6" cols="12">
            <label class="label">
              SKU / Item Code <span class="text-red">*</span>
              <span class="text-caption text-red ml-1">(Required)</span>
            </label>
            <div class="mt-2"></div>
            <v-text-field
              v-model="form.sku"
              variant="outlined"
              density="comfortable"
              :rules="[required]"
            ></v-text-field>
          </v-col>

          <!-- REQUIRED FIELD 2: Category -->
          <v-col lg="6" md="6" cols="12">
            <label class="label">
              Category <span class="text-red">*</span>
              <span class="text-caption text-red ml-1">(Required)</span>
            </label>
            <div class="mt-2"></div>
            <v-select
              v-model="form.category"
              :items="categoryOptions"
              variant="outlined"
              density="comfortable"
              :rules="[required]"
            ></v-select>
          </v-col>

          <!-- REQUIRED FIELD 3: Product Name -->
          <v-col lg="12" cols="12">
            <label class="label">
              Product / Item Name <span class="text-red">*</span>
              <span class="text-caption text-red ml-1">(Required)</span>
            </label>
            <div class="mt-2"></div>
            <v-text-field
              v-model="form.product_name"
              variant="outlined"
              density="comfortable"
              :rules="[required]"
            ></v-text-field>
          </v-col>

          <!-- REQUIRED FIELD 4: Stock Quantity -->
          <v-col lg="6" md="6" cols="12">
            <label class="label">
              Stock Quantity <span class="text-red">*</span>
              <span class="text-caption text-red ml-1">(Required)</span>
            </label>
            <div class="mt-2"></div>
            <v-text-field
              v-model="form.quantity"
              type="number"
              variant="outlined"
              density="comfortable"
              :rules="[required, nonNegativeInteger]"
            ></v-text-field>
          </v-col>

          <!-- REQUIRED FIELD 5: Unit Price -->
          <v-col lg="6" md="6" cols="12">
            <label class="label">
              Unit Price (Rs.) <span class="text-red">*</span>
              <span class="text-caption text-red ml-1">(Required)</span>
            </label>
            <div class="mt-2"></div>
            <v-text-field
              v-model="form.unit_price"
              type="number"
              variant="outlined"
              density="comfortable"
              :rules="[required, positiveNumber]"
            ></v-text-field>
          </v-col>

          <!-- NOT MANDATORY (OPTIONAL) FIELD 1: Reorder Level -->
          <v-col lg="6" md="6" cols="12">
            <label class="label">
              Reorder Alert Level
              <span class="text-caption text-grey-darken-1 font-weight-regular ml-1">
                (Optional / Not Mandatory)
              </span>
            </label>
            <div class="mt-2"></div>
            <v-text-field
              v-model="form.reorder_level"
              type="number"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>

          <!-- NOT MANDATORY (OPTIONAL) FIELD 2: Warehouse Location -->
          <v-col lg="6" md="6" cols="12">
            <label class="label">
              Warehouse / Rack Location
              <span class="text-caption text-grey-darken-1 font-weight-regular ml-1">
                (Optional / Not Mandatory)
              </span>
            </label>
            <div class="mt-2"></div>
            <v-text-field
              v-model="form.location"
              variant="outlined"
              density="comfortable"
            ></v-text-field>
          </v-col>

          <!-- NOT MANDATORY (OPTIONAL) FIELD 3: Remarks -->
          <v-col lg="12" cols="12">
            <label class="label">
              Remarks / Description
              <span class="text-caption text-grey-darken-1 font-weight-regular ml-1">
                (Optional / Not Mandatory)
              </span>
            </label>
            <div class="mt-2"></div>
            <v-textarea
              v-model="form.remarks"
              variant="outlined"
              density="comfortable"
              rows="2"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-btn
              variant="none"
              block
              class="update_button"
              :loading="showloader"
              :disabled="!isFormValid"
              @click="updateInventory()"
            >
              <span class="text">Update</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UpdateInventory",
  props: {
    selectedItem: Object,
  },
  emits: ["closeModal", "updated"],
  data() {
    return {
      isFormValid: false,
      showloader: false,
      categoryOptions: [
        "Laptops & Computers",
        "Monitors & Displays",
        "Computer Accessories",
        "Audio & Headphones",
        "Smartphones & Tablets",
        "Networking & Storage",
      ],
      form: {
        id: null,
        sku: "",
        product_name: "",
        category: "",
        quantity: 0,
        unit_price: 0,
        reorder_level: 5,
        location: "",
        remarks: "",
      },
    };
  },

  created() {
    if (this.selectedItem) {
      this.form.id = this.selectedItem.id;
      this.form.sku = this.selectedItem.sku;
      this.form.product_name = this.selectedItem.product_name;
      this.form.category = this.selectedItem.category;
      this.form.quantity = this.selectedItem.quantity;
      this.form.unit_price = this.selectedItem.unit_price;
      this.form.reorder_level = this.selectedItem.reorder_level ?? "";
      this.form.location = this.selectedItem.location || "";
      this.form.remarks = this.selectedItem.remarks || "";
    }
  },

  methods: {
    required(v) {
      return (v !== null && v !== undefined && String(v).trim() !== "") || "Field is required";
    },
    nonNegativeInteger(v) {
      return (/^\d+$/.test(String(v)) && Number(v) >= 0) || "Must be a valid quantity (0 or more)";
    },
    positiveNumber(v) {
      return (!isNaN(v) && Number(v) > 0) || "Must be a valid price greater than 0";
    },
    updateInventory() {
      if (!this.isFormValid) return;
      this.showloader = true;
      const updated = {
        id: this.form.id,
        sku: String(this.form.sku).trim(),
        product_name: String(this.form.product_name).trim(),
        category: this.form.category,
        quantity: Number(this.form.quantity),
        unit_price: Number(this.form.unit_price),
        reorder_level: this.form.reorder_level !== "" ? Number(this.form.reorder_level) : 5,
        location: this.form.location ? String(this.form.location).trim() : "",
        remarks: this.form.remarks ? String(this.form.remarks).trim() : "",
      };
      this.showloader = false;
      this.$emit("updated", updated);
    },
  },
};
</script>
