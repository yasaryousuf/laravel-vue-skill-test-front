<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />

      <v-btn
        @click="signOut"
        text
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col cols="12">
          <h1>Dashboard</h1>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import userApi from "@/api/User";

export default {
  name: "Dashboard",

  data: () => ({
    //
  }),
  methods: {
    signOut: function () {
      userApi.logout().then(() => {
        this.$store.commit('userModule/LOG_OUT');
        this.$router.push({path: '/login'});
      });
    },
  }
}
</script>

<style scoped>

</style>