<template>
    <b-row>
            <b-col cols="6" sm="6">Main Content
                <b-col lg="6" class="my-1">
                    <b-form-group
                            label="Filter"
                            label-cols-sm="3"
                            label-align-sm="right"
                            label-size="sm"
                            label-for="filterInput"
                            class="mb-0"
                    >
                        <b-input-group size="sm">
                            <b-form-input
                                    v-model="filter"
                                    type="search"
                                    id="filterInput"
                                    placeholder="Type to Search"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!filter" @click="filter = null">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <div>
                    <b-table
                            :items="medications"
                            :fields="fields"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            responsive="sm"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            @row-clicked="setActiveItem"
                    ></b-table>

                    <div>
                        Sorting By:
                        <b>{{ sortBy }}</b>, Sort Direction:
                        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
                    </div>
                </div>
            </b-col>
            <b-col cols="6" sm="6">
                <b-card
                        border-variant="secondary"
                        header="Detail"
                        header-bg-variant="primary"
                        header-text-variant="white"
                        align="left"
                >
                <b-row v-for="(value, key) in activeItem" :key="key">
                    <b-col cols="12" sm="12">
                        <h5>{{key}}</h5>
                        <p>{{value}}</p>
                    </b-col>
                </b-row>
                </b-card>

            </b-col>
        </b-row>
</template>

<script>
    import {
        medicationsState,
        medicationsActions
    } from '@/store/helpers';

    export default {
        name: "medications",
        data() {
            return {
                sortBy: "ID",
                sortDesc: false,
                fields: [
                    {key: "ID", sortable: true},
                    {key: "Dose-Mg", sortable: true},
                    {key: "Name", sortable: true},
                    {key: "Route", sortable: false}
                ],
                filter: null,
                filterOn: [],
                activeItem: {}
            };
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
            setActiveItem (item) {
                this.activeItem = item;
            }
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