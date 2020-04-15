<template>
    <div>
        <ul v-for="(item, index) in medications" :key="index">
            <li v-for="(itemDesc, indexDesc) in item" :key="indexDesc">
                {{ indexDesc }} : {{ itemDesc }}
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        medicationsState,
        medicationsActions
    } from '@/store/helpers';

    export default {
        name: "medications",
        data() {
            return {};
        },
        computed: {
            ...medicationsState([
                'medications',
            ]),
        },
        methods: {
            ...medicationsActions([
                'getMedications',
            ]),
        },
        mounted: async function() {
            this.$nextTick(function() {
                this.getMedications();
            })
        },
    }
</script>

<style scoped>

</style>