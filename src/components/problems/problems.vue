<template>
    <b-row>
        <b-col cols="6" sm="6"> Main Content
            <b-card
                    border-variant="secondary"
                    header="Main"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="left"
            >
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
                            selectable
                            id="problemsTable"
                            ref="problemsTable"
                            select-mode="single"
                            primary-key="id"
                            responsive="sm"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            @row-clicked="setActiveItem"
                    ></b-table>

                    <b-button variant="primary"
                              class="float-right ml-3"
                              @click="createProblem">
                        Create
                    </b-button>

                    <div>
                        Sorting By:
                        <b>{{ sortBy }}</b>, Sort Direction:
                        <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
                    </div>
                </div>
            </b-card>
        </b-col>
        <b-col cols="6" sm="6">
            <editProblem v-if="status == 'edit'"
                            :itemProp="activeItem"
                            @editComplete="editComplete"
                            @cancel="cancel"
            />

            <createProblem
                    v-if="status == 'create'"
                    @createComplete="createComplete"
                    @cancel="cancel"
            />

            <b-card
                    v-if="status == 'view' && activeItem"
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

                <b-card-footer
                        footer-bg-variant="white"
                        footer-border-variant="white">

                    <b-button
                            v-if="activeItem"
                            variant="primary"
                            class="float-right ml-3"
                            @click="editProblem">
                        Edit
                    </b-button>
                    <b-button
                            v-if="activeItem"
                            variant="outline-danger"
                            class="float-right"
                            @click="deleteProb">
                        Delete
                    </b-button>
                </b-card-footer>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>


    import {
        problemsActions
    } from '@/store/helpers';
    import {mapGetters} from 'vuex';
    import editProblem from './edit.vue';
    import createProblem from './create.vue';
    import {CONFIG} from '../../store/config';

    export default {
        name: "problems",
        data() {
            return {
                sortBy: "id",
                sortDesc: false,
                fields: [
                    {
                        key: 'id',
                        sortable: true,
                        label: "id"

                    },
                    {key: "CodeD", sortable: true},

                    {key: "Name", sortable: false},
                    {key: "Days", sortable: false}
                ],filter: null,
                filterOn: [],
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
            ...mapGetters({
                problems: 'problems/getProblems'
            }),

            activeItem: {
                get () {
                    if(this.$store.state.problems.activeItem) {
                        this.$nextTick(function () {
                            this.selectRow(this.$store.state.problems.activeItem.id);
                        })
                    }
                    return this.$store.state.problems.activeItem;
                },
                set (value) {
                    this.$store.commit('problems/setActiveItem', value)
                }
            },
            status: {
                get () {
                    return this.$store.state.problems.status;
                },
                set (value) {
                    this.$store.commit('problems/setStatus', value)
                }
            },
        },
        components: {
            editProblem,
            createProblem
        },
        watch: {
            show(newVal) {
                console.log("Alert is now " + (newVal ? "visible" : "hidden"));
            }
        },
        methods: {
            toggle() {
                this.show = !this.show;
            },
            dismissed() {
                console.log("Alert dismissed");
            },
            ...problemsActions([
                'makeRequest',
            ]),
            setActiveItem (item) {
                this.status = 'view';
                this.activeItem = item;
            },
            editProblem() {
                this.status = 'edit';
            },
            createComplete () {
                this.status = 'view';
                this.activeItem = this.problems[this.problems.length - 1] ;
                this.selectRow(this.activeItem.id);
            },
            editComplete (item) {
                this.status = 'view';
                this.activeItem = item;
                this.selectRow(this.activeItem.id);
            },
            selectRow(id) {
                let row = document.getElementById('problemsTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#problemsTable tr')).indexOf(row) - 1;
                this.$refs.problemsTable.selectRow(index);
            },
            cancel () {
                this.status = 'view';
            },
            deleteProb () {
                this.$bvModal.msgBoxConfirm('Are you sure you want delete item?')
                    .then(value => {
                        if (value) {
                            this.makeRequest({
                                type: CONFIG.serverType,
                                action: 'delete',
                                data: this.activeItem
                            })
                                .then(() => {
                                    this.status = 'view';
                                    this.activeItem = null;
                                    this.$refs.problemsTable.clearSelected();
                                })
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    })

            },
            createProblem () {
                this.status = 'create';
                this.activeItem = null;
                this.$refs.problemsTable.clearSelected();
            }
        },
        mounted: async function() {
            this.$nextTick(function() {
                this.makeRequest({
                    type: CONFIG.serverType,
                    action: 'get'
                });
            })
        },
    }

</script>

<style scoped>

</style>
