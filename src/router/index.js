import router from 'vue-router';

const Home = () => import(/* webpackChunkName: "main" */ '../components/home.vue');
const Patients = () => import(/* webpackChunkName: "main" */ '../components/patients/patients.vue');
const Login = () => import(/* webpackChunkName: "main" */ '../components/login.vue');


/*
Mocking
 */

const Diagnosis = () => import(/* webpackChunkName: "main" */ '../components/diagnosis/diagnosis.vue');
const AdverseReactions = () => import(/* webpackChunkName: "main" */ '../components/adverse_reactions/adverse_reactions.vue');
const Medications = () => import(/* webpackChunkName: "main" */ '../components/medications/medications.vue');

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
      component: Diagnosis
    },
    {
      path: '/patient/:id/advreaction/:document_id',
      name: 'advreaction',
      component: AdverseReactions
    },
    {
      path: '/patient/:id/medications/:document_id',
      name: 'medications',
      component: Medications
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ],

})
