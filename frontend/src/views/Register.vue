<template>
  <div>
    <h1>Register</h1>
    <div>
      <input
        v-model="username"
        type="text"
        placeholder="username"
        class="mt-1"
      />
    </div>
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
      <button @click="register" class="mt-2 py-1 px-4">Register</button>
    </div>
    <div class="mt-4">
      Already have an account? <br />
      Click <a @click="goLoginPage">here</a> to login.
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data: function () {
    return {
      username: "",
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
    async register() {
      this.$store.dispatch("register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
    goLoginPage() {
      this.$router.push({ name: "Login" });
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