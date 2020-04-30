import {HTTP} from './axios'
import {GRAPHQL} from "./graphql";
import gql from "graphql-tag";
import {filter} from "lodash"
const initialState = {
    medications: [],
    status: 'view',
    activeItem: null,
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
        addMedication(state, payload) {
            state.medications.push(payload)
        },

        setStatus: (state, status) => state.status = status,
        setActiveItem: (state, activeItem) => state.activeItem = activeItem,
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
        },
        getMedications: function(state, getters,rootState){
            let patientId = rootState.patient.patientId;
            if(patientId){
                return filter(state.medications,{patientId: parseInt(patientId)});
            }else{
                return state.medications;
            }

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
                }).then((res)=>{
                    console.log(res);
                    dispatch('getMedicationsGraph');
                });

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
                }).then(()=>{
                     console.log('updateMedicationGraph');
                     dispatch('getMedicationsGraph');

                });

            } catch (error) {
                console.error(error);
            }
        },
        async createMedicationGraph({commit, getters, rootState}, payload) {
            try {

                payload.DoseMg = parseInt(payload.DoseMg);

                let id = getters.getNewId;
                payload.id = id;
                payload.idN = id;
                payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

                let query = gql`mutation CreateMeditation(
                                      $id: ID!,
                                      $idN: Int!,
                                      $DoseMg: Int!,
                                      $Indication: String!,
                                      $Name: String!,
                                      $Route: String!,
                                      $patientId: Int
                                    ){
                                        createMedication(
                                            data: {
                                                id: $id,
                                                idN: $idN,
                                                DoseMg: $DoseMg,
                                                Indication: $Indication,
                                                Name: $Name,
                                                Route: $Route,
                                                patientId: $patientId, 
                                            }
                                        )
                                        {
                                            id
                                            idN
                                            DoseMg
                                            Indication
                                            Name
                                            Route,
                                            patientId
                                        }
                                        }`;
                GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                }).then((response)=>{
                    console.log(response);
                    commit('addMedication', response.data.createMedication);
                    commit('setActiveItem',response.data.createMedication);
                    commit('setStatus','view')

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
                                    patientId
                                  }
                                }`;
                GRAPHQL.query({
                    query: query,
                }).then((response)=>{
                    console.log(response);
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
