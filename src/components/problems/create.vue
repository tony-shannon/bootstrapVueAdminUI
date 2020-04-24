<template>
    <b-card
            border-variant="secondary"
            header="Detail"
            header-bg-variant="primary"
            header-text-variant="white"
            align="left"
    >
        <b-row v-for="(value, key) in item" :key="key">
            <b-col cols="6" sm="6" v-if="key != 'Name'">
                <h5>{{key}}</h5>
                <b-form-input :disabled="key == 'id'" v-model="item[key]" ></b-form-input>
            </b-col>
            <b-col cols="6" sm="6" v-if="key == 'Name'">
                <h5>{{key}}</h5>
                <vue-bootstrap-typeahead
                        class="mb-4"
                        v-model="query"
                        :data="terms"
                        :serializer="item => item.Term"
                        @hit="item.Name = $event.Term"
                />
            </b-col>
        </b-row>
        <b-card-footer
                footer-bg-variant="white"
                footer-border-variant="white">

            <b-button variant="primary"
                      class="float-right ml-3"
                      @click="create">
                Complete
            </b-button>
            <b-button variant="outline-danger"
                      class="float-right"
                      @click="cancelCreate">
                Cancel
            </b-button>
        </b-card-footer>
    </b-card>
</template>

<script>
    import {
        problemsState,
        problemsActions
    } from '@/store/helpers';
    import {CONFIG} from "../../store/config";
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

    export default {
        name: "create",
        data() {
            return {
                item: {
                    "id": '',
                    "CodeD": '',
                    "Description": '',
                    "Name": '',
                    "Days": ''
                },
                names: [],
                query: ''
            };
        },
        components: {
            VueBootstrapTypeahead
        },
        computed: {
            ...problemsState([
                'terms',
            ]),
        },
        watch: {
            async query() {
                await this.makeRequest({
                    type: CONFIG.serverType,
                    action: 'getTerms'
                });
                this.item.Name = this.query;
            }
        },
        filters: {
            stringify(value) {
                return JSON.stringify(value, null, 2)
            }
        },
        methods: {
            ...problemsActions([
                'makeRequest'
            ]),
            async create() {
                await this.makeRequest({
                    type: CONFIG.serverType,
                    action: 'create',
                    data: this.item
                });
                this.$emit('createComplete')
            },
            cancelCreate() {
                this.$emit('cancel');
            }
        },
    }
</script>

<style scoped>

</style>