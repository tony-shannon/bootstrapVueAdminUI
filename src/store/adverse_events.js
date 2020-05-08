import gql from 'graphql-tag';

import {HTTP} from './axios';
import {GRAPHQL} from './graphql';
import {filter} from "lodash";

const initialState = {
    adverse_events: [],
    status: 'view',
    activeItem: null,
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        setAdverse_Events(state, payload) {
            state.adverse_events = payload;
        },
        setAdverse_Event(state, payload) {
            state.adverse_events.splice(payload.index, 1, payload.value)
        },
        addAdverse_Event (state, payload) {
            state.adverse_events.push(payload)
        },
        setStatus: (state, status) => state.status = status,
        setActiveItem: (state, activeItem) => state.activeItem = activeItem,

    },
    getters: {
        getNewId (state) {
            let lastId = 0;
            state.adverse_events.forEach((item) => {
                if (parseInt(item.idN) > lastId) {
                    lastId = parseInt(item.idN);
                }
            });
            return lastId + 1;
        },
        getAdverseEvents: function(state, getters,rootState){
            let patientId = rootState.patient.patientId;
            if(patientId){
                let data =  filter(state.adverse_events,{patientId: patientId});

                if (!data.length) {
                    state.activeItem = null;
                }
                return data;
            }else{
                return state.adverse_events;
            }
        }
    },
    actions: {
        async makeRequest({dispatch}, payload) {
            if (payload.type == 'rest') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getAdverse_Events').then();
                        break;
                    case 'create':
                        await dispatch('createAdverse_Event', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateAdverse_Event', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteAdverse_Event', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }

            if (payload.type == 'graph') {
                switch (payload.action) {
                    case 'get':
                        await dispatch('getAdverse_EventsGraph').then();
                        break;
                    case 'create':
                        await dispatch('createAdverse_EventGraph', payload.data);
                        break;
                    case 'edit':
                        await dispatch('updateAdverse_EventGraph', payload.data);
                        break;
                    case 'delete':
                        await dispatch('deleteAdverse_EventGraph', payload.data);
                        break;
                    default:
                        alert( "This action doesn't exist" );
                }
            }
        },
        async getAdverse_Events({commit}) {
            return new Promise((resolve, reject) => {
                HTTP.get('Adverse_Events')
                    .then(resp => {
                        commit('setAdverse_Events', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async updateAdverse_Event ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.put('Adverse_Events/' + payload.id, JSON.stringify(payload))
                    .then(resp => {
                        dispatch('updateList',resp.data)
                            .then(resolve(resp))
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async createAdverse_Event ({dispatch,rootState}, payload) {
            payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

            return new Promise((resolve, reject) => {
                HTTP.post('Adverse_Events/', JSON.stringify(payload))
                    .then(resp => {
                        dispatch('getAdverse_Events')
                            .then(() => {
                                resolve(resp)
                            })

                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteAdverse_Event ({dispatch}, payload) {
            return new Promise((resolve, reject) => {
                HTTP.delete('Adverse_Events/' + payload.id)
                    .then(resp => {
                        dispatch('getAdverse_Events')

                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        },
        async deleteAdverse_EventGraph({dispatch}, payload) {
            try {
                let query = gql`
                            mutation deleteAdverseEvt($idAdv: ID!){
                                  deleteAdverse_Event(
                                    where: {
                                        id: $idAdv
                                    }
                                  )
                                  {
                                    id
                                    idN
                                  }
                                }`;
                await GRAPHQL.mutate({
                    mutation: query,
                    variables: {
                        idAdv: payload.id,
                    }
                });
                await dispatch('getAdverse_EventsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async updateAdverse_EventGraph({dispatch}, payload) {
            try {
                console.log(payload);
                let query = gql`mutation updAdverseEvent(
                                    $id: ID!,
                                    $idN: Int, 
                                    $Type: String,
                                    $CodeD: String,
                                    $Description: String,
                                    $Name: String, 
                                    $Days: String
                                  ){
                                  updateAdverse_Event(
                                    data: {
                                                idN: $idN,
                                                Type: $Type,
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
                                    Type
                                    CodeD
                                    Description
                                    Name
                                    Days
                                   }
                       }`;
                await GRAPHQL.mutate({
                    mutation: query,
                    variables: payload,
                });

                await dispatch('getAdverse_EventsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async createAdverse_EventGraph({commit, getters,rootState}, payload) {
            try {
                payload.id = getters.getNewId;
                payload.idN = payload.id;
                payload.patientId = rootState.patient.patientId ?  rootState.patient.patientId : 0 ;

                let query = gql`mutation (
                                    $id: ID!,
                                    $idN: Int!,
                                    $Type: String!,
                                    $CodeD: String!,
                                    $Description: String!,
                                    $Name: String!, 
                                    $Days: String!,
                                    $patientId: Int,
                                  ){
                                        createAdverse_Event(
                                            data: {
                                                id: $id,
                                                idN: $idN,
                                                Type: $Type,
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
                                            Type
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
                    commit('addAdverse_Event', response.data.createAdverse_Event);
                });

            } catch (error) {
                console.error(error);
            }
        },
        async getAdverse_EventsGraph({commit}) {
            try {

                let query = gql`{
                                  adverse_Events {
                                    id
                                    idN
                                    CodeD
                                    Description
                                    Type
                                    Name
                                    Days
                                    patientId
                                  }
                                }`;


                await GRAPHQL.query({
                    query: query
                }).then((response)=>{
                    commit('setAdverse_Events', response.data.adverse_Events);

                });
            } catch (error) {
                console.error(error);
            }
        },
        async updateList({commit, state}, payload) {
            return new Promise((resolve) => {
                state.adverse_events.forEach((item, i) => {
                    if (item.id == payload.id) {
                        commit('setAdverse_Event', {index: i, value: payload});
                        resolve()
                    }
                });
            })
        }

    },
};
