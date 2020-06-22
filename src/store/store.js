
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters"
import mutations from "./mutations"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchKey: '',
    searchLoading: false,
    searchResult: '',
    searchRequestStatus: true, // true: indicate for success status, otherwise false
    searchFilter: {
      order: 'relevance'
    }
  },
  getters: getters,
  mutations: mutations,
  actions: {
  },
});
