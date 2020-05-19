import router from 'vue-router';

const Home = () => import(/* webpackChunkName: "main" */ '../components/home.vue');
const Patients = () => import(/* webpackChunkName: "main" */ '../components/patients/patients.vue');
const Login = () => import(/* webpackChunkName: "main" */ '../components/login.vue');


/*
Mocking
 */

const MockDiagnosis = () => import(/* webpackChunkName: "main" */ '../components/mocked/diagnosis.vue');
const MockAdverseReactions = () => import(/* webpackChunkName: "main" */ '../components/mocked/adverse_reactions.vue');
const MockMedications = () => import(/* webpackChunkName: "main" */ '../components/mocked/medications.vue');

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
      path: '/patient/:id/document/:document_id',
      name: 'diagnosis',
      component: MockDiagnosis
    },
    {
      path: '/patient/:id/advreaction/:document_id',
      name: 'advreaction',
      component: MockAdverseReactions
    },
    {
      path: '/patient/:id/medications/:document_id',
      name: 'medications',
      component: MockMedications
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ],

})
