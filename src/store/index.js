import Vue from "vue";
import Vuex from "vuex";
import Web3 from "web3";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: new Web3(Web3.givenProvider || "http://localhost:8545"),
    count: 0,
  },
  mutations: {},
  actions: {},
  modules: {},
});
