<template>
    <b-card
            border-variant="secondary"
            header="Detail"
            header-bg-variant="primary"
            header-text-variant="white"
            align="left"
    >
        <b-row v-for="(value, key) in item" :key="key">
            <b-col cols="6" sm="6" v-if="true">
                <h5>{{key}}</h5>
                <b-form-input :disabled="key == 'id'" v-model="item[key]"></b-form-input>
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
    import {mapGetters, mapActions} from 'vuex'
    import {filter} from 'lodash'

    export default {
        name: "create",
        data() {
            return {
                item: {
                    "id": '',
                    "name": '',
                    "severity": '',
                    "substance": '',
                    "comment": '',

                },
                names: [],
                query: '',
                query_severity: '',
            };
        },
        components: {
        },
        computed: {
            ...mapGetters({
                'nameAllowed': 'adverse_reactions/nameAllowed',
                'severity': 'adverse_reactions/severity',


            }),

            nameAllowedFiltered() {
                let res = filter(this.nameAllowed, (e) => e.term.toUpperCase().includes(this.query.toUpperCase()));
                return res;
            },
            severityFiltered() {
                let res = filter(this.severity, (e) => e.term.toUpperCase().includes(this.query_severity.toUpperCase()));
                return res;
            }
        },
        watch: {},
        filters: {
            stringify(value) {
                return JSON.stringify(value, null, 2)
            }
        },
        methods: {
            ...mapActions({
                'putToServer': 'adverse_reactions/putDataToServer',
                'addItem': 'adverse_reactions/addItem'
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
