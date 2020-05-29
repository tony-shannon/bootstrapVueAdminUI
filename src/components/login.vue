<template>
    <div class="login-page">
        <div>
            <b-row>
                <b-col xs="3" sm="3" lg="3">
                    <label for="password">Login:</label>
                </b-col>

                <b-col xs="6" sm="6" lg="4">
                    <b-form-input v-model="login"></b-form-input>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="3" sm="3" lg="3"><label for="password">Password:</label></b-col>
                <b-col xs="6" sm="6" lg="4">
                    <b-form-input id="password" type="password" v-model="password"></b-form-input>
                </b-col>

            </b-row>
            <hr/>
            <b-row>
            <b-col xs="3" sm="3" lg="3"><label for="password">Cookie:</label></b-col>
            <b-col xs="6" sm="6" lg="4">
                <b-form-input id="password" type="text" v-model="cookie"></b-form-input>
            </b-col>

            </b-row>
            <b-row>
            <b-col xs="3" sm="3" lg="3"><label for="password">Token:</label></b-col>
            <b-col xs="6" sm="6" lg="4">
                <b-form-input id="password" type="text" v-model="token"></b-form-input>
            </b-col>

            </b-row>
            <b-button @click="clickLogin">Login</b-button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';

    export default {
        name: "login",
        data() {
            return {
                login: "",
                password: "",
                cookie: "",
                token: "",
            }
        },
        methods: {
            ...mapActions('auth', {
                loginUser: "login",
                setCookie: "setCookie",
                setCSFR: "setCSFR",

            }),

            ...mapMutations({
                setActivePatient: 'patients/setActiveItem',
                setSelectedPatient: 'patient/setPatient'
            }),
            clickLogin() {

                this.setCSFR(this.token);
                this.setCookie(this.cookie);

                this.setActivePatient(null);
                this.setSelectedPatient(null);

                this.loginUser({login: this.login, password: this.password}).then(() => {

                    this.$router.push({name: 'patients'}).catch((err) => {
                        console.log(err)
                    });
                });

            }
        }
    }
</script>

<style scoped>
    .login-page {
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
