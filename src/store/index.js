import Vue from "vue";
import Vuex from "vuex";
import Web3 from "web3";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: new Web3(Web3.givenProvider || "http://localhost:8545"),
    votingContract: false,
    votingContractAddress: "0x8c2A3bF275F516d79FEb72b04E97c7FBE3bFA938",
    initialized: false,
    userAddress: false,
    hasVoted: false,
  },
  mutations: {
    setInitialized(state, initialized) {
      state.initialized = initialized;
    },
    setContract(state, contract) {
      state.votingContract = contract;
    },
    setAddress(state, address) {
      state.userAddress = address;
    },
    setHasVoted(state, hasVoted) {
      state.hasVoted = hasVoted;
    },
  },
  actions: {},
  modules: {},
});
