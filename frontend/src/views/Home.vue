<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  async mounted() {
    this.$store.dispatch("checkLoginStatus");
    if (this.$store.state.loggedIn) {
      this.$router.push({ name: "Dashboard" });
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>

<style scoped>
</style>