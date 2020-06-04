import {HTTP} from './axios'
import {filter, find, map} from 'lodash'

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
        list: (state,getters, rootState) => {

            let list = map(state.diagnosisList, e => ({
                id: e.id,
                description: e.description,
                problem_name: e.problem_name.rubric,
                severity: e.severity.rubric,
                patient_id: e.patient_id,
            }));

            if(rootState.patient.patientId){
                return filter(list, {patient_id: rootState.patient.patientId});
            }else {
                return list;
            }
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
        fetchDiagnosisList({commit}) {
            HTTP.get('Diagnosis')
                .then(resp => {
                    commit('setDiagnosisList', resp.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },

        fetchNameAllowed({commit}) {

            HTTP.get('DiagnosisAllowed')
                .then((res) => {
                    commit('setNameAllowed', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },

        fetchSeverityList({commit}) {
            HTTP.get('Severity')
                .then((res) => {
                    commit('setSeverityList', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },
        getById({state}, id) {
            return find(state.diagnosisList,{id: id});
        },

        addItem(context, newItem) {

            if(context.rootState.patient.patientId){
                let patientId = context.rootState.patient.patientId;
                newItem.patient_id = patientId;
            }

            HTTP.post('Diagnosis/', JSON.stringify(newItem))
                .then(() => {
                    context.dispatch('fetchDiagnosisList');
                })
                .catch(err => {
                    console.log(err)
                })
        },
        replaceItem(context, newItem) {
            HTTP.put('Diagnosis/' + newItem.id, JSON.stringify(newItem))
                .then(res => {
                    console.log(res);
                    context.dispatch('fetchDiagnosisList');
                    context.commit('setActiveItem', find(context.getters.list,{'id': newItem.id}));
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteItem(context, itemToDelete){
            HTTP.delete('Diagnosis/' + itemToDelete.id)
                .then(() => {
                    context.dispatch('fetchDiagnosisList')
                })
                .catch(err => {
                    console.log(err);
                })
        },
        putDataToServer() {

        }

    },
}


