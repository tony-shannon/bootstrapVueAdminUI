import {
    mapActions, mapState,
} from 'vuex';

// Users

export const medicationsState = arrNames => ({
    ...mapState('medications', [
        ...arrNames,
    ]),
});

export const medicationsActions = arrNames => ({
    ...mapActions('medications', [
        ...arrNames,
    ]),
});