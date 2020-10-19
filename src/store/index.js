import Vue from "vue";
import Vuex from "vuex";
import Web3 from "web3";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: new Web3(Web3.givenProvider || "http://localhost:8545"),
    votingContract: false,
    initialized: false,
    userAddress: false,
    votingOpen: true,
    hasVoted: false,
    candidates: []
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
    setVotingOpen(state, isVotingOpen) {
      state.votingOpen = isVotingOpen;
    },
    setHasVoted(state, hasVoted) {
      state.hasVoted = hasVoted;
    },
    setCandidates(state, candidates) {
      state.candidates = candidates;
    }
  },
  actions: {},
  modules: {},
});
