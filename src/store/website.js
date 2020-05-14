const initialState = {
    sidebarLinks: [],

};

export default {
    namespaced: true,
    state: initialState,
    getters: {
        getSidebarLinks: (state)=> state.sidebarLinks,
    },
    mutations: {
        setSidebarLinks: (state, links)=>state.sidebarLinks = links,
    },
    actions: {
       setLinks({commit}, links){
            commit('setSidebarLinks', links);
       },
    },
}
