import {HTTP} from './axios'

const initialState = {
    medications: []
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        setMedications(state, payload) {
            state.medications = payload;
        },
        setMedication(state, payload) {
            state.medications[payload.index] = payload.value;
        },
        blank(state, payload) {
            console.log('blank', payload);
        },
    },
    actions: {
        async getMedications({commit}) {
            return new Promise((resolve, reject) => {
                HTTP.get('Medications')
                    .then(resp => {
                        commit('setMedications', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async updateMedication ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.put('Medications/' + payload.ID, JSON.stringify(payload))
                    .then(resp => {
                        console.log('resp', resp);
                        dispatch('updateList', resp)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteMedication ({commit}, payload) {
            commit('blank', payload)
        },
        updateList ({commit, state, payload}) {
            console.log('updateList payload', payload);
            state.medications.forEach((item, i) =>{
                if (item.ID == payload.ID) {
                    commit('setMedication', {index: i, payload})
                }
            });

        }

    },
};
