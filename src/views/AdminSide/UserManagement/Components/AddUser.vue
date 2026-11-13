<template>
  <div class="pl-5 pr-5 mt-1">
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
            <label class="label">Password</label>
            <div class="mt-2"></div>
            <v-text-field
              class="input"
              variant="outlined"
              v-model="form.password"
              type="password"
              :rules="[required]"
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
              :rules="[required]"
            ></v-text-field>
          </v-col>

          <v-col>
            <v-btn
              variant="none"
              block
              class="submit_button"
              @click="storeUser()"
              :loading="showloader"
              :disabled="!isFormValid"
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
  data() {
    return {
      isFormValid: false,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      showloader: false,
    };
  },

  methods: {
    // required validation
    required(v) {
      return !!v || "Field is required";
    },

    // email validation
    email(v) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(v) || "Invalid email";
    },

    // store user 
    // async storeUser() {
    //   this.showloader = true;
    //   await userService.createUser(this.form);
    //   this.showloader = false;
    //   this.$emit("closeForm", false);
    // },
  },
};
</script>
