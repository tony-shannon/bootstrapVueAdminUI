<template>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col cols="12" sm="12">
                <Header/>
                <b-row>
                    <b-col cols="2" sm="2">
                    <LeftNav />
                    </b-col>
                    <b-col cols="10">
                        <router-view />
                    </b-col>
                </b-row>
                <Footer />
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
    import Header from './layout/header.vue'
    import Footer from './layout/footer.vue'
    import LeftNav from './layout/leftNav.vue'

    export default {
        components: {
            Header,
            Footer,
            LeftNav
        },
        data() {
            return {
            };
        },
    };
</script>