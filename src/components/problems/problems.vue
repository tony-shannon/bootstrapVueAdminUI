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
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <div>
                <b-table
                        :items="problems"
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
        <b-col cols="6" sm="6">Detail Content
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
        problemsState,
        problemsActions
    } from '@/store/helpers';

    export default {
        name: "problems",
        data() {
            return {
                sortBy: "ID",
                sortDesc: false,
                fields: [
                    {key: "ID", sortable: true},
                    {key: "CodeD", sortable: true},
                    {key: "Description", sortable: true},
                    {key: "Name", sortable: false},
                    {key: "Days", sortable: false}
                ],
                // items: [
                //     {
                //         isActive: true,
                //         age: 40,
                //         first_name: "Asthma",
                //         last_name: "severe"
                //     },
                //     {isActive: false, age: 21, first_name: "Diabetes", last_name: "mild"},
                //     {isActive: false, age: 89, first_name: "COPD", last_name: "mild"},
                //     {
                //         isActive: true,
                //         age: 38,
                //         first_name: "Alopecia",
                //         last_name: "moderate"
                //     }
                // ],
                filter: null,
                filterOn: [],
                activeItem: null
            };
        },

        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return {text: f.label, value: f.key};
                    });
            },
            ...problemsState([
                'problems',
            ]),
        },
        watch: {
            show(newVal) {
                console.log("Alert is now " + (newVal ? "visible" : "hidden"));
            }
        },
        methods: {
            toggle() {
                console.log("Toggle button clicked");
                this.show = !this.show;
            },
            dismissed() {
                console.log("Alert dismissed");
            },
            ...problemsActions([
                'getProblems',
            ]),
            setActiveItem (item) {
                this.activeItem = item;
            }
        },
        mounted: async function() {
            this.$nextTick(function() {
                this.getProblems();
            })
        },
    }

</script>

<style scoped>

</style>