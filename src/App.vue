<template>
  <v-app>
    <HeaderApp />

    <v-main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import HeaderApp from './components/HeaderApp.vue';

export default {
  name: 'App',

  components: {
    HeaderApp,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.v-list-item-title {
  text-decoration: none !important;
}

/* Exemplo de transição de fade */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
