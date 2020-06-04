<template>
    <div>
        <b-table :items="items" thead-class="mobile-table-thead" :fields="fields" caption-top>
            <template v-slot:cell(severity)="data">
                <span v-if="data && data.item.severity && data.item.severity.toUpperCase()==='Mild'.toUpperCase()">
                    <span style="color: darkred">
                        Mild
                    </span>
                </span>
                <span v-if="data && data.item.severity && data.item.severity.toUpperCase() && data.item.severity==='Severe'.toUpperCase()">
                    <span style="color: darkgrey">
                        Severe
                    </span>
                </span>
                <span v-if="data && data.item.severity && data.item.severity.toUpperCase() === 'Moderate'.toUpperCase()">
                    <span style="color: orange">
                        Moderate
                    </span>
                </span>

            </template>
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
