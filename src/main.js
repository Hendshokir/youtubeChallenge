import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from "./store/store";

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

//global variables
Vue.prototype.$ITEM_PER_PAGE = 10;
Vue.prototype.$BASE_URL = 'https://www.googleapis.com/youtube/v3/';
Vue.prototype.$API_KEY = 'AIzaSyBYoMKu6mYSaQ2nJaGsKxunoNKyxt90qf8';

Vue.filter('formatNumber', function (num) {
  if (num !== undefined && num !== null) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})

Vue.filter('formatLargeText', function (string) {
  if (string !== undefined && string !== null) {
    return `${string.substring(0,500)} ...`;
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
