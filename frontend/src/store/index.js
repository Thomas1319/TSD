import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },

  plugins: [createPersistedState()],

  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, {token, user}){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    user_edit(state, payload){
        state.status = 'success'
        state.user.firstName = payload.firstName
        state.user.lastName = payload.lastName
        state.user.birthdate = payload.birthdate
        state.user.gender = payload.gender
        state.user.phone = payload.phone
        state.user.email = payload.email
    },
    
    logout(state){
      state.status = ''
      state.token = ''
      state.user = {}
    },
  },
  actions: {
    login({commit}, payload){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        const path = "http://localhost:5000/login";
        axios.post(path, payload)
        .then(res => {
          const token = res.data.token
          if(res.data.NoFound){
            swal(res.data.NoFound);
            commit('auth_error');
            localStorage.removeItem('token')
        }
          if(res.data.user){
            const user = res.data.user[0]
            console.log(user)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', {token, user})
            resolve(res)
          }
        })
        .catch(err => {
          commit('auth_error')
          console.log("error")
          localStorage.removeItem('token')
          reject(err)
        })
      })
  },
  logout({commit}){
    return new Promise((resolve) => {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
    editUser({commit}, payload){
      return new Promise((resolve, reject) => {
        const path = "http://localhost:5000/update_user";
        axios.post(path, payload)
        .then(res => {
          commit('user_edit', payload)
          resolve(res)
        })
        .catch(err => {
          console.log("error for edit user's data")
          reject(err)
        })
    })
  },
},
  modules: {
  },
  getters : {
    isAmin: state => state.user.right ===2,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
