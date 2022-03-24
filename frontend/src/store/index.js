import { createStore } from "vuex";
import router from "../router/index.js";
import { URL } from "./const.js";
var url = URL;
export default createStore({
  state: {
    user: "",
    food: "",
  },
  getters: {
    user(state) {
      return state.user;
    },
    food(state) {
      return state.food;
    },
    table(state) {
      return state.table;
    },
  },
  mutations: {
    setUser(state, payload) {
      state, (state.user = payload);
    },
    setFood(state, payload) {
      state, (state.food = payload);
    },
    setTable(state, payload) {
      state, (state.table = payload);
    },
    logout(state) {
      state, (state.user = "");
    },
  },
  actions: {
    setewtable({ commit }, { payload }) {
      commit("setTable", payload);
    },
    async getfood({ commit }) {
      if (this.state.food == "") {
        await fetch(URL + "api/items/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.user["access"],
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.detail) {
              alert(data.detail);
            } else {
              // console.log(data.data)
              //commit setFood
              commit("setFood", data.data);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
      router.push("/login");
    },
    async checkusernameeandpass({ commit, state }, { username, password }) {
      await fetch(url + "api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.detail) {
            alert("worng credential!! ," + data.detail);
          } else {
            // console.log('Success:', data);
            commit("setUser", data);
            localStorage.setItem("user", JSON.stringify(data));
            if (data.role == "chef") {
              router.push("/suborder");
            }
            if (data.role == "waiter") {
              router.push("/waitersuborder");
            }
            if (data.role == "admin" || data.role == "captain") {
              router.push("/");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async checklocalstorage({ commit }) {
      var user = await JSON.parse(localStorage.getItem("user"));
      if (user) {
        commit("setUser", user);
      }
    },
    async getalltable({ commit, dispatch, state }) {
      await fetch(url + "api/tables/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.user["access"],
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.detail) {
            alert(data.detail);
            dispatch({ type: "logout" });
          } else {
            // console.log('Success:', data);
            commit("setTable", data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  modules: {},
});
