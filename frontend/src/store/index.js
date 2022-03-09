import { createStore } from "vuex";
var url=''
export default createStore({
  state: {
    user: "",
  },
  getters: {},
  mutations: {},
  actions: {
    async checkusernameeandpass({ commit }, { username, password }) {
      res=await fetch(url+"api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:username,password:password}),
      });
      data=await res.json()
      console.log(dara)
    },
  },
  modules: {},
});
