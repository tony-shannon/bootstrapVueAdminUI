import {HTTP} from './axios'
import {filter, find,map} from 'lodash'

const state = () => ({
    medicationsList: [],
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

            let list =  map(state.medicationsList, e => ({
                id: e.id,
                form: e.form,
                name: e.name.rubric,
                strength: e.strength,
                amount: e.amount,
                patient_id: e.patient_id,
            }));
            if(rootState.patient.patientId){
                return filter(list,
                    {patient_id: rootState.patient.patientId});
            }else {
                return list;
            }
        },
        severity: (state) => state.severity,
    },

    mutations: {
        setNameAllowed: (state, nameAllowed) => state.nameAllowed = nameAllowed,
        setMedicationsList: (state, list) => state.medicationsList = list,
        setActiveItem: (state, item) => state.activeItem = item,
        setSeverityList: (state, list)=>state.severity = list,
    },

    actions: {

        getById({state}, id) {
            return find(state.medicationsList,{id: id});
        },
        fetchMedicationsList({commit}) {

            HTTP.get('Medications').then((res) => {
                console.log(res);
                commit('setMedicationsList', res.data);
            }).catch((err) => {
                console.log(err);
            });

        },

        fetchNameAllowed({commit}) {
            HTTP.get('MedicationsAllowed')
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

            HTTP.post('Medications', JSON.stringify(newItem))
                .then(() => {
                    context.dispatch('fetchMedicationsList');
                })
                .catch(err => {
                    console.log(err)
                })
        },
        replaceItem(context, newItem) {
            HTTP.put('Medications/' + newItem.id, JSON.stringify(newItem))
                .then(res => {
                    console.log(res);
                    context.dispatch('fetchMedicationsList');
                    context.commit('setActiveItem', find(context.getters.list,{'id': newItem.id}));
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteItem(context, itemToDelete){
            HTTP.delete('Medications/' + itemToDelete.id)
                .then(() => {
                    context.dispatch('fetchMedicationsList')
                })
                .catch(err => {
                    console.log(err);
                })
        },
        putDataToServer() {

        }

    },
}


