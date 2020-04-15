import router from 'vue-router';

const Home = () => import(/* webpackChunkName: "main" */ '../components/home.vue');
const Problems = () => import(/* webpackChunkName: "main" */ '../components/problems/problems.vue');
export default new router ({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/problems',
      name: 'problems',
      component: Problems
    },
  ],
  mode: 'history'
})