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
// Vue.prototype.$API_KEY = 'AIzaSyBjADs8e6Y7DpmrGEZ7ORevZJoaKqcdiNs';
// Vue.prototype.$API_KEY = 'AIzaSyBa6Vwqdb9C2J8hcLOXU9p3VdyEENO59hs';
Vue.prototype.$API_KEY = 'AIzaSyCItJVa9E5PmOXVkfUllr0IXF_QnBtPXLo';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
