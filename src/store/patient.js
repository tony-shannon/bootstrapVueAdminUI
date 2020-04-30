const state = () => ({
    patientId : null,
    patient: null,
});

export default{
    namespaced: true,

    state,

    mutations: {
        setPatientId: (state, patientId) => state.patientId = patientId,
        setPatient: (state, patient) => state.patient = patient,
    },

    getters:{
        patientId : state => state.patientId,
        patient: state => state.patient,
    },
    actions:{
        getPatientId: state => state.patientId,
        getPatient : state => state.patient,
    },
}


