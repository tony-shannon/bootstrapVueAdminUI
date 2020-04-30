const state = () => ({
    input : null,
});

export default{
    namespaced: true,

    state,

    mutations: {
        setInput: (state, input) => state.input = input,
    },

    getters:{
        input : state => state.input,
    },
    actions:{
        getInput: state => state.input,
    },
}


