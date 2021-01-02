<template>
  <div class="app">
    <Menu></Menu>
    <Services></Services>
    <Service></Service>
    
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import Services from './components/Services.vue';
import Service from './components/Service.vue';

export default {
  components: {
    Menu,
    Services,
    Service
  },
  data() {return{r: false}},
  watch: {
    $route: function() {
      console.log(this.$route);
    }
  }
  
}
</script>

<style lang="scss">
@import './assets/_variables.scss';

html, body {
  margin: 0;
  font-family: $font-prm;
  user-select: none;
  overflow: hidden;
  letter-spacing: .2px;
  background-color: $color-background;
}

.app {
  display: flex;
  overflow: hidden;
  width: 100vw;
}
</style>
