<template>
  <div class="pl-3 pr-3 mt-1">
    <v-container class="form pa-0">
      <v-form ref="inventoryForm" v-model="isFormValid">
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
              placeholder="e.g. SKU-LAP-005"
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
              placeholder="Select Category"
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
              placeholder="Enter product name"
              :rules="[required]"
            ></v-text-field>
          </v-col>

          <!-- REQUIRED FIELD 4: Quantity -->
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
              placeholder="e.g. 25"
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
              placeholder="e.g. 45000"
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
              placeholder="Default: 5"
              hint="Leave empty if not required"
              persistent-hint
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
              placeholder="e.g. Rack A-03"
              hint="Not mandatory"
              persistent-hint
            ></v-text-field>
          </v-col>

          <!-- NOT MANDATORY (OPTIONAL) FIELD 3: Remarks / Description -->
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
              placeholder="Optional notes about batch, warranty, or supplier..."
            ></v-textarea>
          </v-col>

          <!-- Submit Button (Disabled until all required fields are valid) -->
          <v-col cols="12">
            <v-btn
              variant="none"
              block
              class="submit_button"
              :loading="showloader"
              :disabled="!isFormValid"
              @click="storeInventory()"
            >
              <span class="text">Submit</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AddInventory",
  emits: ["closeForm", "saved"],
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
        sku: "",
        product_name: "",
        category: null,
        quantity: "",
        unit_price: "",
        reorder_level: "",
        location: "",
        remarks: "",
      },
    };
  },

  methods: {
    // Required validation rule
    required(v) {
      return (v !== null && v !== undefined && String(v).trim() !== "") || "Field is required";
    },

    // Non-negative integer validation rule
    nonNegativeInteger(v) {
      return (/^\d+$/.test(String(v)) && Number(v) >= 0) || "Must be a valid quantity (0 or more)";
    },

    // Positive price validation rule
    positiveNumber(v) {
      return (!isNaN(v) && Number(v) > 0) || "Must be a valid price greater than 0";
    },

    storeInventory() {
      if (!this.isFormValid) return;
      this.showloader = true;
      const payload = {
        sku: this.form.sku.trim(),
        product_name: this.form.product_name.trim(),
        category: this.form.category,
        quantity: Number(this.form.quantity),
        unit_price: Number(this.form.unit_price),
        reorder_level: this.form.reorder_level !== "" ? Number(this.form.reorder_level) : 5,
        location: this.form.location ? this.form.location.trim() : "",
        remarks: this.form.remarks ? this.form.remarks.trim() : "",
      };
      this.showloader = false;
      this.$emit("saved", payload);
    },
  },
};
</script>
