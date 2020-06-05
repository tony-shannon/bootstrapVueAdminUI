<template>
    <div class="mobile-patient d-md-none">
        <b-navbar toggleable="lg" type="dark" variant="primary">
            <b-navbar-brand href="#">{{appealing}} {{patient.first_name}} {{patient.family_name}}</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>


                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="clickLogout" href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>

        </b-navbar>
        <b-row class="d-flex justify-content-center pt-3">
            <div col="6" sm="6" class="align-self-center mobile-patient-mgr">
                <div class="patient-image">
                    <img class="rounded-circle" style="width: 64px;" src="https://i.ibb.co/N60zXfR/man-in-black-suit-jacket-smiling-3831569.jpg"/>
                </div>
            </div>
            <div col="6" sm="6">
                <div><b>D.O.B:</b> {{ patient.date_of_birth }}</div>
                <div><b>Phone:</b> {{ patient.Phone }}</div>
                <div><b>Gender:</b> {{ patient.gender }}</div>
                <div><b>Medical ID:</b> {{ patient.patient_id }}</div>
            </div>
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
            appealing() {
                if (this.patient.gender == 'Male') {
                    return 'Mr.';
                } else {
                    return 'Ms.';
                }
            },
        },
        methods:{

        }
    }
</script>

<style scoped>
    .patient-image{
        border-radius: 40px;
        max-width: 64px;
    }
    .mobile-patient{
        width: 100%;
        background: #4e555b;
        color: white;
        padding-bottom: 16px;
    }
    .mobile-patient-mgr{
        margin-right: 20px;
    }

</style>
