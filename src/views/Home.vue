<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" />
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <b-loading :is-full-page="false" v-model="isLoading"></b-loading>
          <h1 class="title">
            Your address:
          </h1>
          <h2 class="subtitle">
            {{ address }}
          </h2>
        </div>
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
      address: 0x0,
      isLoading: false,
    };
  },
  beforeMount() {
    this.fetchAccounts();
  },
  methods: {
    async fetchAccounts() {
      this.isLoading = true;

      const accounts = await this.$store.state.web3.eth.requestAccounts();
      this.address = accounts[0];

      this.isLoading = false;
    },
  },
};
</script>
