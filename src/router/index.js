import router from 'vue-router';

const Home = () => import(/* webpackChunkName: "main" */ '../components/home.vue');
const Problems = () => import(/* webpackChunkName: "main" */ '../components/problems/problems.vue');
const Medications = () => import(/* webpackChunkName: "main" */ '../components/medications/medications.vue');
const Adverse_Events = ()  => import(/* webpackChunkName: "main" */ '../components/adverse_events/adverse_events.vue'); 

export default new router ({
  mode: 'history',
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
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
    {
      path: '/medications',
      name: 'medications',
      component: Medications
    },
    {
      path: '/adverse_events',
      name: 'adverse_events',
      component: Adverse_Events
    },
  ],

})