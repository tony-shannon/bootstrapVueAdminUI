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
                <b-form-input :disabled="key == 'ID'" v-model="item[key]" ></b-form-input>
            </b-col>
        </b-row>
        <b-card-footer
                footer-bg-variant="white"
                footer-border-variant="white">

            <b-button variant="primary"
                      class="float-right ml-3"
                      @click="updateMedication(item)">
                Complete
            </b-button>
            <b-button variant="outline-danger"
                      class="float-right"
                      @click="cancelEdit">
                Cancel
            </b-button>
        </b-card-footer>
    </b-card>
</template>

<script>
    import {
        medicationsActions
    } from '@/store/helpers';

    export default {
        name: "editMedication",
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
                        "ID": "",
                        "CodeD": "",
                        "Description": "",
                        "Name": "",
                        "Days": ""
                    }
                }
            }
        },
        methods: {
            ...medicationsActions([
                'updateMedication'
            ]),
            cancelEdit() {

            }
        },
    }
</script>

<style scoped>

</style>