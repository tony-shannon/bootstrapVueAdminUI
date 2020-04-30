<template>
    <div class="row">
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
                    :filter="filter"
                    :filterIncludedFields="filterOn"
                    @row-clicked="setActiveItem"
            ></b-table>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
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

                ], filter: null,
                filterOn: [],
                activeItem: null,
                status: 'view'
            };
        },

        computed: {
            ...mapGetters({
                search: 'search/input',
            }),
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
                this.setPatientId(item);
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
