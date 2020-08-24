import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: '',
    apiKey: localStorage.getItem('apikey'),
    titles: '',
    isAudit: ''  //是否是审计账户
  },
  mutations: {
    login(state, data) {
      state.login = data;
    },
    setApi(state, data) {
      state.apiKey = data;
    },
    setHeaderTitle(state, data) {
      state.titles = data;
    },
    //是否是审计账户
    fnAudit(state, data) {
      state.isAudit = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
