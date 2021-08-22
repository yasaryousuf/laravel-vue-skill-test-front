<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].background}">
    <router-view />
  </v-app>
</template>
<script>

export default {
  name: "AuthLayout",
  data: () => ({
  }),
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
