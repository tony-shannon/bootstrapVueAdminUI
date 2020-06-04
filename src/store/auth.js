import {HTTP} from "./axios";
import {first} from "lodash";

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
        cookie: (state, cookie) => state.cookie = cookie,
        crfstoken: (state, token) => state.crfstoken = token,
        role: (state,role) => state.role = role,
    },

    getters: {
        token: state => state.token,
        cookie: state => state.cookie,
        crfstoken: state => state.crfstoken,

        isAuth: state => {
            return state.token != null;
        },

        role: state => state.role,
        canEdit: state => {
            if (state.role === 'patient') return false;
            return true;
        },
        canDelete: state => {
            if (state.role === 'patient') return false;
            return true;
        },
        canCreate: state => {
            if (state.role === 'patient') return false;
            return true;
        },
        canClose: state => {
            if (state.role === 'patient') return false;
            return true;
        }
    },
    actions: {
        setToken: (state, token) => state.token = token,
        setCookie: ({commit}, cookie) => {
            commit('cookie', cookie);

        },
        setCSFR: ({commit}, crfs) => {
            commit('crfstoken', crfs)
        },


        login: ({commit,rootState}, {login, password}) => {
            if (login === 'ts') {
                commit('role', 'doctor');
            } else {
                commit('role', 'patient');
                HTTP.get('Patients')
                    .then(resp => {
                        commit('setPatients', resp.data)
                        let patient = first(resp.data);
                        rootState.patient.patientId = patient.id;
                        rootState.patient.patient = patient;
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }
            commit('token', login + password);

            return true;


        },


        loginRest: ({commit}, login, password) => {
            // JSON Server doen't supports custom buisneess logic.
            commit('token', login + password);
        },
        logout: ({commit}) => {
            commit('token', null);
            commit('role', null);
        }
    },
}


