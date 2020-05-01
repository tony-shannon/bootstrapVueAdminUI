import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
import router from './router/index.js';

router.beforeEach((to, from, next) => {

    if (to.name !== 'login' && store.state.auth.token == null) next({ name: 'login' })
    else next()
});

new Vue({
    router,
    store,
    el: '#app', render: h => h(App) })
