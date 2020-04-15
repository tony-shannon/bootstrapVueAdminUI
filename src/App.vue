<template>
    <b-container fluid class="bv-example-row">
        <b-row>
            <b-col cols="12" sm="12">
                <HeaderEl/>
                <b-row>
                    <b-col cols="2" sm="2">
                    <LeftNav />
                    </b-col>
                    <b-col cols="10">
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
    };
</script>