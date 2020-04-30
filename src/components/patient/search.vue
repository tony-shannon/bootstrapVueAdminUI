<template>
    <div class="row search" >
        <b-col cols="12" sm="12" class="search__field">
            <b-input-group size="sm">
                <b-form-input
                        v-model="search"
                        type="search"
                        id="filterInput"
                        placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                    <b-button :disabled="!search" @click="search = null">Clear</b-button>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <hr/>
        <div class="col-lg-12">
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
        </div>

    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {CONFIG} from '../../store/config';

    import {
        patientsState,
        patientsActions
    } from '@/store/helpers';


    export default {
        name: "search",

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
                    {key: "FirstName", sortable: true},
                    {key: "LastName", sortable: true},
                    {key: "Sex", sortable: false},
                    {key: "Age", sortable: false},
                    {key: "Address", sortable: false}

                ],
                filter: 'sdd',
                filterOn: [],
                activeItem: null,
                status: 'view'
            };
        },

        computed: {
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

        methods: {
            ...mapMutations('search', {
                setInput: 'setInput'
            }),
            ...mapMutations('patient',{
                setActivePatient: 'setPatient',
                setPatientId: 'setPatientId',
            }),
            ...patientsActions([
                'makeRequest'
            ]),

            setActiveItem(item){
                this.setActivePatient(item);
                this.setPatientId(parseInt(item.id));
            }
        },
        watch:{
           filter(newVal){
               this.setInput(newVal);
           },

        },
        mounted: async function() {
            //this.filter = this.search;

            this.$nextTick(function() {
                this.makeRequest({
                    type: CONFIG.serverType,
                    action: 'get'
                });
            })
        },


    }
</script>

<style scoped >
    .search{

    }
    .search__field{
        padding-top: 20px;
        padding-bottom: 20px;
    }
</style>
