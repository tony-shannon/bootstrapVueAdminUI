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
                        :items="items"
                        :fields="fields"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        responsive="sm"
                        :filter="filter"
                        :filterIncludedFields="filterOn"
                        @filtered="onFiltered"
                ></b-table>

                <div>
                    Sorting By:
                    <b>{{ sortBy }}</b>, Sort Direction:
                    <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
                </div>
            </div>
        </b-col>
        <b-col cols="6" sm="6">Detail Content
            <div>
                <b-card-group>
                    <b-card title="COPD" header-tag="header" footer-tag="footer">
                        <template v-slot:header>
                            <h6 class="mb-0">Problem - Detail</h6>
                        </template>
                        <b-card-text>Detail about the COPD problem</b-card-text>
                        <b-button href="#" variant="primary">Edit</b-button>
                        <template v-slot:footer>
                            <em>Notes</em>
                        </template>
                    </b-card>
                </b-card-group>
            </div>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "problems",
        // data() {
        //   return {
        //    fields: ["first_name", "last_name", "age"],
        //   items: [
        //    { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        //    { age: 21, first_name: "Larsen", last_name: "Shaw" },
        //    { age: 89, first_name: "Geneva", last_name: "Wilson" }
        //  ]
        //};
        //},
        data() {
            return {
                sortBy: "age",
                sortDesc: false,
                fields: [
                    {key: "last_name", sortable: true},
                    {key: "first_name", sortable: true},
                    {key: "age", sortable: true},
                    {key: "isActive", sortable: false}
                ],
                items: [
                    {
                        isActive: true,
                        age: 40,
                        first_name: "Asthma",
                        last_name: "severe"
                    },
                    {isActive: false, age: 21, first_name: "Diabetes", last_name: "mild"},
                    {isActive: false, age: 89, first_name: "COPD", last_name: "mild"},
                    {
                        isActive: true,
                        age: 38,
                        first_name: "Alopecia",
                        last_name: "moderate"
                    }
                ],
                filter: null,
                filterOn: []
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
            }
        },

        //data() {
        //  return {
        //    name: 'BootstrapVue',
        //     show: true
        //   }
        //  },

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
            }
        }
    }

</script>

<style scoped>

</style>