<template>
    <b-card
            border-variant="secondary"
            header="Detail"
            header-bg-variant="primary"
            header-text-variant="white"
            align="left"
    >
        <b-row v-for="(value, key) in item" :key="key">
            <b-col cols="6" sm="6" v-if="key != 'name' && key!='Severity'">
                <h5>{{key}}</h5>
                <b-form-input :disabled="key == 'id'" v-model="item[key]"></b-form-input>
            </b-col>
            <b-col cols="6" sm="6" v-if="key == 'name'">
                <h5>{{key}}</h5>
                <vue-bootstrap-typeahead
                        class="mb-4"
                        v-model="query"
                        :data="nameAllowedFiltered"
                        :serializer="item => item.rubric"
                        @hit="item.name = $event"
                />
            </b-col>
        </b-row>
        <b-card-footer
                footer-bg-variant="white"
                footer-border-variant="white"
                @click="cancelCreate()"
        >

            <b-button variant="primary"
                      class="float-right ml-3"
                      @click="create">
                Complete
            </b-button>
            <b-button variant="outline-danger"
                      class="float-right">
                Cancel
            </b-button>
        </b-card-footer>
    </b-card>
</template>

<script>
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import {mapGetters, mapActions} from 'vuex'
    import {filter} from 'lodash'

    export default {
        name: "create",
        data() {
            return {
                item: {
                    "id": '',
                    "name": '',
                    "form": '',
                    "strength": '',
                    "amount": '',
                },
                names: [],
                query: '',
                query_severity: '',
            };
        },
        components: {
            VueBootstrapTypeahead
        },
        computed: {
            ...mapGetters({
                'nameAllowed': 'medications/nameAllowed',
            }),

            nameAllowedFiltered() {
                let res = filter(this.nameAllowed, (e) => e.term.toUpperCase().includes(this.query.toUpperCase()));
                return res;
            },
        },
        watch: {},
        filters: {
            stringify(value) {
                return JSON.stringify(value, null, 2)
            }
        },
        methods: {
            ...mapActions({
                'putToServer': 'medications/putDataToServer',
                'addItem': 'medications/addItem'
            }),
            cancelCreate() {
                this.$emit('cancel');
            },
            create() {
                this.addItem(this.item);
            },
            createComplete() {
                this.putToServer();
            }
        },
    }
</script>

<style scoped>

</style>
