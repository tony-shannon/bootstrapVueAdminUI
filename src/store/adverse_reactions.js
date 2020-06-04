import {HTTP} from './axiosProxyBroker'
import {result, map, filter} from 'lodash'

const state = () => ({
    adverse_reactionsList: [],
    nameAllowed: [],
    severity: [],
    status: 'view',
    activeItem: null,
});

export default {
    namespaced: true,

    state,

    getters: {
        nameAllowed: (state) => state.nameAllowed,
        list: (state) => {
            return state.adverse_reactionsList
        },
        severity: (state) => state.severity,
    },

    mutations: {
        setNameAllowed: (state, nameAllowed) => state.nameAllowed = nameAllowed,
        setAdverse_reactionsList: (state, list) => state.adverse_reactionsList = list,
        setActiveItem: (state, item) => state.activeItem = item,
        setSeverityList: (state, list)=>state.severity = list,
    },

    actions: {
        fetchAdverse_reactionsList({commit}) {

            HTTP.get('Allergiers').then((res) => {
                commit('setAdverse_reactionsList', res.data);
            }).catch((err) => {
                console.log(err);
            });

        },

        fetchNameAllowed({commit}) {
            HTTP.get('AllergierReactionsAllowed')
                .then((res) => {
                    commit('setNameAllowed', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },

        fetchSeverityList({commit}) {
            HTTP.get('Severity')
                .then((res) => {
                    commit('setSeverityList', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },
        addItem(context, newItem) {
            HTTP.post('Allergiers/', JSON.stringify(newItem))
                .then(() => {
                    context.dispatch('fetchAdverse_reactionsList');
                })
                .catch(err => {
                    console.log(err)
                })
        },
        replaceItem(context, newItem) {
            HTTP.put('Allergiers/' + newItem.id, JSON.stringify(newItem))
                .then(res => {
                    console.log(res);
                    context.dispatch('fetchAdverse_reactionsList');
                    context.commit('setActiveItem', newItem);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteItem(context, itemToDelete){
            HTTP.delete('Allergiers/' + itemToDelete.id)
                .then(() => {
                    context.dispatch('fetchAdverse_reactionsList')
                })
                .catch(err => {
                    console.log(err);
                })
        },
        putDataToServer({}) {
          /*  HTTP.post('/adverse_reactions/store',
                {
                    cookieRequest: rootState.auth.cookie,
                    csfttoken: rootState.auth.crfstoken,
                    dataToSave: JSON.stringify(state.adverse_reactionsList),
                }).then((res) => {
                console.log(res);
                dispatch('fetchAdverse_reactionsList');
            }).catch((res) => {
                console.log(res)
            });*/
        }

    },
}


