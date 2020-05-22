import {HTTP} from './axiosProxyBroker'
import {result, map} from 'lodash'

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
            return map(state.adverse_reactionsList, e => ({
                id: e._id_,
                name: e.adverse_reaction_event_name,
                substance: e.adverse_reaction_substance,
                severity: e.adverse_reaction_severity,
                comment: e.adverse_reaction_comment,

            }));
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
        fetchAdverse_reactionsList({commit, rootState}) {

            HTTP.post('/adverse_reactions', {
                cookieRequest: rootState.auth.cookie,
                csfttoken: rootState.auth.crfstoken,

            }).then((res) => {
                console.log(res);

                res = result(res.data, 'content.c0001');

                commit('setAdverse_reactionsList', res);
            }).catch((err) => {
                console.log(err);
            });

        },

        fetchNameAllowed({commit}) {
            HTTP.get('/adverse_reactions/list')
                .then((res) => {
                    commit('setNameAllowed', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },

        fetchSeverityList({commit}) {
            HTTP.get('/severity/list')
                .then((res) => {
                    commit('setSeverityList', res.data);
                }).catch((err) => {
                console.log(err);
            });
        },
        addItem(context, newItem) {
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });


            let adverse_reactionsList = context.state.adverse_reactionsList;
            let item = {};


            item._id_ = uuid;
            item._fake_id = Math.random();

            item.adverse_reaction_comment = newItem.CommentLine;
            item.adverse_reaction_event_name = newItem.EventName;
            item.adverse_reaction_severity = newItem.Severity;
            item.adverse_reaction_substance = newItem.Substance;
            
            adverse_reactionsList.push(item);


            context.commit('setAdverse_reactionsList', adverse_reactionsList);
            context.dispatch('putDataToServer');
            context.commit('setActiveItem', {
                id: item._id_,
                name: item.adverse_reaction_event_name,
                substance: item.adverse_reaction_substance,
                severity: item.adverse_reaction_severity,
                comment: item.adverse_reaction_comment,
            });


        },

        putDataToServer({state, rootState, dispatch}) {
            HTTP.post('/adverse_reactions/store',
                {
                    cookieRequest: rootState.auth.cookie,
                    csfttoken: rootState.auth.crfstoken,
                    dataToSave: JSON.stringify(state.adverse_reactionsList),
                }).then((res) => {
                console.log(res);
                dispatch('fetchAdverse_reactionsList');
            }).catch((res) => {
                console.log(res)
            });
        }

    },
}


