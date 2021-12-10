<script>
import Error from "./components/ErrorModal.vue";
export default {
  components: {
    Error,
  },
  mounted() {
    this.$store.dispatch("checkLoginStatus");
  },
};
</script>

<template>
  <main id="app">
    <Error />
    <router-view />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  @apply w-96 mt-36 mr-auto ml-auto;
}
#app h1 {
  @apply mb-2 font-mono text-indigo-400 font-bold uppercase text-2xl;
}

#app input {
  @apply py-1 px-2 border-0 text-base font-mono bg-indigo-100 placeholder-indigo-800;
}

#app button {
  @apply border-0 text-base font-mono bg-indigo-200 border-indigo-200  text-indigo-800;
}

#app a  {
  @apply font-bold text-indigo-900;
}
</style>
