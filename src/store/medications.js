import {HTTP} from './axios'
import {CONFIG} from './config'

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
            state.medications.splice(payload.index, 1, payload.value)
        },
        addMedication (state, payload) {
            state.medications.push(payload)
        }
    },
    getters: {
        getNewId (state) {
            let lastId = 0;
            state.medications.forEach((item) => {
                if (parseInt(item.idN) > lastId) {
                    lastId = parseInt(item.idN);
                }
            });
            return lastId + 1;
        }
    },
    actions: {
        async makeRequest({dispatch}, payload) {
            if (payload.type == 'rest') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getMedications').then();
                        break;
                    case 'create':
                        await dispatch('createMedication', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateMedication', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteMedication', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }

            if (payload.type == 'graph') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getMedicationsGraph').then();
                        break;
                    case 'create':
                        await dispatch('createMedicationGraph', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateMedicationGraph', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteMedicationGraph', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }
        },
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
        async updateMedication({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.put('Medications/' + payload.id, JSON.stringify(payload))
                    .then(resp => {
                        dispatch('updateList', resp.data)
                            .then(resolve(resp))
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async createMedication({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.post('Medications/', JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getMedications')
                            .then(() => {
                                resolve(resp)
                            })

                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteMedication({dispatch}, payload) {
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

        async updateMedicationGraph({dispatch}, payload) {
            try {
                await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `mutation{
                                  updateMedication(
                                    data: {
                                    idN: `+ payload.id +`,
                                    DoseMg: `+ parseInt(payload['Dose-Mg']) +`,
                                    Indication: "` + payload.Indication +`",
                                    Name: "`+ payload.Name +`",
                                    Route: "`+ payload.Route +`"
                                  }
                                  where:
                                  {
                                     id: "`+ payload.id +`"    
                                  }
                                  )
                                  {
                                    id
                                    idN
                                    DoseMg
                                    Indication
                                    Name
                                    Route
                                  }
                                }`
                    }
                });
                await dispatch('getMedicationsGraph');
            } catch (error) {
                console.error(error);
            }
        },

        async createMedicationGraph({commit, getters}, payload) {
            try {
                let id = getters.getNewId;
                let result = await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `mutation{
                                        createMedication(
                                            data: {
                                                id: "`+ id +`",
                                                idN: `+ id +`,
                                                DoseMg: `+ parseInt(payload['Dose-Mg']) +`,
                                                Indication: "`+ payload.Indication +`",
                                                Name: "`+ payload.Name +`",
                                                Route: "`+ payload.Route +`"
                                            }
                                        )
                                        {
                                            id
                                            idN
                                            DoseMg
                                            Indication
                                            Name
                                            Route
                                        }
                                        }`
                    }
                });
                commit('addMedication', result.data.data.createMedication);
            } catch (error) {
                console.error(error);
            }
        },

        async getMedicationsGraph({commit}) {
            try {
                let result = await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `{
                                  medications {
                                    id
                                    idN
                                    DoseMg
                                    Indication
                                    Name
                                    Route
                                  }
                                }`
                    }
                });
                commit('setMedications', result.data.data.medications);
            } catch (error) {
                console.error(error);
            }
        },


        async updateList({commit, state}, payload) {
            return new Promise((resolve) => {
                state.medications.forEach((item, i) => {
                    if (item.id == payload.id) {
                        commit('setMedication', {index: i, value: payload});
                        resolve()
                    }
                });
            })
        },
    },
};
