import {HTTP} from './axios'
import {find} from 'lodash'

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
            return state.diagnosisList;
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
            return find(state.diagnosisList,{_id_: id});
        },

        addItem(context, newItem) {
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
                    context.commit('setActiveItem', newItem);
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


