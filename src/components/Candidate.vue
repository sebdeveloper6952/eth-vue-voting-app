<template>
  <div class="card custom-card">
    <div class="card-image">
      <figure class="image is-square">
        <img
          class="is-rounded custom-image"
          src="https://via.placeholder.com/200"
          alt="Placeholder image"
        />
      </figure>
    </div>
    <div class="card-header">
      <div class="card-header-title">
        <p class="title is-4">{{ candidate.name }}</p>
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris.
        <br />
        <div
          v-if="!voted"
          class="button is-primary is-fullwidth"
          @click="onClick"
        >
          Vote
        </div>
      </div>
      <div v-if="voted" class="custom-class">
        <h1 class="title is-1 custom-class">
          Votes: {{ candidate.voteCount }}
        </h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-card {
  border-radius: 50px;
}

.custom-image {
  padding: 50px;
}
</style>

<script>
export default {
  props: {
    candidate: {
      type: Object,
    },
    voted: {
      type: Boolean,
    },
  },
  methods: {
    onClick() {
      this.$emit("vote", this.candidate.id);
    },
  },
};
</script>

<style>
</style>