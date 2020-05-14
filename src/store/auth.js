import {GRAPHQL} from "./graphql";
import gql from "graphql-tag/lib/graphql-tag.umd";

const state = () => ({
    token: null,
});

export default {
    namespaced: true,

    state,

    mutations: {
        token: (state, token) => state.token = token,
    },

    getters: {
        token: state => state.token,
        isAuth: state => {
            return state.token
        }
    },
    actions: {
        setToken: (state, token) => state.token = token,

        login: ({dispatch}, {login, password}) => {

            return dispatch('loginGraph', {login: login, password: password});


        },

        loginGraph: ({commit}, {login, password}) => {

            const queryLine = `mutation Signin($login: String!, $password: String!){
                sign_in(
                    username: $login,
                    password: $password,
                ){
                    ok
                    auth_ok
                    message
                    require_password_change
                    require_otp
                    require_bat
                }
            }`;
            const query = gql`mutation Signin($login: String!, $password: String!, $input: any){
                sign_in(
                    input: $input
                )
                @rest(
                    type : "Post",
                    path : "/signon/",
                    method : "POST"
                ){
                    ok
                    auth_ok
                    message
                    require_password_change
                    require_otp
                    require_bat
                }
            }`;
            const variables = {

                input: {
                    query: queryLine,
                    operationName: 'Signin',
                    variables: {
                        login: login,
                        password: password,
                    }
                },
            };

            return GRAPHQL.mutate({
                mutation: query,
                variables: variables,
            }).then((res) => {
                if (res.data.sign_in.ok == "false") {
                    alert('Username and/or password are incorrect.');
                } else {
                    commit('token', '11111111111');

                }

            });
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


