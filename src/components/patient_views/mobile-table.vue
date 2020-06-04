<template>
    <div>
        <b-table :items="items" thead-class="mobile-table-thead" :fields="fields" caption-top>

        </b-table>
    </div>
</template>

<script>
    export default {
        name: "mobile-table",
        props: {
            items: {
                type: Array,
                default: () => [],
            },
            fields: {
                type: Array,
                default: () => [],

            }
        }
    }
</script>

<style >

</style>
