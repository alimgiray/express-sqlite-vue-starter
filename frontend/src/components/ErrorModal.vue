<template>
  <div v-if="show">
    <div class="w-96 h-24 ml-auto mr-auto">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorModal",
  data: function () {
    return {};
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (!this.$store.state.loggedIn) {
      this.$store.commit("clearError");
    }
  },
  computed: {
    show() {
      return this.$store.state.showError;
    },
    message() {
      return this.$store.state.errorMessage;
    },
  },
};
</script>

<style scoped>
</style>