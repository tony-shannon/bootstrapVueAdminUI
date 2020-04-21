import {HTTP} from './axios'
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
    },
    actions: {
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
