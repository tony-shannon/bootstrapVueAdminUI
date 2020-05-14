import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

//Modules
import patients from './patients'
import patient from './patient'
import search from './search'
import auth from './auth'
import website from './website'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        patients,
        patient,
        search,
        auth,
        website
    }
})
