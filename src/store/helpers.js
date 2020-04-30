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

export const problemsState = arrNames => ({
    ...mapState('problems', [
        ...arrNames,
    ]),
});

export const problemsActions = arrNames => ({
    ...mapActions('problems', [
        ...arrNames,
    ]),
});

export const patientsState = arrNames => ({
    ...mapState('patients', [
        ...arrNames,
    ]),
});
export const patientsActions = arrNames => ({
    ...mapActions('patients', [
        ...arrNames,
    ]),
});


export const adverse_eventsState = arrNames => ({
    ...mapState('adverse_events', [
        ...arrNames,
    ]),
});

export const adverse_eventsActions = arrNames => ({
    ...mapActions('adverse_events', [
        ...arrNames,
    ]),
});
