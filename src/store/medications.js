import axios from 'axios'

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
                axios({url: 'http://localhost:3000/Medications',  method: 'GET' })
                    .then(resp => {
                        commit('setMedications', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },

    },
};
