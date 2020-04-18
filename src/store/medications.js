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
                HTTP.put('Medications/' + payload.id, JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getMedications')
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async createMedication ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.post('Medications/', JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getMedications')
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteMedication ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.delete('Medications/' + payload.id)
                    .then(resp => {
                        dispatch('getMedications')
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
    },
};
