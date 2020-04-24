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
                            id="medicationsTable"
                            ref="medicationsTable"
                            select-mode="single"
                            primary-key="id"
                            selectable
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            @row-clicked="setActiveItem"
                    ></b-table>

                    <b-button variant="primary"
                              class="float-right ml-3"
                              @click="createMedication">
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
        <b-col cols="6" sm="6" >
            <editMedication v-if="status == 'edit' && activeItem"
                            :itemProp="activeItem"
                            @editComplete="editComplete"
                            @cancel="cancel"
            />

            <createMedication
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
                            @click="editMedication">
                        Edit
                    </b-button>
                    <b-button
                            v-if="activeItem"
                            variant="outline-danger"
                            class="float-right"
                            @click="deleteMed">
                        Delete
                    </b-button>
                </b-card-footer>
            </b-card>

        </b-col>
    </b-row>
</template>

<script>
    import {
        medicationsState,
        medicationsActions
    } from '@/store/helpers';
    import editMedication from './edit.vue';
    import createMedication from './create.vue';
    import {CONFIG} from '../../store/config'

    export default {
        name: "medications",
        data() {
            return {
                sortBy: "id",
                sortDesc: false,
                filter: null,
                filterOn: [],
                activeItem: null,
                status: 'view',
            };
        },
        components: {
            editMedication,
            createMedication
        },
        computed: {
            ...medicationsState([
                'medications',
            ]),
            fields () {
                let idKey = this.serverType == 'rest' ? "id" : "idN";
                return [
                    {
                        key: idKey,
                        sortable: true,
                        label: "id"

                    },
                    {
                        key: 'DoseMg',
                        sortable: true,
                        label: "Dose-Mg"
                    },
                    {key: "Name", sortable: true},
                    {key: "Route", sortable: false}
                ]
            }
        },
        methods: {
            ...medicationsActions([
                'makeRequest'
            ]),
            setActiveItem(item) {
                this.status = 'view';
                this.activeItem = item;
            },
            editMedication() {
                this.status = 'edit';
            },
            createComplete() {
                this.status = 'view';
                this.activeItem = this.medications[this.medications.length - 1];
                this.selectRow(this.activeItem.id);
            },
            selectRow(id) {
                let row = document.getElementById('medicationsTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#medicationsTable tr')).indexOf(row) - 1;
                this.$refs.medicationsTable.selectRow(index);
            },
            editComplete(item) {
                this.status = 'view';
                this.activeItem = item;
                this.selectRow(this.activeItem.id);
            },
            cancel() {
                this.status = 'view';
            },
            deleteMed() {
                this.$bvModal.msgBoxConfirm('Are you sure you want delete item?')
                    .then(value => {
                        if (value) {
                            this.deleteMedication(this.activeItem)
                                .then(() => {
                                    this.status = 'view';
                                    this.activeItem = null;
                                    this.$refs.medicationsTable.clearSelected();
                                })
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    })
            },
            createMedication() {
                this.status = 'create';
                this.activeItem = null;
                this.$refs.medicationsTable.clearSelected();
            }
        },
        mounted: async function () {
            this.$nextTick(function () {
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