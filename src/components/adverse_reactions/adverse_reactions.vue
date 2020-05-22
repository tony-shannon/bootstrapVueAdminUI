<template>


    <b-row>
        <b-col cols="6" sm="6"> Adverse Reactions
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
                            id="adverse_reactionsTable"
                            ref="adverse_reactionsTable"
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
                              @click="createMed">
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

            <createAdverse_reactions
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
                            @click="editMed">
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
    import {mapGetters, mapActions} from 'vuex';
    import createAdverse_reactions from './create'
    export default {
        name: "adverse_reactions",
        components:{
            createAdverse_reactions
        },

        data(){

            return {

                filterOn: [],
                sortBy: "id",
                sortDesc: false,
                filter: null,

                fields: [
                    {
                        key: 'name',
                        sortable: true,
                        label: "Name"
                    },
                    {
                        key: 'substance',
                        label: 'Substance',
                    },
                    {
                        key: 'severity',
                        label: 'Severity'
                    },
                    {
                        key: 'comment',
                        label: 'Comment'
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
               'list': 'adverse_reactions/list',
            }),
            activeItem: {
                get () {
                    if(this.$store.state.adverse_reactions.activeItem) {
                        this.$nextTick(function () {
                            this.selectRow(this.$store.state.adverse_reactions.activeItem.id);
                        })
                    }
                    return this.$store.state.adverse_reactions.activeItem;
                },
                set (value) {
                    this.$store.commit('adverse_reactions/setActiveItem', value)
                }
            },
        },
        methods: {
            ...mapActions({
                'fetchList': 'adverse_reactions/fetchAdverse_reactionsList',
                'fetchNameAllowed': 'adverse_reactions/fetchNameAllowed',
                'fetchSeverity':'adverse_reactions/fetchSeverityList',
                'putToServer': 'adverse_reactions/putDataToServer'

            }),


            setActiveItem(item){
                this.activeItem = item;
            },
            deleteMed(){

            },
            createMed(){
                this.status = 'create';
                this.activeItem = null;
                this.$refs.adverse_reactionsTable.clearSelected();

            },
            editMed(){

            },
            createComplete(){
              //  this.putToServer();

            },
            cancel () {
                this.status = 'view';
            },
            selectRow(id) {
                let row = document.getElementById('adverse_reactionsTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#adverse_reactionsTable tr')).indexOf(row) - 1;
                this.$refs.adverse_reactionsTable.selectRow(index);
            },
        }
    }
</script>

<style scoped>

</style>
