import { createStore } from "vuex";

const API_URL = import.meta.env.VITE_API_URL || "/";

export default createStore({
  state: {
    loggedIn: false,
    username: "",
    token: "",
    tasks: [],
    showError: false,
    errorMessage: "",
  },
  mutations: {
    login(state, { username, token }) {
      state.username = username;
      state.token = token;
      state.loggedIn = true;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
    },
    logout(state) {
      state.username = "";
      state.token = "";
      state.loggedIn = false;
      localStorage.clear();
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTask(state, id, description) {
      const task = state.tasks.find((task) => {
        return task.id === id;
      });
      task.description = description;
    },
    markTaskAsDone(state, id) {
      const task = state.tasks.find((task) => {
        return task.id === id;
      });
      task.done = true;
    },
    setError(state, message) {
      state.showError = true;
      if (typeof message === "string") {
        state.errorMessage = message;
      } else {
        state.errorMessage = message.join(",");
      }
    },
    clearError(state) {
      state.showError = false;
      state.errorMessage = "";
    },
  },
  actions: {
    checkLoginStatus({ commit }) {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      if (username && token) {
        commit("login", { username, token });
      } else {
        commit("logout");
      }
    },
    async login({ commit }, { email, password }) {
      return fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("login", data);
          return true;
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
          return false;
        });
    },
    async register({ commit }, { username, email, password }) {
      return fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("login", data);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    logout({ commit }) {
      commit("logout");
    },
    async getTasks({ commit, getters }) {
      return fetch(`${API_URL}/api/tasks`, {
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("setTasks", data);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async deleteTask({ commit, getters }, { id }) {
      return fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return;
          }
          return Promise.reject(response);
        })
        .then(() => {
          commit("deleteTask", id);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async addTask({ commit, getters }, { description }) {
      return fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: getters.requestHeader,
        body: JSON.stringify({ description }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("addTask", data);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async updateTask({ commit, getters }, { id, description }) {
      return fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: getters.requestHeader,
        body: JSON.stringify({ description }),
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("updateTask", data.id, data.description);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
    async markTaskAsDone({ commit, getters }, { id }) {
      return fetch(`${API_URL}/api/tasks/${id}/done`, {
        method: "PUT",
        headers: getters.requestHeader,
      })
        .then((response) => {
          if (response.ok) {
            commit("clearError");
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          commit("markTaskAsDone", data.id);
        })
        .catch((response) => {
          response.json().then((error) => {
            commit("setError", error.description);
          });
        });
    },
  },
  getters: {
    getTask: (state) => (id) => {
      return state.tasks.find((task) => task.id === id);
    },
    requestHeader(state) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      };
    },
  },
});
