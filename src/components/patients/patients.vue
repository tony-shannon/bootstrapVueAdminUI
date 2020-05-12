<template>
    <b-row>
        <b-col cols="12" sm="12"> Main Content
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
                                    v-model="search"
                                    type="search"
                                    id="filterInput"
                                    placeholder="Type to Search"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button :disabled="!search" @click="search = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>

                <div>
                    <b-table
                            :items="patients"
                            :fields="fields"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            selectable
                            id="patientsTable"
                            ref="patientsTable"
                            select-mode="single"
                            primary-key="id"
                            responsive="sm"
                            :filter="search"
                            :filterIncludedFields="filterOn"
                            @row-clicked="setActiveItem"
                    ></b-table>

                    <b-button variant="primary"
                              class="float-right ml-3"
                              @click="createPatient">
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
            <editPatient v-if="status == 'edit'"
                            :itemProp="activeItem"
                            @editComplete="editComplete"
                            @cancel="cancel"
            />

            <createPatient
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
                    <b-button v-if="activeItem"
                              class="float-left ml-3"
                              @click="setPatient(activeItem)">
                        Select Patient
                    </b-button>
                    <b-button
                            v-if="activeItem"
                            variant="primary"
                            class="float-right ml-3"
                            @click="editPatient">
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
    import {mapMutations} from 'vuex'

    import {
        patientsState,
        patientsActions
    } from '@/store/helpers';

    import editPatient from './edit.vue';
    import createPatient from './create.vue';
    import {CONFIG} from '../../store/config';

    export default {
        name: "patients",
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
                    {key: "created_date", sortable: true, label: 'Created'},
                    {key: "first_name", sortable: true, label: 'First Name'},
                    {key: "family_name", sortable: true, label: 'Family Name'},
                    {key: "date_of_birth", sortable: true, label: 'DOB'},
                    {key: "gender", sortable: false, label: 'Gender'},
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

            activeItem: {
                get () {
                    if(this.$store.state.patients.activeItem) {
                        this.$nextTick(function () {
                            this.selectRow(this.$store.state.patients.activeItem.id);
                        })
                    }
                    return this.$store.state.patients.activeItem;
                },
                set (value) {
                    this.$store.commit('patients/setActiveItem', value)
                }
            },
            status: {
                get () {
                    return this.$store.state.patients.status;
                },
                set (value) {
                    this.$store.commit('patients/setStatus', value)
                }
            },

            search: {
                get () {
                    return this.$store.state.search.input;
                },
                set (value) {
                    this.$store.commit('search/setInput', value)
                }
            },
            ...patientsState([
                'patients',
            ]),
        },
        components: {
            editPatient,
            createPatient
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
            ...patientsActions([
                'makeRequest',
            ]),
            ...mapMutations('patient',{
                setActivePatient: 'setPatient',
                setPatientId: 'setPatientId',
            }),
            setActiveItem (item) {
                this.status = 'view';
                this.activeItem = item;
            },
            editPatient() {
                this.status = 'edit';
            },
            createComplete () {
                this.status = 'view';
                this.activeItem = this.patients[this.patients.length - 1] ;
                this.selectRow(this.activeItem.id);
            },
            editComplete (item) {
                this.status = 'view';
                this.activeItem = item;
                this.selectRow(this.activeItem.id);
            },
            selectRow(id) {
                let row = document.getElementById('patientsTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#patientsTable tr')).indexOf(row) - 1;
                this.$refs.patientsTable.selectRow(index);
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
                                    this.$refs.patientsTable.clearSelected();
                                })
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    })

            },
            createPatient () {
                this.status = 'create';
                this.activeItem = null;
                this.$refs.patientsTable.clearSelected();
            },
            setPatient(item){
                this.setActivePatient(item);
                this.setPatientId(parseInt(item.id));
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
