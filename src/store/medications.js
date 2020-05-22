import {HTTP} from './axiosProxyBroker'
import {result, map, filter} from 'lodash'

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
        list: (state) => {
            return map(state.medicationsList, e => ({
                id: e._id_,
                form: e.medication_form,
                name: e.medication_name.rubric,
                strength: e.medication_strength,
                amount: e.medication_amount,
            }));
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
        fetchMedicationsList({commit, rootState}) {

            HTTP.post('/medication', {
                cookieRequest: rootState.auth.cookie,
                csfttoken: rootState.auth.crfstoken,

            }).then((res) => {
                console.log(res);

                res = result(res.data, 'content.c0001');

                commit('setMedicationsList', res);
            }).catch((err) => {
                console.log(err);
            });

        },

        fetchNameAllowed({commit}) {
            HTTP.get('/medication/list')
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
        addItem(context, newItem) {
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });


            let medicationsList = context.state.medicationsList;
            let item = {};
            item._id_ = uuid;
            item._fake_id = Math.random();
            item.medication_name = newItem.MedicationName;
            item.medication_name.term = 'medication_names/' + item.medication_name.term;
            item.medication_form = newItem.Form;
            item.medication_strength = newItem.Strength;
            item.medication_amount = newItem.Amount;

            medicationsList.push(item);


            context.commit('setMedicationsList', medicationsList);
            context.dispatch('putDataToServer');
            context.commit('setActiveItem', {
                id: item._id_,
                form: item.medication_form,
                name: item.medication_name.rubric,
                strength: item.medication_strength,
                amount: item.medication_amount,
            });


        },
        replaceItem(context, newItem) {
            let medicationsList = context.state.medicationsList;
            medicationsList = map(medicationsList, (e) => {

                if (e._id_ == newItem.id) {
                    e.medication_name = newItem.name;
                    e.medication_name.term = 'medication_names/' + e.medication_name.term;
                    e.medication_form = newItem.form;
                    e.medication_strength = newItem.strength;
                    e.medication_amount = newItem.strength;
                }
                return e;
            });

            context.commit('setMedicationsList', medicationsList);
            context.dispatch('putDataToServer');
            newItem.name = newItem.name.rubric;

            context.commit('setActiveItem', newItem);


        },

        deleteItem(context, itemToDelete){
            let medicationsList = context.state.medicationsList;
            context.commit('setMedicationsList',filter(medicationsList, (e) => e._id_ != itemToDelete.id));
            context.commit('setActiveItem', null);
            context.dispatch('putDataToServer');

        },
        putDataToServer({state, rootState, dispatch}) {
            HTTP.post('/medication/store',
                {
                    cookieRequest: rootState.auth.cookie,
                    csfttoken: rootState.auth.crfstoken,
                    dataToSave: JSON.stringify(state.medicationsList),
                }).then((res) => {
                console.log(res);
                dispatch('fetchMedicationsList');
            }).catch((res) => {
                console.log(res)
            });
        }

    },
}


