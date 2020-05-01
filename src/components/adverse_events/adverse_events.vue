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
                            :items="adverse_events"
                            :fields="fields"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            responsive="sm"
                            id="adverse_eventsTable"
                            ref="adverse_eventsTable"
                            select-mode="single"
                            primary-key="id"
                            selectable
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            @row-clicked="setActiveItem"
                    ></b-table>

                    <b-button variant="primary"
                              class="float-right ml-3"
                              @click="createAdverse_Event">
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
            <editAdverse_Event v-if="status == 'edit' && activeItem"
                            :itemProp="activeItem"
                            @editComplete="editComplete"
                            @cancel="cancel"
            />

            <createAdverse_Event
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
                            @click="editAdverse_Event">
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
    import {mapGetters} from 'vuex';
    import {
        adverse_eventsActions
    } from '@/store/helpers';
    import editAdverse_Event from './edit.vue';
    import createAdverse_Event from './create.vue';
    import {CONFIG} from '../../store/config';

    export default {
        name: "adverse_events",
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
                    {key: "Type", sortable: true},
                    {key: "Name", sortable: true},
                    {key: "CodeD", sortable: false}
                ],
                filter: null,
                filterOn: [],
            };
        },
        components: {
            editAdverse_Event,
            createAdverse_Event
        },
        computed: {
            ...mapGetters({
                adverse_events: 'adverse_events/getAdverseEvents'
            }),
            activeItem: {
                get () {
                    if(this.$store.state.adverse_events.activeItem) {
                        this.selectRow(this.$store.state.adverse_events.activeItem.id);
                    }
                    return this.$store.state.adverse_events.activeItem;
                },
                set (value) {
                    this.$store.commit('adverse_events/setActiveItem', value)
                }
            },
            status: {
                get () {
                    return this.$store.state.adverse_events.status;
                },
                set (value) {
                    this.$store.commit('adverse_events/setStatus', value)
                }
            },
        },
        methods: {
            ...adverse_eventsActions([
                'makeRequest'
            ]),

            setActiveItem(item) {
                this.status = 'view';
                this.activeItem = item;
            },
            editAdverse_Event() {
                this.status = 'edit';
            },
            createComplete() {
                this.status = 'view';
                this.activeItem = this.adverse_events[this.adverse_events.length - 1];
                this.selectRow(this.activeItem.id);
            },
            selectRow(id) {
                let row = document.getElementById('adverse_eventsTable__row_' + id);
                let index = Array.from(document.querySelectorAll('#adverse_eventsTable tr')).indexOf(row) - 1;
                this.$refs.adverse_eventsTable.selectRow(index);
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
                            this.makeRequest({
                                type: CONFIG.serverType,
                                action: 'delete',
                                data: this.activeItem
                            })
                                .then(() => {
                                    this.status = 'view';
                                    this.activeItem = null;
                                    this.$refs.adverse_eventsTable.clearSelected();
                                })
                        }
                    })
                    .catch(err => {
                        console.log('err', err);
                    })
            },
            createAdverse_Event() {
                this.status = 'create';
                this.activeItem = null;
                this.$refs.adverse_eventsTable.clearSelected();
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
