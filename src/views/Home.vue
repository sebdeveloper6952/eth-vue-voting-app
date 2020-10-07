<template>
  <div class="container">
    <section class="section">
      <div class="container">
        <b-loading
          :is-full-page="true"
          v-model="isInitialized"
          :can-cancel="false"
        ></b-loading>
      </div>
      <div class="container">
        <h1>Your address: {{ $store.state.userAddress }}</h1>
      </div>
      <div class="container">
        <h1>
          {{
            $store.state.hasVoted
              ? "You have already voted!"
              : "Ready to cast your vote?"
          }}
        </h1>
      </div>
    </section>
  </div>
</template>

<script>
import Voting from "../abi/Voting.json";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      isLoading: false,
    };
  },
  beforeMount() {
    this.initialize();
  },
  methods: {
    async initializeContract() {
      const web3 = this.$store.state.web3;
      const contract = new web3.eth.Contract(
        Voting.abi,
        Voting.networks[5777].address
      );

      this.$store.commit("setContract", contract);
    },
    async fetchAddressVotingState(address) {
      await this.$store.state.votingContract.methods.voters(address).call();
    },
    async fetchAccounts() {
      const accounts = await this.$store.state.web3.eth.requestAccounts();
      this.$store.commit("setAddress", accounts[0]);
    },
    async initialize() {
      await this.fetchAccounts();
      await this.initializeContract();
      await this.fetchAddressVotingState(this.$store.state.userAddress);
      this.$store.commit("setInitialized", true);
    },
  },
  computed: {
    isInitialized() {
      return !this.$store.state.initialized;
    },
  },
};
</script>
