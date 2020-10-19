<template>
  <div class="container">
    <section class="section">
      <div class="container">
        <b-loading
          :is-full-page="true"
          v-model="showLoading"
          :can-cancel="false"
        ></b-loading>
      </div>
      <b-notification
        :type="$store.state.votingOpen ? 'is-success' : 'is-danger'"
        has-icon
        aria-close-label="Close notification"
        :closable="$store.state.votingOpen"
      >
        {{ votingStateText }}
      </b-notification>
      <b-notification type="is-info" has-icon :closable="false">
        Your address: <strong>{{ $store.state.userAddress }}</strong>
      </b-notification>
      <div class="columns">
        <div class="column" v-for="c in $store.state.candidates" :key="c.id">
          <candidate-component
            :candidate="c"
            :voted="$store.state.hasVoted"
            @vote="onVote"
          />
        </div>
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
      votingStateText: "",
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
      const hasVoted = await this.$store.state.votingContract.methods
        .voters(address)
        .call();
      this.$store.commit("setHasVoted", hasVoted);
    },
    async fetchAccounts() {
      const accounts = await this.$store.state.web3.eth.requestAccounts();
      this.$store.commit("setAddress", accounts[0]);
    },
    async fetchVotingState() {
      const votingState = await this.$store.state.votingContract.methods
        .isVotingOpen()
        .call();
      this.$store.commit("setVotingOpen", votingState);
    },
    async fetchCandidatesData() {
      const c0 = this.$store.state.votingContract.methods.candidates(1).call();
      const c1 = this.$store.state.votingContract.methods.candidates(2).call();
      const results = await Promise.allSettled([c0, c1]);
      const candidates = results.map((r) => r.value);
      this.$store.commit("setCandidates", candidates);
    },
    async initialize() {
      await this.fetchAccounts();
      await this.initializeContract();
      await this.fetchVotingState();

      if (this.$store.state.votingOpen) {
        await this.fetchAddressVotingState(this.$store.state.userAddress);
      } else {
        this.votingStateText = "Voting is not allowed right now.";
      }

      await this.fetchCandidatesData();
      if (this.$store.state.votingOpen && !this.$store.state.hasVoted) {
        this.votingStateText = "Ready to vote?";
      } else if (this.$store.state.hasVoted) {
        this.votingStateText = "You have already voted!";
      }

      this.$store.commit("setInitialized", true);
    },
    async onVote(id) {
      this.isLoading = true;

      // options for the transaction
      const options = {
        gas: 75000,
        from: this.$store.state.userAddress,
      };

      // call the vote method, then retrieve account vote state
      await this.$store.state.votingContract.methods.vote(id).send(options);
      await this.fetchAddressVotingState(this.$store.state.userAddress);
      this.isLoading = false;
    },
  },
  computed: {
    isInitialized() {
      return !this.$store.state.initialized;
    },
    showLoading() {
      return this.isLoading || this.isInitialized;
    },
  },
};
</script>
