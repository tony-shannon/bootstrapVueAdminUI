import {HTTP} from './axios'
import {filter,map,find} from 'lodash';
const state = () => ({
    adverse_reactionsList: [],
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
        list: (state, getters, rootState) => {

            let list =  map(state.adverse_reactionsList, e => ({
                id: e.id,
                name: e.EventName,
                substance: e.Substance,
                severity: e.Severity,
                comment: e.CommentLine,
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
        setAdverse_reactionsList: (state, list) => state.adverse_reactionsList = list,
        setActiveItem: (state, item) => state.activeItem = item,
        setSeverityList: (state, list)=>state.severity = list,
    },

    actions: {
        fetchAdverse_reactionsList({commit}) {

            HTTP.get('Allergiers').then((res) => {
                commit('setAdverse_reactionsList', res.data);
            }).catch((err) => {
                console.log(err);
            });

        },

        fetchNameAllowed({commit}) {
            HTTP.get('AllergierReactionsAllowed')
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
        addItem(context, newItem) {

            if(context.rootState.patient.patientId){
                let patientId = context.rootState.patient.patientId;
                newItem.patient_id = patientId;
            }

            HTTP.post('Allergiers/', JSON.stringify(newItem))
                .then(() => {
                    context.dispatch('fetchAdverse_reactionsList');
                })
                .catch(err => {
                    console.log(err)
                })
        },
        replaceItem(context, newItem) {
            HTTP.put('Allergiers/' + newItem.id, JSON.stringify(newItem))
                .then(res => {
                    console.log(res);
                    context.dispatch('fetchAdverse_reactionsList');
                    context.commit('setActiveItem', find(context.getters.list,{'id': newItem.id}));
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteItem(context, itemToDelete){
            HTTP.delete('Allergiers/' + itemToDelete.id)
                .then(() => {
                    context.dispatch('fetchAdverse_reactionsList')
                })
                .catch(err => {
                    console.log(err);
                })
        },
        putDataToServer() {

        }

    },
}


