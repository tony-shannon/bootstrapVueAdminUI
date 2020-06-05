<template>
    <div>
        <b-table :items="items" thead-class="mobile-table-thead" col-class="col-6" :fields="fields" caption-top>
            <template v-slot:cell(severity)="data">
                <span v-if="data && data.item.severity && data.item.severity.toUpperCase()==='Mild'.toUpperCase()">
                    <span style="color: green">
                        Mild
                    </span>
                </span>
                <span v-else-if="data && data.item.severity && data.item.severity.toUpperCase() && data.item.severity==='Severe'.toUpperCase()">
                    <span style="color: red">
                        Severe
                    </span>
                </span>
                <span v-else-if="data && data.item.severity && data.item.severity.toUpperCase() === 'Moderate'.toUpperCase()">
                    <span style="color: orange">
                        Moderate
                    </span>
                </span>
                <span v-else>
                    {{data.item.severity}}
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
     .mobile-table-thead  th:nth-child(1){
         min-width: 50%;
         max-width: 50%;
         width: 50%;
     }
</style>
