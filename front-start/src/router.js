import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import jwt from 'jsonwebtoken';
import moment from 'dayjs';

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue');
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue');
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ './views/Forget.vue');
const Home = () => import(/* webpackChunkName: 'home' */ '@/views/Home.vue');
const Index = () => import(/* webpackChunkName: 'index' */ '@/views/channels/Index.vue');
const Template1 = () => import(/* webpackChunkName: 'template1' */ '@/views/channels/Template1.vue');
const Center = () => import(/* webpackChunkName: 'center' */ './views/Center.vue');
const UserCenter = () => import(/* webpackChunkName: 'user-center' */ '@/components/user/Center.vue');
const Settings = () => import(/* webpackChunkName: 'user-settings' */ '@/components/user/Settings.vue');
const Posts = () => import(/* webpackChunkName: 'user-posts' */ '@/components/user/Posts.vue');
const Msg = () => import(/* webpackChunkName: 'user-msg' */ '@/components/user/Msg.vue');
const Other = () => import(/* webpackChunkName: 'user-others' */ '@/components/user/Others.vue');
const User = () => import(/* webpackChunkName: 'user' */ '@/views/User.vue');
const MyInfo = () => import(/* webpackChunkName: 'common-info' */ '@/components/user/common/MyInfo.vue');
const Accounts = () => import(/* webpackChunkName: 'common-accounts' */ '@/components/user/common/Accounts.vue');
const Passwd = () => import(/* webpackChunkName: 'common-passwd' */ '@/components/user/common/Passwd.vue');
const PicUpload = () => import(/* webpackChunkName: 'common-picupload' */ '@/components/user/common/PicUpload.vue');
const MyPost = () => import(/* webpackChunkName: 'common-post' */ '@/components/user/common/MyPost.vue');
const MyCollection = () => import(/* webpackChunkName: 'common-collection' */ '@/components/user/common/MyCollection.vue');

const NotFound = () => import(/* webpackChunkName: 'NotFound' */ '@/views/NotFound.vue');
const Confirm = () => import(/* webpackChunkName: 'Confirm' */ '@/views/Confirm.vue');
const Reset = () => import(/* webpackChunkName: 'NotFound' */ '@/views/Reset.vue');

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: 'layui-this',
  // linkActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        }, {
          path: '/index/:catalog',
          name: 'cata',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm
    },
    {
      path: '/reset',
      name: 'reset',
      component: Reset
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if(from.name === 'login') {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/user/:uid',
      name: 'home',
      // props: true,
      component: User
    },
    {
      path: '/center',
      component: Center,
      meta: {requiresAuth: true},
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          name: 'set',
          component: Settings,
          children: [
            {
              path: '',
              name: 'info',
              component: MyInfo
            },
            {
              path: 'pic',
              name: 'pic',
              component: PicUpload
            },
            {
              path: 'passwd',
              name: 'passwd',
              component: Passwd
            },
            {
              path: 'account',
              name: 'account',
              component: Accounts
            }
          ]
        },
        {
          path: 'posts',
          name: 'posts',
          component: Posts,
          children: [
            {
              path: '',
              name: 'mypost',
              component: MyPost
            }, {
              path: 'mycollection',
              name: 'mycollection',
              component: MyCollection
            }
          ]
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'others',
          name: 'others',
          component: Other
        }
      ]
      // beforeEnter: (to, from, next) => {
      //   console.log('from', from);
      //   console.log('to', to);
      //   const isLogin = store.state.isLogin;
      //   console.log('isLogin', isLogin);
      //   if(isLogin) {
      //     // 已经登陆
      //     next();
      //   } else {
      //     const token = localStorage.getItem('token');
      //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      //     if(token !== '' && token !== null) {
      //       // 取 localstorage 里面缓存的token 信息 + 用户信息
      //       store.commit('setToken', token);
      //       store.commit('setUserInfo', userInfo);
      //       store.commit('setIsLogin', true);
      //     }
      //     // 未登录
      //     next('/login');
      //   }

      // }
    }, {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if(token !== '' && token !== null) {
    const payload = jwt.decode(token);
    console.log('payload', payload);
    if(moment().isBefore(moment(payload.exp * 1000))) {
      // 判断 token 是否过期
      store.commit('setToken', token);
      store.commit('setUserInfo', userInfo);
      store.commit('setIsLogin', true);
    } else {
      localStorage.clear();
    }
    // 取 localstorage 里面缓存的token 信息 + 用户信息
    next();
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = store.state.isLogin;
    if(isLogin) {
      // 已经登陆的状态
      // 权限判断，meta元数据
      next();
    } else {
    // 未登录
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
