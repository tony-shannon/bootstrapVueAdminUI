import {HTTP} from './axios'
import {GRAPHQL} from "./graphql";
import gql from "graphql-tag";
import {filter} from "lodash"

const initialState = {
    diagnosiss: [],
    terms: [],
    status: 'view',
    activeItem: null,
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        setDiagnosiss(state, payload) {
            state.diagnosiss = payload;
        },
        setTerms(state, payload) {
            state.terms = payload;
        },
        setDiagnosis(state, payload) {
            state.diagnosiss.splice(payload.index, 1, payload.value)
        },
        addDiagnosis (state, payload) {
            state.diagnosiss.push(payload)
        },
        clearTerms(state) {
            state.terms = [];
        },
        setStatus: (state, status) => state.status = status,
        setActiveItem: (state, activeItem) => state.activeItem = activeItem,
    },
    getters: {
        getNewId (state) {
            let lastId = 0;
            state.diagnosiss.forEach((item) => {
                if (parseInt(item.idN) > lastId) {
                    lastId = parseInt(item.idN);
                }
            });
            return lastId + 1;
        },
        getDiagnosiss: function(state, getters,rootState){
            let patientId = rootState.patient.patientId;
            if(patientId){
                let data =  filter(state.diagnosiss,{patientId: patientId});

                if (!data.length) {
                    state.activeItem = null;
                }
                return data;
            }else{
                return state.diagnosiss;
            }

        }
    },
    actions: {
        async makeRequest({dispatch}, payload) {
            if (payload.type == 'rest') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getDiagnosiss').then();
                        break;
                    case 'create':
                        await dispatch('createDiagnosis', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateDiagnosis', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteDiagnosis', payload.data);

                        break;
                    case 'getTerms':
                        await dispatch('getTerms');
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }

            if (payload.type == 'graph') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getDiagnosissGraph').then();
                        break;
                    case 'create':
                        await dispatch('createDiagnosisGraph', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateDiagnosisGraph', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteDiagnosisGraph', payload.data);
                        break;
                    case 'getTerms':
                        await dispatch('getTermsGraph');
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }
        },
        async getDiagnosiss({commit}) {
            return new Promise((resolve, reject) => {
                HTTP.get('Diagnosiss')
                    .then(resp => {
                        commit('setDiagnosiss', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async updateDiagnosis ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.put('Diagnosiss/' + payload.id, JSON.stringify(payload))
                    .then(resp => {
                        dispatch('updateList',resp.data)
                            .then(resolve(resp))
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async createDiagnosis ({dispatch,rootState}, payload) {
            payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

            return new Promise((resolve, reject) => {
                HTTP.post('Diagnosiss/', JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getDiagnosiss')
                            .then(() => {
                                resolve(resp)
                            })

                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteDiagnosis ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.delete('Diagnosiss/' + payload.id)
                    .then(resp => {
                        dispatch('getDiagnosiss')
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteDiagnosisGraph({dispatch}, payload) {
            try {

                var query = gql`mutation DeleteDiagnosis($id: ID!){
                                  deleteDiagnosis(
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
                await dispatch('getDiagnosissGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async updateDiagnosisGraph({dispatch,commit}, payload) {
            try {
                let query = gql`mutation UpdateDiagnosis(    
                                    $id: ID!,
                                    $idN: Int, 
                                    $CodeD: String,
                                    $Description: String,
                                    $Name: String, 
                                    $Days: String
                                  )
                                  {
                                  updateDiagnosis(
                                    data: {
                                    idN: $idN,
                                    CodeD: $CodeD,
                                    Description: $Description,
                                    Name: $Name,
                                    Days: $Days,
                                  }
                                  where:
                                  {
                                     id: $id    
                                  }
                                  )
                                  {
                                    id
                                    idN
                                    CodeD
                                    Description
                                    Name
                                    Days
                                  }
                                }`;

                await GRAPHQL.mutate({
                   mutation: query,
                   variables: payload,
                }).then((res)=>{
                    commit('setActiveItem',res.data.updateDiagnosis);
                    commit('setStatus','view');
                    dispatch('getDiagnosissGraph');
                });
            } catch (error) {
                console.error(error);
            }
        },
        async createDiagnosisGraph({commit, getters,rootState}, payload) {
            try {

                payload.id = getters.getNewId;
                payload.idN = payload.id;
                payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

                let query = gql`mutation CreateDiagnosis(
                                        $id: ID!,
                                        $idN: Int!,
                                        $CodeD: String!,
                                        $Description: String!,
                                        $Name: String!, 
                                        $Days: String!
                                        $patientId: Int
                                    ){
                                        createDiagnosis(
                                            data: {
                                                id: $id,
                                                idN: $idN,
                                                CodeD: $CodeD,
                                                Description: $Description,
                                                Name: $Name,
                                                Days: $Days,
                                                patientId: $patientId,
                                            }
                                        )
                                        {
                                            id
                                            idN
                                            CodeD
                                            Description
                                            Name
                                            Days
                                            patientId
                                        }
                                        }`;
                await GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                }).then((response)=>{
                    commit('addDiagnosis', response.data.createDiagnosis);
                    commit('setActiveItem',response.data.createDiagnosis);
                    commit('setStatus','view')

                });
            } catch (error) {
                console.error(error);
            }
        },
        async getDiagnosissGraph({commit}) {
            try {

                let query = gql`{
                                  diagnosiss {
                                        id,
                                        idN,
                                        CodeD,
                                        Name,
                                        Description,
                                        Days,
                                        patientId
                                      }
                                }`;
                await GRAPHQL.query({
                    query: query
                }).then((response)=>{
                    commit('setDiagnosiss', response.data.diagnosiss);
                });
            } catch (error) {
                console.error(error);
            }
        },
        async updateList({commit, state}, payload) {
            return new Promise((resolve) => {
                state.diagnosiss.forEach((item, i) => {
                    if (item.id == payload.id) {
                        commit('setDiagnosis', {index: i, value: payload});
                        resolve()
                    }
                });
            })
        },

        async getTerms({commit}) {
            return new Promise((resolve, reject) => {
                HTTP.get('Terms')
                    .then(resp => {
                        commit('setTerms', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async getTermsGraph({commit}) {
            try {

                let query = gql`{
                                 terms {
                                         idN
                                         Term
                                     }
                                }`;

                await GRAPHQL.query({
                    query: query,
                }).then((response)=>{
                    commit('clearTerms');
                    commit('setTerms', response.data.terms);
                });


            } catch (error) {
                console.error(error);
            }
        },

    },
};
