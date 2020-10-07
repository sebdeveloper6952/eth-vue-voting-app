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
    </section>
  </div>
</template>

<script>
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
      const fs = require("fs");
      const jsonFile = fs.readFileSync("../abi/Voting.json");
      const jsonInterface = JSON.parse(jsonFile);
      const contract = new web3.eth.Contract(
        jsonInterface.abi,
        this.$store.state.contractAddress
      );

      this.$store.commit("setContract", contract);
    },
    async fetchAddressVotingState(address) {
      console.log(address);
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
