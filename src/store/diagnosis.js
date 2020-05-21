import {HTTP} from './axiosProxyBroker'
import {result, map} from 'lodash'

const state = () => ({
    diagnosisList: [],
    nameAllowed: [],
});

export default {
    namespaced: true,

    state,

    getters: {
        nameAllowed: (state) => state.nameAllowed,
        list: (state) => {
            return map(state.diagnosisList, e => ({
                id: e.id,
                description: e.clin_descrip,
                problem_name: e.problem_diagnosis_name.rubric,
                severity: e.severity.rubric
            }));
        },
    },

    mutations: {
        setNameAllowed: (state, nameAllowed) => state.nameAllowed = nameAllowed,
        setDiagnosisList: (state, list) => state.diagnosisList = list,
    },

    actions: {
        fetchDiagnosisList({commit, rootState}) {

            HTTP.post('/diagnosis', {
                cookieRequest: rootState.auth.cookie,
                csfttoken: rootState.auth.crfstoken,

            }).then((res) => {
                console.log(res);

                res = result(res.data, 'content.c0001');

                commit('setDiagnosisList', res);
            }).catch((err) => {
                console.log(err);
            });

        },

        fetchNameAllowed({commit}) {
            HTTP.get('/diagnosis/list')
                .then((res) => {
                    commit('setNameAllowed', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },

        putDataToServer({state, rootState,commit}) {
            HTTP.post('/diagnosis/store',
                {
                    cookieRequest: rootState.auth.cookie,
                    csfttoken: rootState.auth.crfstoken,
                    dataToSave: JSON.stringify(state.diagnosisList),
                }).then((res) => {
                console.log(res);
                this.fetchDiagnosisList({commit:commit, rootState: rootState})
            }).catch((res) => {
                console.log(res)
            });
        }
    },
}


