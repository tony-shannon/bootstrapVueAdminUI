import {GRAPHQL} from "./graphql";
import gql from "graphql-tag/lib/graphql-tag.umd";
import {CONFIG} from "./config";

const state = () => ({
    token :null,
});

export default{
    namespaced: true,

    state,

    mutations: {
        token: (state, token) => state.token = token,
    },

    getters:{
       token: state => state.token,
       isAuth: state => {
           return state.token
       }
    },
    actions:{
        setToken: (state,token) => state.token = token,

        login: ({ dispatch},login,password) => {
            if (CONFIG.serverType == 'rest') {
                dispatch('loginRest', login,password);
            }else{
                dispatch('loginGraph', login,password);

            }
        },

        loginGraph: ({commit}, login, password)=>{

            const query = gql`mutation TokenRetrive($login: String!, $password: String!){
                obtainToken(data:{
                    login: $login,
                    password: $password,
                }){
                    token
                }
            }`;
            const variables = {
                login: login,
                password: "ANY"+password,
            };

            return GRAPHQL.mutate({
                mutation: query,
                variables: variables,
            }).then((res)=>{
                commit('token',res.data.obtainToken.token);

            });
        },

        loginRest:({commit}, login,password)=>{
            // JSON Server doen't supports custom buisneess logic.
             commit('token',login+password);
        },
        logout: ({ commit})=>{
            commit('token',null);
        }
    },
}


