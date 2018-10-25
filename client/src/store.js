import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    }
  },
  actions: {
    getUser({ commit, dispatch }, payload){     
      let token = localStorage.getItem('tokenLC2') 
      if(token){
        axios({
          method: 'GET',
          url: `http://localhost:3000/users`,
          headers : {
            token: token
          }
        })
        .then((result) => {
            commit('setUser', result.data)
        }).catch((err) => {
          localStorage.removeItem('tokenLC2')
        });
      } else {
        commit('setUser', null)
      }
    }
  }
})
