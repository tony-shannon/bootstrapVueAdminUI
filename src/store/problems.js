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

    },
};
