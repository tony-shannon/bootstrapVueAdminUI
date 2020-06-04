<template>

    <div class="width: 100%">
        <b-row class="d-none d-md-flex">
            <b-col cols="6" sm="6"> Diagnosis
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
                                :items="list"
                                :fields="fields"
                                responsive="sm"
                                id="diagnosisTable"
                                ref="diagnosisTable"
                                @row-clicked="setActiveItem"
                                selectable
                                select-mode="single"
                                primary-key="id"

                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :filter="filter"
                                :filterIncludedFields="filterOn"
                        >

                        </b-table>

                        <b-button variant="primary"
                                  class="float-right ml-3"
                                  @click="createMed"
                                  v-if="canCreate">
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
                <editDiagnosis v-if="status == 'edit' && activeItem"
                               :itemProp="activeItem"
                               @editComplete="editComplete"
                               @cancel="cancel"
                />

                <createDiagnosis
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
                                v-if="activeItem && canEdit"
                                variant="primary"
                                class="float-right ml-3"
                                @click="editMed"
                        >
                            Edit
                        </b-button>
                        <b-button
                                v-if="activeItem && canCreate"
                                variant="outline-danger"
                                class="float-right"
                                @click="deleteMed">
                            Delete
                        </b-button>
                    </b-card-footer>
                </b-card>

            </b-col>
        </b-row>
        <div class="d-sm-flex d-md-none">
            <mobile-divider icon="files" title="Problems"/>
            <mobile-table :fields="mobileProblems" :items="problems"></mobile-table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import createDiagnosis from './create'
    import editDiagnosis from './edit'
    import MobileDivider from "../patient_views/mobile-divider";
    import MobileTable from "../patient_views/mobile-table";


    export default {
        name: "diagnosis",
        components: {
            MobileTable,
            MobileDivider,
            createDiagnosis,
            editDiagnosis
        },

        data() {

            return {

                filterOn: [],
                sortBy: "id",
                sortDesc: false,
                filter: null,

                fields: [
                    {
                        key: 'problem_name',
                        sortable: true,
                        label: "Problem Diagnosis Name"
                    },
                    {
                        key: 'description',
                        label: 'Clinical Description',
                    },
                    {
                        key: 'severity',
                        label: 'Severity'
                    },

                ],
                mobileProblems: [
                    {key: "problem_name", label: 'Problem Name'},
                    {key: "severity", label: 'Severity'},
                ],
                status: 'view',
            }
        },

        mounted() {
            this.fetchList();
            this.fetchNameAllowed();
            this.fetchSeverity();

        },
        computed: {
            ...mapGetters({
                'list': 'diagnosis/list',
                'canEdit': 'auth/canEdit',
                'canDelete': 'auth/canDelete',
                'canCreate': 'auth/canCreate',
                'problems': 'diagnosis/list',

            }),
            activeItem: {
                get() {
                    if (this.$store.state.diagnosis.activeItem) {
                        this.$nextTick(function () {
                            this.selectRow(this.$store.state.diagnosis.activeItem.id);
                        })
                    }
                    return this.$store.state.diagnosis.activeItem;
                },
                set(value) {
                    this.$store.commit('diagnosis/setActiveItem', value)
                }
            },
        },
        methods: {
            ...mapActions({
                'fetchList': 'diagnosis/fetchDiagnosisList',
                'fetchNameAllowed': 'diagnosis/fetchNameAllowed',
                'fetchSeverity': 'diagnosis/fetchSeverityList',
                'putToServer': 'diagnosis/putDataToServer',
                'replaceItem': 'diagnosis/replaceItem',
                'deleteItem': 'diagnosis/deleteItem',

            }),


            setActiveItem(item) {
                this.activeItem = item;
            },
            deleteMed() {
                this.deleteItem(this.activeItem);
            },
            createMed() {
                if (!this.canCreate) {
                    return;
                }
                this.status = 'create';
                this.activeItem = null;
                this.$refs.diagnosisTable.clearSelected();

            },
            editMed() {
                if (!this.canEdit) {
                    return;
                }
                this.status = 'edit';

            },
            editComplete(item) {
                this.replaceItem(item);
                console.log(item);
                this.status = 'view';


            },
            createComplete() {
                //  this.putToServer();

            },
            cancel() {
                this.status = 'view';
            },
            selectRow(id) {
                let row = document.getElementById('diagnosisTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#diagnosisTable tr')).indexOf(row) - 1;
                this.$refs.diagnosisTable.selectRow(index);
            },
        }
    }
</script>

<style scoped>

</style>
