import Vue from 'vue'
import VueRouter from 'vue-router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'

library.add(faBars);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
import router from './router/index.js';

router.beforeEach((to, from, next) => {

    if (to.name !== 'login' && store.state.auth.token == null) next({ name: 'login' })
    else next()
});
require('./assets/background.jpg');
require('./assets/styles/main.css');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

new Vue({
    router,
    store,
    el: '#app', render: h => h(App) })
