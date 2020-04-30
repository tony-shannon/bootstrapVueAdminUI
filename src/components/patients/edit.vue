<template>
    <b-card
            border-variant="secondary"
            header="Detail"
            header-bg-variant="primary"
            header-text-variant="white"
            align="left"
    >
        <b-row v-for="(value, key) in item" :key="key">
            <b-col cols="6" sm="6">
                <h5>{{key}}</h5>
                <b-form-input :disabled="key == 'id'" v-model="item[key]" ></b-form-input>
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
    import {
        patientsActions
    } from '@/store/helpers';
    import {CONFIG} from "../../store/config";

    export default {
        name: "edit",
        data() {
            return {
                item: { ...this.itemProp }
            };
        },
        props: {
            itemProp: {
                type: Object,
                default: function () {
                    return {
                        "id": '',
                        "FirstName": '',
                        "LastName": '',
                        "Sex": '',
                        "Age": '',
                        "Address": ''
                    }
                }
            }
        },
        methods: {
            ...patientsActions([
                'makeRequest'
            ]),
            async update () {
                await this.makeRequest({
                    type: CONFIG.serverType,
                    action: 'edit',
                    data: this.item
                });
                this.$emit('editComplete', this.item);
            },
            cancel() {
                this.$emit('cancel');
            }
        },
    }
</script>

<style scoped>

</style>
