<template>
  <component :is="layout"></component>
</template>
<script>

const defaultLayout = "default-layout";
export default {
  name: 'App',
  data: () => ({
    //changed
  }),
  computed: {
    layout() {
      return this.$route.meta.layout || defaultLayout;
    }
  }
};
</script>
