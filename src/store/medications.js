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
        removeMedication(state, payload) {
            state.medications.splice(payload.index, 1);
        },
        addNewMedication (state, payload) {
            state.medications.push(payload);
        }
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
        async createMedication ({commmit}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.post('Medications/', JSON.stringify(payload))
                    .then(resp => {
                        console.log('resp', resp);
                        commmit('addNewMedication', resp)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteMedication ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.delete('Medications/' + payload.ID)
                    .then(resp => {
                        console.log('resp', resp);
                        dispatch('removeMedication', payload.ID)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        updateList ({commit, state, payload}) {
            console.log('updateList payload', payload);
            state.medications.forEach((item, i) =>{
                if (item.ID == payload.ID) {
                    commit('setMedication', {index: i, payload})
                }
            });

        },
        removeMedication ({commit, state, payload}) {
            state.medications.forEach((item, i) =>{
                if (item.ID == payload) {
                    commit('removeMedication', {index: i, payload})
                }
            });
        }

    },
};
