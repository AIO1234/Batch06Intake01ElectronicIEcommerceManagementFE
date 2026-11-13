<template>
  <div class="pl-5 pr-5 mt-1 category">
    <v-container class="form">
      <v-form v-model="isFormValid">
        <v-row>
          <v-col lg="12" cols="12">
            <label class="label">User Name</label>
            <div class="mt-2"></div>
            <v-text-field
              class="input"
              variant="outlined"
              v-model="form.name"
              :rules="[required]"
            ></v-text-field>
          </v-col>

          <v-col lg="12" cols="12">
            <label class="label">Email</label>
            <div class="mt-2"></div>
            <v-text-field
              class="input"
              variant="outlined"
              v-model="form.email"
              :rules="[required, email]"
            ></v-text-field>
          </v-col>

          <v-col lg="12" cols="12">
            <label class="label">Password (Leave blank to keep current)</label>
            <div class="mt-2"></div>
            <v-text-field
              class="input"
              variant="outlined"
              v-model="form.password"
              type="password"
            ></v-text-field>
          </v-col>

          <v-col lg="12" cols="12">
            <label class="label">Confirm Password</label>
            <div class="mt-2"></div>
            <v-text-field
              class="input"
              variant="outlined"
              v-model="form.password_confirmation"
              type="password"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-btn
              variant="none"
              block
              class="update_button"
              :loading="showloader"
              @click="updateUser()"
              :disabled="!isFormValid"
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
  data() {
    return {
      form: {
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      showloader: false,
      isFormValid: false,
    };
  },

  props: {
    selectedItem: Object,
  },

  created() {
    this.form.id = this.selectedItem.id;
    this.form.name = this.selectedItem.name;
    this.form.email = this.selectedItem.email;
  },

  methods: {
    // required
    required(v) {
      return !!v || "Field is required";
    },

    // emaiil
    email(v) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(v) || "Invalid email";
    },

   
  },
};
</script>
