import Vue from 'vue';
import Router from 'vue-router';

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

Vue.use(Router);

export default new Router({
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
    }
  ]
});
