import {HTTP} from './axios'
import {GRAPHQL} from "./graphql";
import gql from "graphql-tag";
import {filter} from "lodash"

const initialState = {
    problems: [],
    terms: [],
    status: 'view',
    activeItem: null,
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        setProblems(state, payload) {
            state.problems = payload;
        },
        setTerms(state, payload) {
            state.terms = payload;
        },
        setProblem(state, payload) {
            state.problems.splice(payload.index, 1, payload.value)
        },
        addProblem (state, payload) {
            state.problems.push(payload)
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
            state.problems.forEach((item) => {
                if (parseInt(item.idN) > lastId) {
                    lastId = parseInt(item.idN);
                }
            });
            return lastId + 1;
        },
        getProblems: function(state, getters,rootState){
            let patientId = rootState.patient.patientId;
            if(patientId){
                return filter(state.problems,{patientId: patientId});
            }else{
                return state.problems;
            }

        }
    },
    actions: {
        async makeRequest({dispatch}, payload) {
            if (payload.type == 'rest') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getProblems').then();
                        break;
                    case 'create':
                        await dispatch('createProblem', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateProblem', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteProblem', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }

            if (payload.type == 'graph') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getProblemsGraph').then();
                        break;
                    case 'create':
                        await dispatch('createProblemGraph', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateProblemGraph', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteProblemGraph', payload.data);
                        break;
                    case 'getTerms':
                        await dispatch('getTerms');
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }
        },
        async getProblems({commit}) {
            return new Promise((resolve, reject) => {
                HTTP.get('Problems')
                    .then(resp => {
                        commit('setProblems', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async updateProblem ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.put('Problems/' + payload.id, JSON.stringify(payload))
                    .then(resp => {
                        dispatch('updateList',resp.data)
                            .then(resolve(resp))
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async createProblem ({dispatch,rootState}, payload) {
            payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

            return new Promise((resolve, reject) => {
                HTTP.post('Problems/', JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getProblems')
                            .then(() => {
                                resolve(resp)
                            })

                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteProblem ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.delete('Problems/' + payload.id)
                    .then(resp => {
                        dispatch('getProblems')
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteProblemGraph({dispatch}, payload) {
            try {

                var query = gql`mutation DeleteProblem($id: ID!){
                                  deleteProblem(
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
                await dispatch('getProblemsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async updateProblemGraph({dispatch,commit}, payload) {
            try {
                let query = gql`mutation UpdateProblem(    
                                    $id: ID!,
                                    $idN: Int, 
                                    $CodeD: String,
                                    $Description: String,
                                    $Name: String, 
                                    $Days: String
                                  )
                                  {
                                  updateProblem(
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
                    commit('setActiveItem',res.data.updateProblem);
                    commit('setStatus','view');
                    dispatch('getProblemsGraph');
                });
            } catch (error) {
                console.error(error);
            }
        },
        async createProblemGraph({commit, getters,rootState}, payload) {
            try {

                payload.id = getters.getNewId;
                payload.idN = payload.id;
                payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

                let query = gql`mutation CreateProblem(
                                        $id: ID!,
                                        $idN: Int!,
                                        $CodeD: String!,
                                        $Description: String!,
                                        $Name: String!, 
                                        $Days: String!
                                        $patientId: Int
                                    ){
                                        createProblem(
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
                    commit('addProblem', response.data.createProblem);
                    commit('setActiveItem',response.data.createProblem);
                    commit('setStatus','view')

                });
            } catch (error) {
                console.error(error);
            }
        },
        async getProblemsGraph({commit}) {
            try {

                let query = gql`{
                                  problems {
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
                    commit('setProblems', response.data.problems);
                });
            } catch (error) {
                console.error(error);
            }
        },
        async updateList({commit, state}, payload) {
            return new Promise((resolve) => {
                state.problems.forEach((item, i) => {
                    if (item.id == payload.id) {
                        commit('setProblem', {index: i, value: payload});
                        resolve()
                    }
                });
            })
        },
        async getTerms({commit}) {
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
