import { createStore } from "vuex";
import router from "../router/index.js"

var url='http://127.0.0.1:8000/'
export default createStore({
  state: {
    user: "",
    name:'kawa'
  },
  getters: {
    user(state) {
      return state.user
    },
    table(state) {
      return state.table
    },
  },
  mutations: {
    setUser(state,payload) {
      state,
      state.user=payload

    },    
    setTable(state,payload) {
      state,
      state.table=payload
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
      router.push("/login");

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
          router.push("/");
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
      
    },
    async getalltable({commit,dispatch,state}){
      await fetch(url+"api/tables/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+state.user['access']
        },
      }).then(response => response.json())
      .then(data => {
        if(data.detail){
          alert(data.detail)
          dispatch({type: 'logout'})

        }else{
          // console.log('Success:', data);
          commit('setTable',data)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
    },

    
  },
  modules: {},
});
