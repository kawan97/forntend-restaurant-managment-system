import { createStore } from "vuex";
var url='http://127.0.0.1:8000/'
export default createStore({
  state: {
    user: "",
  },
  getters: {},
  mutations: {},
  actions: {
    async checkusernameeandpass({ commit }, { username, password }) {
      await fetch(url+"api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:username,password:password}),
      }).then(response => response.json())
      .then(data => {
        if(data.detail){
          alert('worng credential!! ,'+data.detail)
        }else{
          console.log('Success:', data);

        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
  },
  modules: {},
});
