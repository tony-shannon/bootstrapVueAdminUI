<template>
    <div class="">
        <b-row>
            <b-col sm="6">
                <div class="patient-image">
                    <img src="https://picsum.photos/seed/picsum/64/64"/>
                </div>
            </b-col>
            <b-col sm="6">
                <div><b>D.O.B:</b> {{ patient.date_of_birth }}</div>
                <div><b>Phone:</b> {{ patient.Phone }}</div>
                <div><b>Gender:</b> {{ patient.gender }}</div>
                <div><b>Medical ID:</b> {{ patient.patient_id }}</div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "mobile-patient",
        computed: {
            ...mapGetters({
                patient: 'patient/patient',
                role: 'auth/role'
            }),
        }
    }
</script>

<style scoped>
    .patient-image{
        border-radius: 40px;
        max-width: 64px;
    }
</style>
