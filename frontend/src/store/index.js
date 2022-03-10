import { createStore } from "vuex";
var url='http://127.0.0.1:8000/'
export default createStore({
  state: {
    user: "",
    name:'kawa'
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state,payload) {
      state,
      state.user=payload

    },
    logout(state){
      state,
      state.user=''
    },
  },
  actions: {
    logout({ commit }){
      localStorage.removeItem('user');
      commit('logout')

    },
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
          // console.log('Success:', data);
          commit('setUser',data)
          localStorage.setItem('user',JSON.stringify(data));
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    },
    async checklocalstorage({commit}){
      var user =await JSON.parse(localStorage.getItem('user'));
      if(user){
         commit('setUser',user)
      }
      
    }
  },
  modules: {},
});
