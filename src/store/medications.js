import {HTTP} from './axios'
import {GRAPHQL} from "./graphql";
import gql from "graphql-tag";

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
        async deleteMedicationGraph({dispatch}, payload) {
            try {
                let query = gql`mutation DeleteMeditation($id: ID!){
                                  deleteMedication(
                                    where: {
                                        id:$id
                                    }
                                  )
                                  {
                                    id
                                    idN
                                   }
                                }`;

                await GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                });
                await dispatch('getMedicationsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async updateMedicationGraph({dispatch}, payload) {
            try {
                payload.DoseMg = parseInt(payload.DoseMg);
                let query = gql`mutation updateMeditation(
                                  $id: ID!,
                                  $idN: Int!,
                                  $DoseMg: Int!,
                                  $Indication: String!,
                                  $Name: String!,
                                  $Route: String!
                                
                                ){
                                  updateMedication(
                                    data: {
                                    idN: $idN,
                                    DoseMg: $DoseMg,
                                    Indication: $Indication,
                                    Name: $Name,
                                    Route: $Route
                                  }
                                  where:
                                  {
                                     id: $id    
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
                                }`;
                await GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                });
                await dispatch('getMedicationsGraph');

            } catch (error) {
                console.error(error);
            }
        },
        async createMedicationGraph({commit, getters}, payload) {
            try {

                payload.DoseMg = parseInt(payload.DoseMg);

                let id = getters.getNewId;
                payload.id = id;
                payload.idN = id;

                let query = gql`mutation CreateMeditation(
                                      $id: ID!,
                                      $idN: Int!,
                                      $DoseMg: Int!,
                                      $Indication: String!,
                                      $Name: String!,
                                      $Route: String!
                                    ){
                                        createMedication(
                                            data: {
                                                id: $id,
                                                idN: $idN,
                                                DoseMg: $DoseMg,
                                                Indication: $Indication,
                                                Name: $Name,
                                                Route: $Route
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
                                        }`;
                GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                }).then((response)=>{
                    commit('addMedication', response.data.createMedication);
                });

            } catch (error) {
                console.error(error);
            }
        },
        async getMedicationsGraph({commit}) {
            try {

                let query = gql`{
                                  medications {
                                    id
                                    idN
                                    DoseMg
                                    Indication
                                    Name
                                    Route
                                  }
                                }`;
                GRAPHQL.query({
                    query: query,
                }).then((response)=>{
                    commit('setMedications', response.data.medications);
                });
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
