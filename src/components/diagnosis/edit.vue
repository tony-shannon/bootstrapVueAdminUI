<template>
    <b-card
            border-variant="secondary"
            header="Detail"
            header-bg-variant="primary"
            header-text-variant="white"
            align="left"
    >
        <b-row v-for="(value, key) in item" :key="key">
            <b-col cols="6" sm="6" v-if="key != 'problem_name' && key!='severity'">
                <h5>{{key}}</h5>
                <b-form-input :disabled="key == 'id'" v-model="item[key]"></b-form-input>
            </b-col>
            <b-col cols="6" sm="6" v-if="key == 'problem_name'">
                <h5>{{key}}</h5>
                <vue-bootstrap-typeahead
                        class="mb-4"
                        v-model="query"
                        :data="nameAllowedFiltered"
                        ref="problem_name"
                        :serializer="item => item.rubric"
                        @hit="item.problem_name = $event"
                />
            </b-col>
            <b-col cols="6" sm="6" v-if="key == 'severity'">
                <h5>{{key}}</h5>
                <vue-bootstrap-typeahead
                        class="mb-4"
                        v-model="query_severity"
                        :data="severityFiltered"
                        ref="severityTypehead"
                        :serializer="item => item.rubric"
                        @hit="item.severity = $event"
                />

            </b-col>
        </b-row>
        <b-card-footer
                footer-bg-variant="white"
                footer-border-variant="white">

            <b-button variant="primary"
                      class="float-right ml-3"
                      @click="update">
                Complete
            </b-button>
            <b-button variant="outline-danger"
                      class="float-right"
                      @click="cancel">
                Cancel
            </b-button>
        </b-card-footer>
    </b-card>
</template>

<script>
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
    import {mapGetters} from 'vuex'
    import {filter} from 'lodash'


    export default {
        name: "edit",
        data() {
            return {
                item: { ...this.itemProp },
                query: this.itemProp.problem_name,
                query_severity: this.itemProp.severity,
            };
        },
        mounted(){
          this.$refs.severityTypehead.inputValue = this.itemProp.severity;
          this.$refs.problem_name.inputValue = this.itemProp.problem_name;

        },
        components:{
            VueBootstrapTypeahead,
        },
        props: {
            itemProp: {
                type: Object,
                default: function () {
                    return {

                    }
                }
            }
        },
        methods: {

            update () {
                this.$emit('editComplete', this.item);
            },
            cancel() {
                this.$emit('cancel');
            }
        },
        computed:{
            ...mapGetters({
                'nameAllowed': 'diagnosis/nameAllowed',
                'severity': 'diagnosis/severity',
            }),

            nameAllowedFiltered() {
                let res = filter(this.nameAllowed, (e) => e.term.toUpperCase().includes(this.query.toUpperCase()));
                return res;
            },
            severityFiltered() {
                let res = filter(this.severity, (e) => e.rubric.toUpperCase().includes(this.query_severity.toUpperCase()));
                return res;
            }
        }
    }
</script>

<style scoped>

</style>
