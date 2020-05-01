<template>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col cols="12" sm="12">

                <HeaderEl/>
                <b-row class="no-margin-h border-b-gray border-r-gray">
                    <b-col cols="2" sm="2" class="left-menu-toggle  no-padding-l">
                        <font-awesome-icon icon="bars" />
                    </b-col>
                    <b-col cols="10" sm="10" class="patient-data  border-l-gray">
                        <b-row>
                            <b-col cols="6" sm="6">
                                <h3>{{ appealing }} {{ patientTemp.FirstName + " " + patientTemp.LastName }}</h3>
                                <p>Address: {{ patientTemp.Address }}</p>
                            </b-col>
                            <b-col cols="3" sm="3">
                                <p>D.O.B: {{ patientTemp.Dob }}</p>
                                <p>Phone: {{ patientTemp.Phone }}</p>
                            </b-col>
                            <b-col cols="3" sm="3">
                                <p>Gender: {{ patientTemp.Gender }}</p>
                                <p>Medical ID: {{ patientTemp.MedicalId }}</p>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="2" sm="2">
                        <LeftNav />
                    </b-col>
                    <b-col cols="10" class="m-t-15">
                        <b-breadcrumb>
                            <b-breadcrumb-item href="#home">Home</b-breadcrumb-item>
                            <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
                            <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
                            <b-breadcrumb-item active @click="crumbs">Baz</b-breadcrumb-item>
                        </b-breadcrumb>

                        <router-view />
                    </b-col>
                </b-row>
                <FooterEl />
            </b-col>
        </b-row>
    </b-container>
</template>


<style>
    body {
        padding: 1rem;
    }
</style>


<script>
    import HeaderEl from './layout/header_template.vue'
    import FooterEl from './layout/footer_template.vue'
    import LeftNav from './layout/leftNav.vue'
    import {mapGetters} from "vuex";

    export default {
        components: {
            HeaderEl,
            FooterEl,
            LeftNav
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters({
                patient: 'patient/patient',
            }),
            patientTemp: function(){
                let patient = this.patient;
                if(!patient){
                    patient = {};
                    patient.FirstName = 'John';
                    patient.LastName = 'Brown';
                    patient.Dob = '1990-01-01';
                    patient.Address = '123 Park Avenue, Dublin, Rep. of Ireland';
                    patient.Phone = '+353 45 325 4453';
                    patient.Gender = 'Male';
                    patient.MedicalId = '01234';
                }
                return patient;
            },
            appealing () {
                if (this.patientTemp.Gender == 'Male') {
                    return 'Mr.';
                } else {
                    return 'Ms.';
                }
            },

        },
        methods: {
            crumbs () {
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
        top: calc((100% - 40px)/2);
        left: calc((100% - 40px)/2 - 9.5px);
        color: #007bff;
        cursor: pointer;
    }


</style>