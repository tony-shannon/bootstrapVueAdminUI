import {HTTP} from './axios'
import {CONFIG} from "./config";
const initialState = {
    adverse_events: []
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
        }
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
        async createAdverse_Event ({dispatch}, payload) {
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
                await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `mutation{
                                  deleteAdverse_Event(
                                    where: {
                                        id: "`+ payload.id +`"
                                  
                                    }
                                  )
                                  {
                                  id
                                  idN
                                   }
                                }`
                    }
                });
                await dispatch('getAdverse_EventsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async updateAdverse_EventGraph({dispatch}, payload) {
            try {
                await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `mutation{
                                  updateAdverse_Event(
                                    data: {
                                                idN: `+ payload.id +`,
                                                Type: "`+ payload.Type +`",
                                                CodeD: "`+ payload.CodeD +`",
                                                Description: "`+ payload.Description +`",
                                                Name: "`+ payload.Name +`"
                                                Days: "`+ payload.Days +`"
                                            }
                                  where:
                                  {
                                     id: "`+ payload.id +`"    
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
                                }`
                    }
                });
                await dispatch('getAdverse_EventsGraph');
            } catch (error) {
                console.error(error);
            }
        },
        async createAdverse_EventGraph({commit, getters}, payload) {
            try {
                let id = getters.getNewId;
                let result = await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `mutation{
                                        createAdverse_Event(
                                            data: {
                                                id: "`+ id +`",
                                                idN: `+ id +`,
                                                Type: "`+ payload.Type +`",
                                                CodeD: "`+ payload.CodeD +`",
                                                Description: "`+ payload.Description +`",
                                                Name: "`+ payload.Name +`"
                                                Days: "`+ payload.Days +`"
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
                                        }`
                    }
                });
                commit('addAdverse_Event', result.data.data.createAdverse_Event);
            } catch (error) {
                console.error(error);
            }
        },
        async getAdverse_EventsGraph({commit}) {
            try {
                let result = await HTTP({
                    method: "POST",
                    url: CONFIG.graphUrl,
                    data: {
                        query: `{
                                  adverse_Events {
                                    id
                                    idN
                                    CodeD
                                    Description
                                    Type
                                    Name
                                    Days
                                  }
                                }`
                    }
                });
                commit('setAdverse_Events', result.data.data.adverse_Events);
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
