import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

//Modules
import medications from './medications'
import problems from './problems'
import adverse_events from './adverse_events'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        medications,
        problems,
        adverse_events
    }
})