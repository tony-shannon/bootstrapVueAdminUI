import {HTTP} from './axios'
const initialState = {
    problems: []
};

export default {
    namespaced: true,
    state: initialState,
    mutations: {
        setProblems(state, payload) {
            state.problems = payload;
        },
        setProblem(state, payload) {
            state.problems.splice(payload.index, 1, payload.value)
        },
    },
    actions: {
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
        async createProblem ({dispatch}, payload) {
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
        async updateList({commit, state}, payload) {
            return new Promise((resolve) => {
                state.problems.forEach((item, i) => {
                    if (item.id == payload.id) {
                        commit('setProblem', {index: i, value: payload});
                        resolve()
                    }
                });
            })
        }

    },
};
