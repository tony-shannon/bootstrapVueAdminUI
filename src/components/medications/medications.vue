<template>


    <b-row>
        <b-col cols="6" sm="6"> Medications
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
                            id="medicationsTable"
                            ref="medicationsTable"
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
                              v-if="canCreate" >
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
            <editMedications v-if="status == 'edit' && activeItem"
                            :itemProp="activeItem"
                            @editComplete="editComplete"
                            @cancel="cancel"
            />

            <createMedications
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
                            @click="editMed">
                        Edit
                    </b-button>
                    <b-button
                            v-if="activeItem && canDelete"
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
    import {mapGetters, mapActions} from 'vuex';
    import createMedications from './create'
    import editMedications from './edit'

    export default {
        name: "medications",
        components:{
            createMedications,
            editMedications
        },

        data(){

            return {

                filterOn: [],
                sortBy: "id",
                sortDesc: false,
                filter: null,

                fields: [
                    {
                        key: 'form',
                        sortable: true,
                        label: "Medication Form"
                    },
                    {
                        key: 'name',
                        label: 'Medication Name',
                    },
                    {
                        key: 'strength',
                        label: 'Medication Strength'
                    },
                    {
                        key: 'amount',
                        label: 'Medication Amount'
                    },

                ],
                status: 'view',
            }
        },

        mounted(){
            this.fetchList();
            this.fetchNameAllowed();
            this.fetchSeverity();

        },
        computed: {
            ...mapGetters({
               'list': 'medications/list',
                'canEdit': 'auth/canEdit',
                'canDelete': 'auth/canDelete',
                'canCreate': 'auth/canCreate',
            }),
            activeItem: {
                get () {
                    if(this.$store.state.medications.activeItem) {
                        this.$nextTick(function () {
                            this.selectRow(this.$store.state.medications.activeItem.id);
                        })
                    }
                    return this.$store.state.medications.activeItem;
                },
                set (value) {
                    this.$store.commit('medications/setActiveItem', value)
                }
            },
        },
        methods: {
            ...mapActions({
                'fetchList': 'medications/fetchMedicationsList',
                'fetchNameAllowed': 'medications/fetchNameAllowed',
                'fetchSeverity':'medications/fetchSeverityList',
                'putToServer': 'medications/putDataToServer',
                'replaceItem': 'medications/replaceItem',
                'deleteItem': 'medications/deleteItem',

            }),


            setActiveItem(item){
                this.activeItem = item;
            },
            deleteMed(){
                this.deleteItem(this.activeItem);

            },
            createMed(){
                this.status = 'create';
                this.activeItem = null;
                this.$refs.medicationsTable.clearSelected();

            },

            editComplete(item){
                this.replaceItem(item);
                console.log(item);
                this.status = 'view';

            },
            editMed(){
                this.status = 'edit';
            },
            createComplete(){
              //  this.putToServer();

            },
            cancel () {
                this.status = 'view';
            },
            selectRow(id) {
                let row = document.getElementById('medicationsTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#medicationsTable tr')).indexOf(row) - 1;
                this.$refs.medicationsTable.selectRow(index);
            },
        }
    }
</script>

<style scoped>

</style>
