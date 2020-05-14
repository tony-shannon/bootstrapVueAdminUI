import {GRAPHQL} from "./graphql";
import gql from "graphql-tag/lib/graphql-tag.umd";
//import axios from "axios";

const state = () => ({
    token: null,
    cookie: '',
    crfstoken: '',
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
        isAuth: state => {
            return state.token
        }
    },
    actions: {
        setToken: (state, token) => state.token = token,
        setCookie: ({commit}, cookie) =>{
            commit('cookie',cookie);

        },
        setCSFR: ({commit},crfs) =>{
            commit('crfstoken',crfs)
        },


        login: ({dispatch, commit}, {login, password}) => {
            commit('token', '11111111111');
            dispatch('loginGraph', {login: login, password: password}).catch((err) => {
                console.log(err);
            });
            return true;


        },

        loginGraph: async ({commit}, {login, password}) => {

          /*  axios.post('http://localhost:5000/login',{
                cookie: 'Cookie: pk_ses.1.dedb=*; csrftoken=4txE5acX64rBekyec3nwZgRgAu9fV3w6jEYdSfh7Z8LRkN5FXzsqZDJ5k5eEGrEx; sessionid_saas=h84l3mwhqtgdoj8cg1u1ilk4jnkzb13f; pk_id.1.dedb=549b827e438334cc.1588926653.11.1589464060.1589464049.'
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })*/


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
                context: {
                    headers: {
                        Origin: 'https://tony-staging.openappregistry.com',
                        Referrer: 'https://tony-staging.openappregistry.com/login',
                        Cookie: 'csrftoken=FIGdr4Y7Ol76MuIrUQy8oXQ5DoSanxywIFDPoTwfa3rTSVDOk82SIs1AQAvaipOY; sessionid_saas=4q51w6z8heo2sewf5xt2ukgu28njx2lg; _pk_ses.1.dedb=*; _pk_id.1.dedb=2c119dd535756fd3.1589450290.1.1589450547.1589450290.'
                    }
                }

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


