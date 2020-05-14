import router from 'vue-router';

const Home = () => import(/* webpackChunkName: "main" */ '../components/home.vue');
const Patients = () => import(/* webpackChunkName: "main" */ '../components/patients/patients.vue');
const Login = () => import(/* webpackChunkName: "main" */ '../components/login.vue');


/*
Mocking
 */

const MockDocuments = () => import(/* webpackChunkName: "main" */ '../components/mocked/documents.vue');
const MockDiagnosis = () => import(/* webpackChunkName: "main" */ '../components/mocked/diagnosis.vue');

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
      path: '/patients',
      name: 'patients',
      component: Patients
    },
    {
      path: '/documents',
      name: 'documents',
      component: MockDocuments
    },
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: MockDiagnosis
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ],

})
