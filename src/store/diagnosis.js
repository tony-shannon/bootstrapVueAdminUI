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
                id: e._id_,
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

        addItem(context,newItem){
                let uuid  = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });


            let diagnosisList = context.state.diagnosisList;
            let item = {};
            item._id_ = uuid;
            item._fake_id = Math.random();
            item.clin_descrip = newItem.Description;
            item.problem_diagnosis_name = newItem.ProblemDiagnosisName;
            item.problem_diagnosis_name.term = 'problem_diagnosis_names/'+item.problem_diagnosis_name.term
            item.severity = {
                rubric: "Moderate",
                term: "severity/mod",
            }

            diagnosisList.push(item);
            context.commit('setDiagnosisList', diagnosisList);
            context.dispatch('putDataToServer');

        },

        putDataToServer({state, rootState,dispatch}) {
            HTTP.post('/diagnosis/store',
                {
                    cookieRequest: rootState.auth.cookie,
                    csfttoken: rootState.auth.crfstoken,
                    dataToSave: JSON.stringify(state.diagnosisList),
                }).then((res) => {
                console.log(res);
                dispatch('fetchDiagnosisList');
            }).catch((res) => {
                console.log(res)
            });
        }
    },
}


