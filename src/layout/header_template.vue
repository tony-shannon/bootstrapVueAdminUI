<template>
    <b-row>
        <b-col cols="12" sm="12">Header
            <div>
                <b-navbar toggleable="lg" type="dark" variant="primary">
                    <b-navbar-brand href="#">Home</b-navbar-brand>

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item href="#">Link</b-nav-item>
                            <b-nav-item href="#" disabled>Disabled</b-nav-item>
                        </b-navbar-nav>

<div class="bg-secondary text-light" align="center" v-html="patientTitle"/>
                        <!-- Right aligned nav items -->
                        <b-navbar-nav class="ml-auto">
                            <b-nav-form>
                                <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                            </b-nav-form>

                            <b-nav-item-dropdown text="Lang" right>
                                <b-dropdown-item href="#">EN</b-dropdown-item>
                                <b-dropdown-item href="#">ES</b-dropdown-item>
                                <b-dropdown-item href="#">RU</b-dropdown-item>
                                <b-dropdown-item href="#">FA</b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item-dropdown right>
                                <!-- Using 'button-content' slot -->
                                <template v-slot:button-content>
                                    <em>User</em>
                                </template>
                                <b-dropdown-item href="#">Profile</b-dropdown-item>
                                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                            </b-nav-item-dropdown>
                        </b-navbar-nav>
                    </b-collapse>
                </b-navbar>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "header_template",
        computed:{
            ...mapGetters({
                patient: 'patient/patient',
            }),
            patientTitle: function(){
                let result = "";
                let patient = this.patient;
                if(this.patient){
                   result+=patient.FirstName + " " + patient.LastName + " | ";
                   result+=patient.Age + " years | ";
                   result+=patient.Sex + " | ";
                   result+=patient.Address + "";
                }else{
                   result =" John Brown ¦ 49 years ¦ Male ¦ Shop St, Galway";
                }
                return result;
            }
        }
    }
</script>
