<template>
    <b-card
            border-variant="secondary"
            header="Detail"
            header-bg-variant="primary"
            header-text-variant="white"
            align="left"
    >
        <b-row v-for="(value, key) in item" :key="key">
            <b-col cols="6" sm="6" v-if="key != 'name'">
                <h5>{{key}}</h5>
                <b-form-input :disabled="key == 'id'" v-model="item[key]" ></b-form-input>
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
    import {mapGetters} from 'vuex'
    import {filter} from 'lodash'
    import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

    export default {
        name: "edit",
        data() {
            return {
                item: { ...this.itemProp },
                query: '',

            };
        },
        props: {
            itemProp: {
                type: Object,
                default: function () {
                    return {
                        "id": '',
                        "first_name": '',
                        "family_name": '',
                        "gender": '',
                        "Age": '',
                        "Address": ''
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
        components: {
            VueBootstrapTypeahead
        },
        computed:{
            ...mapGetters({
                'nameAllowed': 'medications/nameAllowed',
            }),

            nameAllowedFiltered() {
                let res = filter(this.nameAllowed, (e) => e.term.toUpperCase().includes(this.query.toUpperCase()));
                return res;
            },
        }
    }
</script>

<style scoped>

</style>
