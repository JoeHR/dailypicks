import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sid: '',
    isLogin: false,
    token: '',
    userInfo: {}
  },
  mutations: {
    setSid (state, sid) {
      state.sid = sid;
    },
    setToken (state, value) {
      state.token = value;
      localStorage.setItem('token', value);
    },
    // 设置用户的基本信息
    setUserInfo (state, value) {
      if(value === '') { return; };
      state.userInfo = value;
      // 本地存储用户信息
      localStorage.setItem('userInfo', JSON.stringify(value));
    },
    // 设置 isLogin 的状态
    setIsLogin (state, value) {
      state.isLogin = value;
    }
  },
  actions: {}
});
