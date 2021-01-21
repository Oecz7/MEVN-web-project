import Vue from 'vue'
import Vuex from 'vuex'

import router from '../router/index'

import decode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    userDB: '',
    date:''
  },
  mutations: {
    obtenerUsuario(state, payload){
      state.token = payload;
      if(payload === ''){
        state.userDB = ''
      }else{
        state.userDB = decode(payload);
        router.push({name: 'Service-list'})
      }
    },
    filterDate(state, payload){
      state.date === payload;
    },

  },
  actions: {
    actionFiler({commit}, date){
      commit('filterDate', date)
    },
    guardarUsuario({commit}, payload){
      localStorage.setItem('token', payload);
      commit('obtenerUsuario', payload);
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', '');
      localStorage.removeItem('token');
      router.push({name: 'Login'});
    },
    leerToken({commit}){
      const token = localStorage.getItem('token');
      if(token){
        commit('obtenerUsuario', token);
      }else{
        commit('obtenerUsuario', '');
      }
    }
  },
  getters:{
    estaActivo: state => !!state.token
  },
  modules: {
  }
})
