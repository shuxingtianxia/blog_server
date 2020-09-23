// import { login, logout, getCurrentManager } from '@/api/common.js'
// import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: '',
    name: '',
    avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3790034832,2705828409&fm=26&gp=0.jpg',
    roleType: -1,
    userCode: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLE_TYPE(state, type) {
      state.roleType = type
    },
    SET_USER_CODE(state, code) {
      state.userCode = code
    },
    SET_ROLETYPE(state, val) {
      state.roleType = val
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   // const username = userInfo.username.trim()
    //   // const { username, password, code, uuid } = userInfo
    //   return new Promise((resolve, reject) => {
    //     login(userInfo).then(res => {
    //       if (res.code === '00000') {
    //       // if (res.code === 200) {
    //         const token = 'Bearer ' + res.token
    //         setToken(token)
    //         commit('SET_TOKEN', token)
    //         resolve()
    //       } else {
    //         reject(new Error(''))
    //         Message.error(res.message)
    //       }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getCurrentManager().then(res => {
    //       if (res.code === '00000') {
    //       // if (res.code === 200) {
    //         const data = res.user
    //         commit('SET_ROLE_TYPE', data.RoleType)
    //         commit('SET_NAME', data.userName)
    //         commit('SET_USER_CODE', data.userId)
    //         resolve(res.data)
    //       } else {
    //         reject(new Error(res.Info))
    //       }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLE_TYPE', -1)
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_ROLE_TYPE', -1)
    //     removeToken()
    //     resolve()
    //   })
    // }
  }
}

export default user
