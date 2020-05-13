import router from 'vue-router';

const Home = () => import(/* webpackChunkName: "main" */ '../components/home.vue');
const Problems = () => import(/* webpackChunkName: "main" */ '../components/problems/problems.vue');
const Patients = () => import(/* webpackChunkName: "main" */ '../components/patients/patients.vue');
const Medications = () => import(/* webpackChunkName: "main" */ '../components/medications/medications.vue');
const Adverse_Events = ()  => import(/* webpackChunkName: "main" */ '../components/adverse_events/adverse_events.vue');
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
      path: '/problems',
      name: 'problems',
      component: Problems
    },
    {
      path: '/patients',
      name: 'patients',
      component: Patients
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
