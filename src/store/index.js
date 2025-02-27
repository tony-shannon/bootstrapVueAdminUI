import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

//Modules
import medications from './medications'
import problems from './problems'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        medications,
        problems
    }
})