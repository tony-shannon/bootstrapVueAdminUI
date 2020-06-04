<template>
    <div class="login-page">
        <div class="icon">
            <b-icon icon="terminal" size="lg" aria-hidden="true"></b-icon>
        </div>
        <b-card
                style="max-width: 20rem;"
        >
            <b-card-body lg="5" sm="8">
            <b-row class="login-page__input">
                <b-col sm="12" >
                    <label for="password">Login:</label>
                </b-col>

                <b-col sm="12">
                    <b-form-input v-model="login"></b-form-input>
                </b-col>
            </b-row>
            <b-row class="login-page__input">
                <b-col sm="12"><label for="password">Password:</label></b-col>
                <b-col sm="12">
                    <b-form-input id="password" type="password" v-model="password"></b-form-input>
                </b-col>

            </b-row>
            <b-row class="login-page__input">
                <b-col sm="12">
                <b-form-checkbox
                        id="checkbox-1"
                        name="checkbox-1"
                        value="accepted"
                        unchecked-value="not_accepted"
                >
                    Remember me
                </b-form-checkbox>
                </b-col>
            </b-row>
            <b-button pill block variant="primary" @click="clickLogin">Login</b-button>

            </b-card-body>
            <template v-slot:footer>
                <a href="#" >New around here? Sign Up</a><br/>
                <a href="#"> Forgot password?</a>
            </template>

        </b-card>
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


            }),

            ...mapMutations({
                setActivePatient: 'patients/setActiveItem',
                setSelectedPatient: 'patient/setPatient'
            }),
            clickLogin() {


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
        align-content: center;
        align-items: center;
    }
    .login-page__input{
        padding-bottom: 10px;
    }
    .not-logged-in-container::v-deep{
    }
    .icon{
        font-size: 120px;
        color: white;
    }
</style>
