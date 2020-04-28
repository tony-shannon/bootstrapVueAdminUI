const MedicationMutation = {
   async createMedication(data, payload) {
        console.log(payload);
        return undefined;

    },
    deleteMedication(data, payload) {
        return undefined;
    },
    updateMedication(data, payload) {
        return undefined;
    }
};

const MedicationQuery = {
    medications: () => [{}],
};

module.exports = {
    MedicationQuery: MedicationQuery,
    MedicationMutation: MedicationMutation
};
