import {HTTP} from './axiosProxyBroker'
import {result, map, filter,find} from 'lodash'

const state = () => ({
    diagnosisList: [],
    nameAllowed: [],
    severity: [],
    status: 'view',
    activeItem: null,
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
        severity: (state) => state.severity,

      
    },

    mutations: {
        setNameAllowed: (state, nameAllowed) => state.nameAllowed = nameAllowed,
        setDiagnosisList: (state, list) => state.diagnosisList = list,
        setActiveItem: (state, item) => state.activeItem = item,
        setSeverityList: (state, list) => state.severity = list,
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

        fetchSeverityList({commit}) {
            HTTP.get('/severity/list')
                .then((res) => {
                    commit('setSeverityList', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },
        getById({state}, id) {
            return find(state.diagnosisList,{_id_: id});
        },

        addItem(context, newItem) {
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });


            let diagnosisList = context.state.diagnosisList;
            let item = {};
            item._id_ = uuid;
            item._fake_id = Math.random();
            item.clin_descrip = newItem.Description;
            item.problem_diagnosis_name = newItem.ProblemDiagnosisName;
            item.problem_diagnosis_name.term = 'problem_diagnosis_names/' + item.problem_diagnosis_name.term
            item.severity = newItem.Severity;

            diagnosisList.push(item);

            context.commit('setDiagnosisList', diagnosisList);
            context.dispatch('putDataToServer');
            context.commit('setActiveItem', {
                id: item._id_,
                description: item.clin_descrip,
                problem_name: item.problem_diagnosis_name.rubric,
                severity: item.severity.rubric
            });
        },
        replaceItem(context, newItem) {
            let diagnosisList = context.state.diagnosisList;
            diagnosisList = map(diagnosisList, (e) => {

                if (e._id_ == newItem.id) {

                    e.clin_descrip = newItem.description;
                    e.problem_diagnosis_name = newItem.problem_name;
                    e.problem_diagnosis_name.term = 'problem_diagnosis_names/' + e.problem_diagnosis_name.term;
                    e.severity = newItem.severity;

                }
                return e;
            });
            context.commit('setDiagnosisList', diagnosisList);
            context.dispatch('putDataToServer');

            newItem.problem_name = newItem.problem_name.rubric;
            newItem.severity = newItem.severity.rubric;

            context.commit('setActiveItem', newItem);

        },
        deleteItem(context, itemToDelete){
            let diagnosisList = context.state.diagnosisList;
            context.commit('setDiagnosisList',filter(diagnosisList, (e) => e._id_ != itemToDelete.id));
            context.commit('setActiveItem', null);
            context.dispatch('putDataToServer');

        },
        putDataToServer({state, rootState, dispatch}) {
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


