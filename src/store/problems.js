import axios from 'axios'

const initialState = {
    problems: []
};

var URL2Go='http://localhost:3000' // use in localenv
// get URL2Go from gp url 3000 in gitpod
//var URL2Go= 'https://3000-ade12ef9-f9f8-46d9-adbf-9503cba33f23.ws-eu01.gitpod.io';

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
                axios({url: URL2Go + '/Problems',  method: 'GET' })
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
