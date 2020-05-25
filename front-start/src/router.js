import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue');
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue');
const Forget = () =>
  import(/* webpackChunkName: 'forget' */ './views/Forget.vue');
const Home = () => import('@/views/Home.vue');
const Index = () => import('@/views/channels/Index.vue');
const Template1 = () => import('@/views/channels/Template1.vue');
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
    }
  ]
});
