<template>
  <div>
    <h1>Dashboard</h1>
    <div class="w-72">
      <div class="flex">
        <input
          v-model="newTask"
          type="text"
          placeholder="new task..."
          class="w-full"
        />
        <button @click="addTask" class="py-1 px-4">Add</button>
      </div>
    </div>
    <ul class="font-mono list-none mt-2 w-72">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="border-b last:border-b-0 border-indigo-300"
      >
        <div class="flex h-8">
          <button @click="deleteTask(task.id)" class="px-4">✖️</button>
          <span class="pl-2 bg-indigo-100 w-full leading-8"
            >{{ task.description }}
          </span>
          <button
            v-if="!task.done"
            @click="markTaskAsDone(task.id)"
            class="px-4 min-h-full"
          >
            ✔️
          </button>
        </div>
      </li>
    </ul>
    <button @click="logout" class="mt-2 px-5 py-2">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data: function () {
    return {
      newTask: "",
    };
  },
  mounted() {
    if (!this.loggedIn) {
      this.$router.push({ name: "Login" });
    } else {
      this.$store.dispatch("getTasks");
    }
  },
  methods: {
    async addTask() {
      await this.$store.dispatch("addTask", {
        description: this.newTask,
      });
      this.newTask = "";
    },
    async deleteTask(id) {
      await this.$store.dispatch("deleteTask", { id });
    },
    async markTaskAsDone(id) {
      await this.$store.dispatch("markTaskAsDone", { id });
    },
    logout() {
      this.$store.commit("logout");
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
    tasks() {
      return this.$store.state.tasks;
    },
  },
  watch: {
    loggedIn: function (newVal) {
      if (!newVal) {
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style scoped>
</style>