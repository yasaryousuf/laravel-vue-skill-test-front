<template>
  <div id="app">
    <v-app>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        min-width="360px"
      >
        <div>
          <v-card class="px-4">
            <v-card-title>
              <v-icon large>
                mdi-account-outline
              </v-icon>
              <div class="text-lg-h6 py-1">
                Register
              </div>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="registerForm"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="name"
                      :rules="[rules.required]"
                      label="Name"
                      maxlength="20"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password_confirmation"
                      block
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, passwordMatch]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Confirm Password"
                      counter
                      @click:append="show1 = !show1"
                    />
                  </v-col>
                  <v-spacer />
                  <v-col
                    class="d-flex"
                    cols="12"
                    sm="3"
                    xsm="12"
                  >
                    <v-btn
                      x-large
                      block
                      :disabled="!valid"
                      color="success"
                      @click="validate"
                    >
                      Register
                    </v-btn>
                    <v-btn
                      to="/login"
                      x-large
                      color="success"
                      text
                    >
                      login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-dialog>
    </v-app>
    <v-snackbar
      v-model="snackbar.show"
    >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          :loading="loading"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>

import authApi from "@/api/auth";
import http from "@/plugins/axios";
import axios from "axios";

export default {
  data: vm => ({
    dialog: true,
    valid: true,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 6) || "Min 6 characters"
    },
    loading: false,
    snackbar: {
      multiLine: true,
      show: false,
      text: ""
    },
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.password_confirmation || "Password must match";
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    validate() {
      if (this.$refs.registerForm.validate()) {
        this.loading = true
        const credentials = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        };
        authApi.register(credentials).then(response => {
          this.$store.dispatch("userModule/putToken", response.data.data.access_token);
          this.$store.dispatch("userModule/setUser", response.data.data.user);
          this.$router.push({path: 'dashboard'});
          this.loading = false
        }).catch(error => {
          if (error.response && (error.response.status === 422 || error.response.status === 401)) {
            this.snackbar.text = error.response.data.message;
            this.loading = false
            this.snackbar.show = true;
          }
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
}
</script>
