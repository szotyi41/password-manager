<template>
  <div class="app">
    <Menu></Menu>
    <Services></Services>
    <Service v-if="currentService"></Service>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Services from "./components/Services.vue";
import Service from "./components/Service.vue";
import { mapState } from "vuex";

export default {
  components: {
    Menu,
    Services,
    Service,
  },
  computed: {
    ...mapState("service", ["currentService"]),
  },
  watch: {
    $route: function () {
      console.log(this.$route);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";
@import "@/assets/stylesheets/multiselect.scss";

html,
body {
  margin: 0;
  font-family: $font-prm;
  user-select: none;
  overflow: hidden;
  letter-spacing: 0.2px;
  background-color: $color-background;
}

.app {
  display: flex;
  overflow: hidden;
  width: 100vw;
}
</style>
