<template>
  <div>
    <h1>Login</h1>
    <div>
      <input v-model="email" type="email" placeholder="email" class="mt-1" />
    </div>
    <div>
      <input
        v-model="password"
        type="password"
        placeholder="password"
        class="mt-1"
      />
    </div>
    <div>
      <button @click="login" class="mt-2 py-1 px-4">Login</button>
    </div>
    <div class="mt-4">
      Don't have an account? <br />
      Click <a @click="goRegisterPage">here</a> to register.
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push({ name: "Dashboard" });
    }
  },
  methods: {
    async login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    goRegisterPage() {
      this.$router.push({ name: "Register" });
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  watch: {
    loggedIn: function (newVal) {
      if (newVal) {
        this.$router.push({ name: "Dashboard" });
      }
    },
  },
};
</script>

<style>
</style>