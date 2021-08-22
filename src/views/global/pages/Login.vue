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
                mdi-account
              </v-icon>
              <div class="text-lg-h6 py-1">
                Login
              </div>
            </v-card-title>
            <v-card-text>
              <v-form
                ref="loginForm"
                v-model="valid"
                lazy-validation
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="loginEmail"
                      :rules="loginEmailRules"
                      label="E-mail"
                      required
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="loginPassword"
                      :append-icon="show1?'eye':'eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 6 characters"
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
                    align-end
                  >
                    <v-btn
                      x-large
                      :disabled="!valid"
                      color="success"
                      @click="validate"
                    >
                      Login
                    </v-btn>
                    <v-btn
                      to="/register"
                      x-large
                      color="success"
                      text
                    >
                      Register
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
    tab: 0,
    tabs: [
      {id: 1, name:"Login", icon:"mdi-account", path: '/login'},
      {id: 2, name:"Register", icon:"mdi-account-outline", path: '/register'}
    ],
    valid: true,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
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
      return () => this.password === this.verify || "Password must match";
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true
        const credentials = {
          email: this.loginEmail,
          password: this.loginPassword
        };
        authApi.login(credentials).then(response => {
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
    login() {
      this.loading = true
      if (this.$refs.form.validate()) {
        const credentials = {
          loginEmail: this.loginEmail,
          loginPassword: this.loginPassword
        };
        authApi.login(credentials).then(response => {
          this.$store.dispatch("user/putToken", response.data.access_token);
          this.$store.dispatch("user/setUser", response.data.user);
          this.$router.push({path: 'dashboard'});
          this.loading = false
        }).catch(error => {
          if (error.response && error.response.status === 422) {
            if (error.response.data.code === 522){
              this.snackbar.text = error.response.data.message;
              this.loading = false
              this.snackbar.show = true;
              setTimeout(()=>{this.snackbar.show = false; window.location.href = process.env.VUE_APP_OLD_PORTAL_URL;},2000);
            }else {
              this.snackbar.text = error.response.data.message;
              this.loading = false
              this.snackbar.show = true;
            }
          }
        });
      }
    },
  },
}
</script>
