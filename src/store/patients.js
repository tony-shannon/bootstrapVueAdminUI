import {HTTP} from './axios'
import {GRAPHQL} from "./graphql";
import {PATIENT_LIST} from "../mocking/patient_list"
import gql from "graphql-tag";

import {result, map} from 'lodash'
import moment from 'moment'

console.log(PATIENT_LIST);
const initialState = {
    patients: [],
    status: 'view',
    activeItem: null,
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        setPatients(state, payload) {
            state.patients = payload;
        },
        setPatient(state, payload) {
            state.patients.splice(payload.index, 1, payload.value)
        },
        addPatient (state, payload) {
            state.patients.push(payload)
        },
        setStatus: (state, status) => state.status = status,
        setActiveItem: (state, activeItem) => state.activeItem = activeItem,
    },
    getters: {
        getNewId (state) {
            let lastId = 0;
            state.patients.forEach((item) => {
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
                        await dispatch('getPatients').then();
                        break;
                    case 'create':
                        await dispatch('createPatient', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updatePatient', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deletePatient', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }

            if (payload.type == 'graph') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getPatientsGraph').then();
                        break;
                    case 'create':
                        await dispatch('createPatientGraph', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updatePatientGraph', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deletePatientGraph', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }
        },
        async getPatients({commit}) {
            return new Promise((resolve, reject) => {
                HTTP.get('Patients')
                    .then(resp => {
                        commit('setPatients', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async updatePatient({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.put('Patients/' + payload.id, JSON.stringify(payload))
                    .then(resp => {
                        dispatch('updateList', resp.data)
                            .then(resolve(resp))
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async createPatient({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.post('Patients/', JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getPatients')
                            .then(() => {
                                resolve(resp)
                            })

                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deletePatient({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.delete('Patients/' + payload.id)
                    .then(resp => {
                        dispatch('getPatients')
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deletePatientGraph({dispatch}, payload) {
            try {
                let query = gql`mutation DeleteMeditation($id: ID!){
                                  deletePatient(
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
                await dispatch('getPatientsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async updatePatientGraph({dispatch}, payload) {
            try {
                payload.Age = parseInt(payload.Age);

                let query = gql`mutation UpdatePatnt(
                                    $id: ID!,
                                    $idN: Int!,
                                    $FirstName: String!,
                                    $LastName: String!,
                                    $Sex: String!,
                                    $Age: Int!,
                                    $Address: String!
                                
                                ){
                                  updatePatient(
                                    data: {
                                     idN: $idN,
                                     FirstName: $FirstName,
                                     LastName: $LastName,
                                     Sex: $Sex,
                                     Age: $Age,
                                     Address: $Address,
                                     }
                                  where:
                                  {
                                     id: $id    
                                  }
                                  )
                                  {
                                    id
                                    idN
                                    FirstName
                                    LastName
                                    Sex
                                    Age
                                    Address
                                  }
                                }`;
                await GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                });
                await dispatch('getPatientsGraph');

            } catch (error) {
                console.error(error);
            }
        },
        async createPatientGraph({commit, getters}, payload) {
            try {

                let id = getters.getNewId;
                payload.id = id;
                payload.idN = id;
                payload.Age = parseInt(payload.Age);
                let query = gql`mutation CreatePatient(
                                        $id: ID!,
                                        $idN: Int!,
                                        $FirstName: String!,
                                        $LastName: String!,
                                        $Sex: String!,
                                        $Age: Int!,
                                        $Address: String!
                                    ){
                                        createPatient(
                                            data: {
                                             id: $id,
                                             idN: $idN,
                                             FirstName: $FirstName,
                                             LastName: $LastName,
                                             Sex: $Sex,
                                             Age: $Age,
                                             Address: $Address,
                                            }
                                        )
                                        {
                                            id
                                            idN
                                            FirstName
                                            LastName
                                            Sex
                                            Age
                                            Address
                                        }
                                        }`;
                GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                }).then((response)=>{
                    console.log(response);
                    commit('addPatient', response.data.createPatient);
                    commit('setActiveItem',response.data.createPatient);
                    commit('setStatus','view')

                });

            } catch (error) {
                console.error(error);
            }
        },
        async getPatientsGraph({commit}) {
            try {
                // START MOCKING
                let res = PATIENT_LIST;
                console.log(res);
                res = result(res,'data.all_enrolments');

                let normalizeData = map( res,  (e) =>({
                    ...result(e,'record'),
                    created_date: moment(e.created_date).format('LL'),
                    patient_id: e.patient_id,
                    id: e.patient_id,
                }));
                commit('setPatients', normalizeData);
                return;
                //END MOCKING
                /*
                console.log(res);

                let query = gql`{
                                  patients {
                                    id
                                    idN
                                    FirstName
                                    LastName
                                    Sex
                                    Age
                                    Address
                                  }
                                }`;
                GRAPHQL.query({
                    query: query,
                }).then((response)=>{
                    console.log(response);
                    commit('setPatients', response.data.patients);
                });
                /
                 */
            } catch (error) {
                console.error(error);
            }
        },
        async updateList({commit, state}, payload) {
            return new Promise((resolve) => {
                state.patients.forEach((item, i) => {
                    if (item.id == payload.id) {
                        commit('setPatient', {index: i, value: payload});
                        resolve()
                    }
                });
            })
        },
    },
};
