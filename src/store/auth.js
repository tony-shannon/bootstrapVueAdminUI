const state = () => ({
    token: null,
    cookie: '',
    crfstoken: '',
    role: '',
});

export default {
    namespaced: true,

    state,

    mutations: {
        token: (state, token) => state.token = token,
        cookie: (state,cookie) => state.cookie = cookie,
        crfstoken: (state,token) => state.crfstoken = token,
    },

    getters: {
        token: state => state.token,
        cookie: state => state.cookie,
        crfstoken: state => state.crfstoken,

        isAuth: state => {
            return state.token != null;
        },
        role: state => state.role,
    },
    actions: {
        setToken: (state, token) => state.token = token,
        setCookie: ({commit}, cookie) =>{
            commit('cookie',cookie);

        },
        setCSFR: ({commit},crfs) =>{
            commit('crfstoken',crfs)
        },


        login: ({commit}, {login, password}) => {
            commit('token', login+password);

            return true;


        },


        loginRest: ({commit}, login, password) => {
            // JSON Server doen't supports custom buisneess logic.
            commit('token', login + password);
        },
        logout: ({commit}) => {
            commit('token', null);
        }
    },
}


