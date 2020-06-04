<template>
    <b-container fluid class="bv-example-row" :style="this.containerStyle">
        <b-row v-if="isLoggedIn">
            <b-col cols="12" sm="12">

                <HeaderEl/>
                <b-row class="no-margin-h border-b-gray border-r-gray">
                    <b-col cols="2" sm="2" class="left-menu-toggle  no-padding-l">
                        <font-awesome-icon icon="bars"/>
                    </b-col>
                    <b-col cols="10" sm="10" class="patient-data  border-l-gray">
                        <b-row v-if="patient">
                            <b-col cols="6" sm="6">
                                <h3>{{ appealing }} {{ patientTemp.first_name + " " + patientTemp.family_name }}</h3>
                                <p>Address: {{ patientTemp.Address }}</p>
                            </b-col>
                            <b-col cols="3" sm="3">
                                <p>D.O.B: {{ patientTemp.date_of_birth }}</p>
                                <p>Phone: {{ patientTemp.Phone }}</p>
                            </b-col>
                            <b-col cols="3" sm="3">
                                <p>Gender: {{ patientTemp.gender }}</p>
                                <p>Medical ID: {{ patientTemp.patient_id }}</p>
                            </b-col>
                        </b-row>
                        <b-row v-else>
                            <b-col cols="6" sm="6">
                                <h3>Professional View: Patient List</h3>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="2" sm="2">
                        <LeftNav/>
                    </b-col>
                    <b-col cols="10" class="m-t-15">
                        <b-breadcrumb>
                            <b-breadcrumb-item href="#home">Home</b-breadcrumb-item>
                            <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
                            <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
                            <b-breadcrumb-item active @click="crumbs">Baz</b-breadcrumb-item>
                        </b-breadcrumb>

                        <router-view/>
                    </b-col>
                </b-row>
                <FooterEl/>
            </b-col>
        </b-row>
        <b-row class="not-logged-in" v-else>

            <div class="not-logged-in-container">
                <router-view/>
            </div>
        </b-row>
    </b-container>
</template>




<script>
    import HeaderEl from './layout/header_template.vue'
    import FooterEl from './layout/footer_template.vue'
    import LeftNav from './layout/leftNav.vue'
    import {mapGetters, mapActions} from "vuex";
    import {PATIENT_IS_SELECTED_LINKS, PATIENT_NOT_SELECTED_LINKS} from "./mocking/links";

    export default {
        components: {
            HeaderEl,
            FooterEl,
            LeftNav
        },
        data() {
            return {};
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'auth/isAuth',
                patient: 'patient/patient',

            }),
            containerStyle: function () {
                let patient = this.patient;
                if (!patient) {
                    // patient = {};
                    // patient.first_name = 'Patient';
                    // patient.family_name = 'Banner';
                    // patient.date_of_birth = '1990-01-01';
                    // patient.Address = '123 Park Avenue, Dublin, Rep. of Ireland';
                    // patient.Phone = '+353 45 325 4453';
                    // patient.gender = 'Male';
                    // patient.patient_id = '01234';
                    this.setLinks(PATIENT_NOT_SELECTED_LINKS);
                } else {
                    this.setLinks(PATIENT_IS_SELECTED_LINKS);
                }
                return '';
            },
            patientTemp: function () {
                let patient = this.patient;
                if (!patient) {
                    // patient = {};
                    // patient.first_name = 'Patient';
                    // patient.family_name = 'Banner';
                    // patient.date_of_birth = '1990-01-01';
                    // patient.Address = '123 Park Avenue, Dublin, Rep. of Ireland';
                    // patient.Phone = '+353 45 325 4453';
                    // patient.gender = 'Male';
                    // patient.patient_id = '01234';
                    this.setLinks(PATIENT_NOT_SELECTED_LINKS);
                } else {
                    this.setLinks(PATIENT_IS_SELECTED_LINKS);
                }
                return patient;
            },

            appealing() {
                if (this.patientTemp.gender == 'Male') {
                    return 'Mr.';
                } else {
                    return 'Ms.';
                }
            },

        },
        mounted() {
           /* setInterval(() => {
                if (!this.patient) {
                    this.setLinks(PATIENT_NOT_SELECTED_LINKS);
                } else {
                    this.setLinks(PATIENT_IS_SELECTED_LINKS);
                }
            }, 100);*/
        },

        methods: {
            ...mapActions({
                setLinks: 'website/setLinks'

            }),
            crumbs() {
                let pathArray = this.$route.path.split("/")
                console.log('this.$route', this.$route);
                console.log('pathArray', pathArray);
                pathArray.shift()
                console.log('pathArray', pathArray);

                let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                    let text = this.$route.matched[idx].meta.breadCrumb || path
                    breadcrumbArray.push({
                        //to: { name: 'home' },
                        path: path,
                        to: breadcrumbArray[idx - 1]
                            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
                            : "/" + path,
                        text: text.capitalize(),
                    });
                    return breadcrumbArray;
                }, [])
                console.log('breadcrumbs', breadcrumbs);
                return breadcrumbs;
            }
        }
    };
</script>
<style>
    .patient-data p {
        font-size: small;
    }

    .patient-data {
        padding-top: 10px;
        margin-left: -26px;
    }

    .left-menu-toggle {
        background-color: #f4f4f4;
        background-clip: content-box;
        padding-right: 25px;
        text-align: center;
        position: relative;
    }

    .left-menu-toggle > svg {
        position: absolute;
        font-size: 40px;
        top: calc((100% - 40px) / 2);
        left: calc((100% - 40px) / 2 - 9.5px);
        color: #007bff;
        cursor: pointer;
    }

    .not-logged-in {
        min-height: 100vh;
    }

    .not-logged-in-container {
        width: 100%;
        background: #007bff;
    }

</style>
