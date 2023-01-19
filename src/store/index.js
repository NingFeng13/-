import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      userId: 0,
      catId:0
    }
  },
  mutations: {
    changeUser(state, id) {
      state.userId = id
    },
    changeCat(state, id){
      state.catId = id
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
export default store
