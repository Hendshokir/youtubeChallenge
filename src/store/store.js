
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters"
import mutations from "./mutations"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchKey: 'spongebob',
    searchLoading: false,
    searchResult: '',
    searchRequestStatus: true // true: indicate for success status, otherwise false
  },
  getters: getters,
  mutations: mutations,
  actions: {
  },
});
