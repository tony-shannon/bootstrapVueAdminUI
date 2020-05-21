import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
//Modules
import patients from './patients'
import patient from './patient'
import search from './search'
import auth from './auth'
import website from './website'
import diagnosis from './diagnosis'
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        patients,
        patient,
        search,
        auth,
        website,
        diagnosis,
    },
    plugins: [vuexLocal.plugin]

})
