import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './plugins/axios'
import VMask from 'v-mask';
import store from './store';

Vue.config.productionTip = false;

store.dispatch('restoreUser');

Vue.use(Toast);
Vue.use(VMask);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app');

